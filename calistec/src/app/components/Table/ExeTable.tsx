import Button2Edit from "@/app/components/buttons/exercises/button2Edit";
import { Button2Delete } from "@/app/components/buttons/exercises/button2Delete";
import type { Exercise } from "@/lib/types/exe-types";

const TABLE_HEADERS = [
    "Ejercicio",
    "Enfoque",
    "Dirección de movimiento",
    "Nivel",
    "Modalidad",
    "Acciones",
];

function getLevelBadgeClass(level: string) {
    const normalized = level.toLowerCase();

    if (normalized.includes("inter") || normalized.includes("beginner") || normalized.includes("newbie")) {
        return "badge--level-amber";
    }

    if (normalized.includes("advance") || normalized.includes("elite")) {
        return "badge--level-red";
    }

    return "badge--level-green";
}

type ExeTableProps = {
    exercises: Exercise[];
    totalExecises: number;
    onUpdateExercise: (exercise: Exercise) => void;
    onDeleteExercise: (exerciseId: string) => void;
};

export function ExeTable({ exercises, totalExecises, onUpdateExercise, onDeleteExercise }: ExeTableProps) {
    return (
        <section className="space-y-4">
            <div className="table-surface">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="table-head text-left">
                                {TABLE_HEADERS.map((header) => (
                                    <th
                                        key={header}
                                        className="border-b border-emerald-400/10 px-4 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/70"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.length > 0 ? (
                                exercises.map((exercise) => (
                                    <tr key={exercise.id} className="table-row bg-transparent align-top text-sm text-emerald-50/90">
                                        <td className="px-4 py-5 font-semibold text-white">{exercise.exercise}</td>
                                        <td className="px-4 py-5">
                                            <div className="flex flex-wrap gap-2">
                                                {exercise.focus
                                                    .split(/\s+/)
                                                    .filter(Boolean)
                                                    .map((item) => (
                                                        <span key={item} className="badge badge--focus">
                                                            {item}
                                                        </span>
                                                    ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-emerald-100/80">{exercise.movement}</td>
                                        <td className="px-4 py-5">
                                            <span className={`badge ${getLevelBadgeClass(exercise.level)}`}>{exercise.level}</span>
                                        </td>
                                        <td className="px-4 py-5 text-emerald-100/80">{exercise.type}</td>
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-3 text-slate-500">
                                                <Button2Edit
                                                    exercise={exercise}
                                                    onUpdateExercise={onUpdateExercise}
                                                />
                                                <Button2Delete
                                                    exercise={exercise}
                                                    onDeleteExercise={onDeleteExercise}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-transparent">
                                    <td colSpan={TABLE_HEADERS.length} className="px-4 py-12 text-center text-emerald-100/55">
                                        No hay ejercicios registrados todavía.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="text-sm text-emerald-100/55">
                Mostrando {exercises.length} de {totalExecises} ejercicios
            </p>
        </section>
    );
}