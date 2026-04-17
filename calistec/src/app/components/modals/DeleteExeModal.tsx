"use client";

import { AddExeCloseIcon } from "@/app/components/icons/AddExeCloseIcon";
import { AddExeReadonlyField } from "@/app/components/Form_fields/AddExeReadonlyField";
import type { Exercise } from "@/features/types/exe-types";

// --- Tipo de variables ---
type DeleteExeModalProps = {
    exercise: Exercise;
    onDeleteExercise: (exerciseId: string) => void
    onClose: () => void;
};

export function DeleteExeModal({ exercise, onDeleteExercise, onClose }: DeleteExeModalProps) {

    // Aceptar actualizacion
    async function handleDeleteExe(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await onDeleteExercise(exercise.id);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="max-h-[95vh] w-full max-w-2xl overflow-hidden rounded-[28px] border border-emerald-400/15 bg-[#0a0f0c] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between border-b border-emerald-400/10 px-6 py-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/70">Eliminar ejercicio</p>
                    <h2 className="mt-1 text-2xl font-black text-white">Confirmar eliminación</h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-emerald-400/10 p-2 text-emerald-100/70 transition hover:bg-emerald-400/10 hover:text-white"
                    aria-label="Cerrar modal"
                >
                    <AddExeCloseIcon />
                </button>
            </div>
            <div className="flex items-center justify-between border-b border-emerald-400/10 px-6 py-5">
                <p className="text-sm text-emerald-100/65">
                    ¿Está seguro que desea eliminar el siguiente producto?
                </p>
            </div>
            <form onSubmit={handleDeleteExe} className="max-h-[calc(95vh-88px)] overflow-y-auto px-6 py-6">
                <AddExeReadonlyField
                    label="Nombre del ejercicio"
                    value={exercise.exercise}    
                />
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
                        className="rounded-xl border border-red-400/20 bg-red-500/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                    >
                        Eliminar ejercicio
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
}