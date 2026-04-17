import Button2Edit from "@/app/components/buttons/button2Edit";
import { Button2Delete } from "@/app/components/buttons/button2Delete";
import type { Exercise } from "@/features/types/exe-types";

const TABLE_HEADERS = [
    "Ejercicio",
    "Enfoque",
    "Dirección de movimiento",
    "Nivel",
    "Modalidad",
    "Acciones",
];

type ExeTableProps = {
    exercises: Exercise[];
    totalExecises: number;
    onUpdateExercise: (exercise: Exercise) => void;
    onDeleteExercise: (exerciseId: string) => void;
};

export function ExeTable({ exercises, totalExecises, onUpdateExercise, onDeleteExercise }: ExeTableProps) {
    return (
        <section className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
                <thead>
                <tr className="bg-slate-100 text-left">
                    {TABLE_HEADERS.map((header) => (
                    <th
                        key={header}
                        className="border-b border-slate-200 px-4 py-4 text-[1.02rem] font-bold text-slate-900"
                    >
                        {header}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {exercises.length > 0 ? (
                    exercises.map((exercise) => (
                    <tr key={exercise.id} className="bg-white">
                        <td className="px-4 py-5 text-slate-500">{exercise.exercise}</td>
                        <td className="px-4 py-5 text-slate-800">{exercise.focus}</td>
                        <td className="px-4 py-5 text-slate-900">{exercise.movement}</td>
                        <td className="px-4 py-5 text-slate-900">{exercise.level}</td>
                        <td className="px-4 py-5 text-slate-900">{exercise.type}</td>
                        <td className="px-4 py-5">
                            <div className="flex items-center gap-4 text-slate-500">
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
                    <tr className="bg-white">
                        <td colSpan={TABLE_HEADERS.length} className="px-4 py-10 text-center text-slate-500">
                            No hay productos registrados todavía.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        <p className="text-lg text-slate-500">
            Mostrando {exercises.length} de {totalExecises} ejercicios
        </p>
        </section>
    );
}