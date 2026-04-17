
"use client";

import { useState } from "react";
import { ExeFilter, type ExeFilterValues } from "@/app/components/Table/ExeFilter";
import { ExeTable } from "@/app/components/Table/ExeTable";
import Button2Add from "@/app/components/buttons/button2Add";
import { useExerciseMutations, useExercise } from "@/features/hooks/useRealtimeExe";
import type { Exercise, ExerciseFormData } from "@/features/types/exe-types";

export default function Page() {

    const { exercises, refetch } = useExercise();
    const { create, update, remove } = useExerciseMutations();
    const [filters, setFilters] = useState<ExeFilterValues>({
        focus: "",
        movement: "",
        level: "",
        type: "",
    });

    const filteredExercises = exercises.filter((exercise) => {
        const matchesFocus = !filters.focus || exercise.focus === filters.focus;
        const matchesMovement = !filters.movement || exercise.movement === filters.movement;
        const matchesLevel = !filters.level || exercise.level === filters.level;
        const matchesType = !filters.type || exercise.type === filters.type;

        return matchesFocus && matchesMovement && matchesLevel && matchesType;
    });

    async function handleAddProduct(exercise: ExerciseFormData) {
        await create(exercise);
        await refetch();
    }

    async function handleUpdateProduct(updatedExercise: Exercise) {
        const { id, ...exerciseData } = updatedExercise;
        await update(id, exerciseData);
        await refetch();
    }

    async function handleDeleteProduct(exerciseId: string) {
        await remove(exerciseId);
        await refetch();
    }

    return (
        <main className="min-h-screen bg-[var(--page-bg)] text-[var(--foreground)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 lg:px-8">
            <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-[-0.02em] text-slate-900">
                    Biblioteca de ejercicios
                </h1>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button2Add
                    onAddProduct={handleAddProduct}
                />
                </div>
            </section>

            <section className="panel">
                <div className="space-y-6">
                <ExeFilter
                    values={filters}
                    onFilterChange={(key: keyof ExeFilterValues, value: string) =>
                    setFilters((current: ExeFilterValues) => ({
                        ...current,
                        [key]: value,
                    }))
                    }
                />
                </div>
            </section>

            <ExeTable 
                exercises={filteredExercises}
                totalExecises={exercises.length}
                onUpdateExercise={handleUpdateProduct}
                onDeleteExercise={handleDeleteProduct}
            />
            </div>
        </main>
    );
}