
"use client";

import { PortalShell } from "@/features/PortalShell";
import Button2Modal from "@/features/view/components/buttons/routines/button2Add";
import { RoutineTable } from "@/features/view/components/Table/Routines/RoutineTable";
import { useExeRoutine, useExeRoutineMutations } from "@/features/view/hooks/services/useRealtimeExeRoutine";
import { useRoutine, useRoutineMutations } from "@/features/view/hooks/services/useRealtimeRoutine";
import { Exercise, SelectedExerciseItem } from "@/lib/types/exe-types";
import { Routine, RoutineFormData } from "@/lib/types/routine-types";

export default function RoutinePage(){
    // Uso de base de datos
    const { routines, refetch: refetch_routine } = useRoutine();
    const { create: create_routine,
        update: update_routine,
        remove: remove_routine
    } = useRoutineMutations();

    const { exercises_routines, refetch: refetch_exercise_routine } = useExeRoutine();
    const { create: create_exercise_routine,
        remove: remove_exercise_routine
    } = useExeRoutineMutations();

    // Eventos
    async function handleAddRoutine(
        routine: RoutineFormData,
        selectedExercises: SelectedExerciseItem[]
    ) {
        const createdRoutine = await create_routine(routine)
        console.log("ID de rutina creada:", createdRoutine.id, typeof createdRoutine.id);

        if (!createdRoutine.id || createdRoutine.id === "") {
            throw new Error("No se generó ID para la rutina");
        }
        await Promise.all(
                selectedExercises.map((exercise) =>
                    create_exercise_routine({
                        ejercicio_id: exercise.id,
                        rutina_id: createdRoutine.id,
                        exercise_info: exercise as unknown as Exercise,
                        routine_info: createdRoutine as Routine,
                    }),
            ),
        );

        await refetch_routine();
        await refetch_exercise_routine();
    }

    async function handleUpdateRoutine(
        updatedRoutine: Routine,
        selectedExercises: SelectedExerciseItem[] = []
    ) {
        // actualiza base de datos
        const { id, ...projectData } = updatedRoutine;
        await update_routine(String(id), projectData);

        // obtiene relaciones
        const existingExercises = exercises_routines.filter((item) => item.ejercicio_id === id);
        
        // remueve relaciones
        await Promise.all(existingExercises.map((item) => remove_exercise_routine(String(item.id))));

        await Promise.all(
            selectedExercises.map((exercise) =>
                create_exercise_routine({
                    ejercicio_id: exercise.id,
                    rutina_id: id,
                    exercise_info: exercise as unknown as Exercise,
                    routine_info: updatedRoutine as Routine,
                })
            )
        )

        await refetch_routine();
        await refetch_exercise_routine();
    }

    async function handleDeleteRoutine(routineId: string){
        const existingExercises = exercises_routines.filter((item) => item.ejercicio_id === routineId);
        await Promise.all(existingExercises.map((item) => remove_exercise_routine(String(item.id))));
        await remove_routine(routineId);
        
        await refetch_routine();
        await refetch_exercise_routine();
    }

    async function handleDeleteExerciseRoutine(ExeRoutineId: string){
        await remove_exercise_routine(ExeRoutineId);
        await refetch_exercise_routine();
    }

    return (
        <main className="min-h-screen bg-[var(--page-bg)] text-[var(--foreground)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 lg:px-8">
                <PortalShell
                    title="Almacenamiento de rutinas"
                    subtitle="Administra tus sesiones."
                    activePath="/routines"
                >
                    <div className="grid grid-cols-1 gap-20">
                        <Button2Modal onAddProduct={handleAddRoutine} />
                    </div>

                    <div className="mt-0">
                        <RoutineTable
                            routines={routines}
                            exercise_routines={exercises_routines}
                            totalRoutines={routines.length}
                            onUpdateRoutine={handleUpdateRoutine}
                            onDeleteRoutine={handleDeleteRoutine}
                            onDeleteExerciseRoutine={handleDeleteExerciseRoutine}
                        />
                    </div>
                </PortalShell>
            </div>
        </main>
    )
}