import { SelectedExerciseItem } from "@/lib/types/exe-types";
import { Routine } from "@/lib/types/routine-types";
import { Exercise_Routine } from "@/lib/types/routineExe-types";
import { Routine_TABLE_HEADERS } from "@/lib/utils/headers";
import { formatDate } from "@/lib/utils/helpers";
import { title } from "process";

type RoutineTableProps = {
    routines: Routine[];
    exercise_routines: Exercise_Routine[];
    totalRoutines: number;
    onUpdateRoutine: (
        routine: Routine,
        selectedExercises: SelectedExerciseItem[]
    ) => Promise<void> | void;
    onDeleteRoutine: (routineId: string) => void;
    onDeleteExerciseRoutine: (exercise_RoutineId: string) => void;
};

export function ExeTable({ routines, exercise_routines, totalRoutines, 
    onUpdateRoutine, onDeleteRoutine, onDeleteExerciseRoutine }: RoutineTableProps) {
    return (
        <section className="space-y-4">
            <div className="table-surface">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="table-head text-left">
                                {Routine_TABLE_HEADERS.map((header) => (
                                    <th
                                        key={header}
                                        className="border-b border-emerald-400/10 px-4 py-4 text-xs font-semibold 
                                        uppercase tracking-[0.22em] text-emerald-200/70"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {routines.length > 0 ? (
                                routines.map((routine) => {
                                    const exerciseRoutines = exercise_routines.filter((item) => item.routine_id === routine.id);
                                    const exercisesTitles = exerciseRoutines
                                        .map((item) => item.routine_info?.title)
                                        .filter((title): title is string => Boolean(title));
                                
                                    return(
                                    <tr key={routine.id} className="table-row bg-transparent align-top text-sm text-emerald-50/90">
                                        <td className="px-4 py-5 font-semibold text-white">{routine.title}</td>
                                        <td className="px-4 py-5 font-semibold text-white">{routine.description}</td>
                                        <td className="px-4 py-5 font-semibold text-white">
                                            {exercisesTitles.length > 0 ? exercisesTitles.join("\n") : "-"}</td>
                                        <td className="px-4 py-5 font-semibold text-white">{formatDate(routine.time_init)}</td>
                                        <td className="px-4 py-5 font-semibold text-white">{formatDate(routine.time_finish)}</td>
                                        <td className="px-4 py-5 font-semibold text-white">{formatDate(routine.created_at)}</td>
                                        <td className="px-4 py-5 font-semibold text-white">{formatDate(routine.updated_at)}</td>
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-3 text-slate-500">
                                                <Button2Edit
                                                    routine={routine}
                                                    exercise_routines={exercise_routines}
                                                    onUpdateRoutine={onUpdateRoutine}
                                                />
                                                <Button2Delete
                                                    routine={routine}
                                                    exercise_routines={exercise_routines}
                                                    onDeleteRoutine={() => onDeleteRoutine(String(routine.id))}
                                                    onDeleteExerciseRoutine={() => onDeleteExerciseRoutine?.(exerciseRoutines[0]?.id?.toString() ?? "")}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    );
                                })
                            ) : (
                                <tr className="bg-transparent">
                                    <td colSpan={Routine_TABLE_HEADERS.length} className="px-4 py-12 text-center text-emerald-100/55">
                                        No hay rutinas registradas todavía.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="text-sm text-emerald-100/55">
                {/* Mostrando {routines.length} de {totalRoutines} rutinas */}
                Mostrando {totalRoutines} rutinas
            </p>
        </section>
    );
}