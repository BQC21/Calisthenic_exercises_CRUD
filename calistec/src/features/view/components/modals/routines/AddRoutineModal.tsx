import { SelectedExerciseItem } from "@/lib/types/exe-types"
import { RoutineFormData, RoutineFormState } from "@/lib/types/routine-types"
import { INITIAL_ROUTINE_FORM } from "@/lib/utils/initialValues";
import { useState } from "react";
import { AddCloseIcon } from "../../icons/AddCloseIcon";
import { AddDateField } from "../../Form_fields/AddDateField";
import { formatDate, formatDateTimeDisplay } from "@/lib/utils/helpers";
import { AddTextField } from "../../Form_fields/AddTextField";
import { SelectionRow } from "../../Form_fields/AddSelectionRow";
import { useExercise } from "@/features/view/hooks/services/useRealtimeExe";
import { handlerSelector } from "@/features/view/hooks/modals/useHandler";
import { useSelectionHandlers } from "@/features/view/hooks/modals/useSelectionHandlers";
import { AddDateTimeField } from "../../Form_fields/AddDateTimeField";


type AddModalProps = {
    onAddRoutine: (
        routine: RoutineFormData,
        selectedExercise: SelectedExerciseItem[]
    ) => Promise<void> | void;
    onClose: () => void;
}

export default function AddRoutineModal({onAddRoutine, onClose}: AddModalProps){

    // Estados
    const { exercises } = useExercise();
    
    // Valores iniciales
    const [form, setForm] = useState<RoutineFormState>(INITIAL_ROUTINE_FORM);

    // Información selecta
    // const [selectedExerciseByRow, setSelectedExerciseByRow] = useState<Record<string, string>>({});
    const [selectedExerciseByRow, setSelectedExerciseByRow] = useState<Record<string, {ejercicioId: string, title: string, focus: string, level: string}>>({});
    
    const [selectedExerciseTable, setSelectedExerciseTable] = useState<SelectedExerciseItem[]>([]);

    // Eventos
    function updateField<k extends keyof RoutineFormState>(field: k, value: RoutineFormState[k]){
        setForm((current) => {
            const updated = {...current, [field]:value};
            return updated
        })
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        await onAddRoutine({
            ...form,
        }, selectedExerciseTable)
    }

    // Selectores
    const exercise_filteredOptions = handlerSelector("ejercicio", selectedExerciseTable, exercises).filter(
        (option): option is string => option !== undefined, // evita indefinidos al momento de configurar selectores
    );

    const {handle_onChange, handle_onClick} = useSelectionHandlers(exercises,
                                            selectedExerciseByRow, selectedExerciseTable,
                                            setSelectedExerciseByRow, setSelectedExerciseTable)

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-[28px] 
                border border-emerald-400/15 bg-[#0a0f0c] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between border-b border-emerald-400/10 px-6 py-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/70">Nueva rutina</p>
                        <h2 className="mt-1 text-2xl font-black text-white">Añadir rutina</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-emerald-400/10 p-2 text-emerald-100/70 
                                    transition hover:bg-emerald-400/10 hover:text-white"
                        aria-label="Cerrar modal"
                    >
                        <AddCloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[calc(95vh-88px)] overflow-y-auto px-6 py-6">
                    <div className="space-y-8">
                        <section className="space-y-5">
                            {/* <AddDateTimeField
                                label="Hora de inicio"
                                required
                                // value={formatDate(form.time_init)}
                                value={formatDate(form.time_init)}
                                onChange={(value) => updateField("time_init", new Date(value))}
                            />
                            <AddDateTimeField
                                label="Hora de finalización"
                                required
                                // value={formatDate(form.time_init)}
                                value={formatDate(form.time_finish)}
                                onChange={(value) => updateField("time_finish", new Date(value))}
                            /> */}
                            <AddTextField
                                label="Descripción"
                                placeholder="Describe tu rutina a grandes rasgos"
                                value={form.description}
                                onChange={(value) => updateField("description", value)}
                            />
                        </section>
                        <section className="space-y-5">
                            {/* selector */}
                            <h2 className="mt-1 text-2xl font-black text-white">Selección de ejercicios</h2>
                            <SelectionRow
                                label="Selecciona ejercicio"
                                buttonLabel="Agregar"
                                value={selectedExerciseByRow[`ejercicio`]?.title || `Seleccionar - ejercicio`}
                                options={exercise_filteredOptions}
                                onChange={(value) => handle_onChange(value, `ejercicio`)}
                                onClick={() => handle_onClick(`ejercicio`)}
                            />
                        </section>
                        <section className="space-y-5">
                            <h2 className="mt-1 text-2xl font-black text-white">Ejercicios seleccionados</h2>
                                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                    <table className="min-w-full border-separate border-spacing-0">
                                        <thead className="sticky top-0 z-10 bg-slate-100">
                                            <tr className="bg-slate-100 text-left">
                                                <th className="border-b border-slate-200 px-4 py-4 text-[1.02rem] font-bold text-slate-900">
                                                    Ejercicio seleccionado
                                                </th>
                                                <th className="border-b border-slate-200 px-4 py-4 text-[1.02rem] font-bold text-slate-900">
                                                    Enfoque
                                                </th>
                                                <th className="border-b border-slate-200 px-4 py-4 text-[1.02rem] font-bold text-slate-900">
                                                    Nivel
                                                </th>
                                                <th className="border-b border-slate-200 px-4 py-4 text-[1.02rem] font-bold text-slate-900">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedExerciseTable.length > 0 ? (
                                                selectedExerciseTable.map((item, index) => (
                                                    <tr key={`${item.row}-${item.id}-${index}`} className="bg-white">
                                                        <td className="border-b border-slate-200 px-4 py-5 font-medium text-black">
                                                            {item.title}
                                                        </td>
                                                        <td className="border-b border-slate-200 px-4 py-5 font-medium text-black">
                                                            {item.focus}
                                                        </td>
                                                        <td className="border-b border-slate-200 px-4 py-5 font-medium text-black">
                                                            {item.level}
                                                        </td>
                                                        <td className="border-b border-slate-200 px-4 py-5">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedExerciseTable((current) =>
                                                                        current.filter((row) => row.id !== item.id),
                                                                    );
                                                                }}
                                                                className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-800"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="bg-white">
                                                    <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                                                        No hay ejercicios seleccionados todavía.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                        </section>
                        <div className="mt-8 flex justify-end gap-4 border-t border-emerald-400/10 pt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="soft-button rounded-xl px-6 py-3 text-sm font-semibold"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="action-button px-6 py-3 text-sm"
                            >
                                Añadir Rutina
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}