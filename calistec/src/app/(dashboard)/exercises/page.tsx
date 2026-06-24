
"use client";

import { useState } from "react";
import { ExeFilter, type ExeFilterValues } from "@/features/view/components/Table/Exercises/ExeFilter";
import { ExeTable } from "@/features/view/components/Table/Exercises/ExeTable";
import Button2Add from "@/features/view/components/buttons/exercises/button2Add";
import { useExerciseMutations, useExercise } from "@/features/view/hooks/useRealtimeExe";
import type { Exercise, ExerciseFormData } from "@/lib/types/exe-types";
import { PortalShell } from "@/features/PortalShell";

export default function ExePage() {

    // Uso de base de datos

    const { exercises, refetch } = useExercise();
    const { create, update, remove } = useExerciseMutations();

    // Setear filtrados

    const [filters, setFilters] = useState<ExeFilterValues>({
        focus: "",
        level: "",
    });

    const filteredExercises = exercises.filter((exercise) => {
        const matchesFocus = !filters.focus || exercise.focus === filters.focus;
        const matchesLevel = !filters.level || exercise.level === filters.level;

        return matchesFocus && matchesLevel;
    });

    // Eventos

    async function handleAddProduct(exercise: ExerciseFormData) {
        await create(exercise);
        await refetch();
    }

    async function handleUpdateProduct(updatedExercise: Exercise) {
        const { id, ...exerciseData } = updatedExercise;
        await update(String(id), exerciseData);
        await refetch();
    }

    async function handleDeleteProduct(exerciseId: string) {
        await remove(exerciseId);
        await refetch();
    }

    return (
        <main className="min-h-screen bg-[var(--page-bg)] text-[var(--foreground)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 lg:px-8">
                <PortalShell
                    title="Biblioteca de ejercicios"
                    subtitle="Explora, filtra y administra tu catálogo de ejercicios con una 
                                interfaz de alto contraste."
                    activePath="/exercises"
                >
                <div className="grid grid-cols-1 gap-20">
                    <ExeFilter
                        values={filters}
                        onFilterChange={(key: keyof ExeFilterValues, value: string) =>
                            setFilters((current: ExeFilterValues) => ({
                                ...current,
                                [key]: value,
                            }))
                        }
                    />
                    <Button2Add onAddProduct={handleAddProduct} />
                </div>
                <div className="mt-0">
                    <ExeTable
                        exercises={filteredExercises}
                        totalExecises={exercises.length}
                        onUpdateExercise={handleUpdateProduct}
                        onDeleteExercise={handleDeleteProduct}
                    />
                </div>
                </PortalShell>
            </div>
        </main>
    );
}