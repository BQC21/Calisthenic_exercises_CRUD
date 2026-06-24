import { createClient } from "@/lib/supabase/client";
import { Routine, RoutineFormData, UseRoutineMutationsResult, UseRoutineResult } from "@/lib/types/routine-types";
import { useCallback, useEffect, useState } from "react";
import { createRoutine, deleteRoutine, getRoutine, updateRoutine } from "../../controllers/services/RoutineQueries";

const supabase = createClient();

export function useRoutine(): UseRoutineResult {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRoutines = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getRoutine();
            setRoutines(data);
        } catch (err) {
            const message =
            err instanceof Error ? err.message : 
                "Error al cargar las rutinas";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        void fetchRoutines();
    }, [fetchRoutines]);

    useEffect(() => {
        const channelName = `rutinas-realtime-${Date.now()}-${Math.random().toString(36).slice(2)}`; // previene colision de suscripciones
        const channel = supabase
            .channel(channelName)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "rutinas" },
                () => {
                    void fetchRoutines();
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "rutinas" },
                () => {
                    void fetchRoutines();
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "rutinas" },
                () => {
                    void fetchRoutines();
                }
            )
            .subscribe();

        // Cierra el canal realtime para evitar listeners duplicados y fugas de memoria.
        return () => {
            void supabase.removeChannel(channel);
        };

    }, [fetchRoutines]);

    return {
        routines,
        loading,
        error,
        refetch: fetchRoutines,
    };
}

export function useRoutineMutations(): UseRoutineMutationsResult{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (routine: RoutineFormData) => {
        try {
            setLoading(true);
            setError(null);

            return await createRoutine(routine);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 
                    "Error al crear la rutina";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const update = useCallback(async (id: string,
        routine: RoutineFormData) => {
        try {
            setLoading(true);
            setError(null);

            return await updateRoutine(id, { id, ...routine });
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 
                    "Error al actualizar la rutina";

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

            await deleteRoutine(id);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 
                "Error al eliminar la rutina";

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