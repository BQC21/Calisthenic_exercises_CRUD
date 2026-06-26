import { createJoinRoutineExercises, deleteJoinRoutineExercises, getJoinRoutineExercises, updateJoinRoutineExercises } from "@/features/controllers/services/ExeRoutineQueries";
import { createClient } from "@/lib/supabase/client";
import { Exercise_Routine, Exercise_RoutineFormData, useExercise_RoutineMutationResult, UseExercise_RoutineResult } from "@/lib/types/routineExe-types";
import { useCallback, useEffect, useState } from "react";


const supabase = createClient();

export function useExeRoutine(): UseExercise_RoutineResult {
    const [exercises_routines, setExercises_routines] = useState<Exercise_Routine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRoutines_exercises = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getJoinRoutineExercises();
            setExercises_routines(data);
        } catch (err) {
            const message =
            err instanceof Error ? err.message : 
                "Error al cargar las relaciones";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        void fetchRoutines_exercises();
    }, [fetchRoutines_exercises]);

    useEffect(() => {
        const channelName = `rutinas_ejercicios-realtime-${Date.now()}-${Math.random().toString(36).slice(2)}`; // previene colision de suscripciones
        const channel = supabase
            .channel(channelName)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "rutinas_ejercicios" },
                () => {
                    void fetchRoutines_exercises();
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "rutinas_ejercicios" },
                () => {
                    void fetchRoutines_exercises();
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "rutinas_ejercicios" },
                () => {
                    void fetchRoutines_exercises();
                }
            )
            .subscribe();

        // Cierra el canal realtime para evitar listeners duplicados y fugas de memoria.
        return () => {
            void supabase.removeChannel(channel);
        };

    }, [fetchRoutines_exercises]);

    return {
        exercises_routines,
        loading,
        error,
        refetch: fetchRoutines_exercises,
    };
}

export function useExeRoutineMutations(): useExercise_RoutineMutationResult{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (routine_exercise: Exercise_RoutineFormData) => {
        try {
            setLoading(true);
            setError(null);

            return await createJoinRoutineExercises(routine_exercise);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 
                    "Error al crear la relación";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const update = useCallback(async (id: string,
        routine_exercise: Exercise_RoutineFormData) => {
        try {
            setLoading(true);
            setError(null);

            return await updateJoinRoutineExercises(id, routine_exercise );
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 
                    "Error al actualizar la relación";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const remove = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            await deleteJoinRoutineExercises(id);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 
                "Error al eliminar la relación";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        create,
        update,
        remove,
    };
}