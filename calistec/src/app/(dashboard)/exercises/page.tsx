
"use client";

import { useState } from "react";
import { ExeFilter, type ExeFilterValues } from "@/app/components/Table/ExeFilter";
import { ExeTable } from "@/app/components/Table/ExeTable";
import Button2Add from "@/app/components/buttons/exercises/button2Add";
import { useExerciseMutations, useExercise } from "@/features/hooks/useRealtimeExe";
import type { Exercise, ExerciseFormData } from "@/lib/types/exe-types";

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
                <section className="surface-card px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl space-y-3">
                            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                                CalisTEC
                            </span>
                            <div className="space-y-2">
                                <h1 className="hero-title text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                                    Biblioteca de ejercicios
                                </h1>
                                <p className="hero-subtitle max-w-xl text-base leading-7 sm:text-lg">
                                    Explora, filtra y administra tu catálogo de movimientos con una interfaz más limpia y de alto contraste.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <div className="rounded-2xl border border-emerald-400/15 bg-black/30 px-4 py-3 text-sm text-emerald-100/80">
                                <div className="text-xs uppercase tracking-[0.22em] text-emerald-300/70">Total registrados</div>
                                <div className="mt-1 text-2xl font-black text-white">{exercises.length}</div>
                            </div>
                            <Button2Add onAddProduct={handleAddProduct} />
                        </div>
                    </div>
                </section>

                <section className="panel">
                    <ExeFilter
                        values={filters}
                        onFilterChange={(key: keyof ExeFilterValues, value: string) =>
                            setFilters((current: ExeFilterValues) => ({
                                ...current,
                                [key]: value,
                            }))
                        }
                    />
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