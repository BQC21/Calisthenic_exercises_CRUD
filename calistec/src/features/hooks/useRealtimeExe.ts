"use client";

import { useCallback, useEffect, useState } from "react";

import {
    createExe,
    deleteExe,
    getExe,
    getExeFilterOptions,
    updateExe,
} from "@/features/services/ExeQueries";
import type { 
    Exercise,
    ExerciseFormData,
    UseExercisesResult,
    ExerciseFilterOptions,
    UseExerciseMutationsResult,
} from "@/features/types/exe-types";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function useExercise(): UseExercisesResult {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExercises = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getExe();
            setExercises(data);
        } catch (err) {
            const message =
            err instanceof Error ? err.message : "Error al cargar los ejercicios";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchExercises();
    }, [fetchExercises]);

    useEffect(() => {
        const channelName = `products-realtime-${Date.now()}-${Math.random().toString(36).slice(2)}`; // previene colision de suscripciones
        const channel = supabase
            .channel(channelName)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "ejecicios" },
                () => {
                    void fetchExercises();
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "ejecicios" },
                () => {
                    void fetchExercises();
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "ejecicios" },
                () => {
                    void fetchExercises();
                }
            )
            .subscribe();

        // Cierra el canal realtime para evitar listeners duplicados y fugas de memoria.
        return () => {
            void supabase.removeChannel(channel);
        };

    }, [fetchExercises]);

    return {
        exercises,
        loading,
        error,
        refetch: fetchExercises,
    };
}

export function useExerciseFilterOptions() {
    const [options, setOptions] = useState<ExerciseFilterOptions>({
        focus: [],
        movement: [],
        level: [],
        type: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOptions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getExeFilterOptions();
            setOptions(data);
        } catch (err) {
            const message =
            err instanceof Error ? err.message : "Error al cargar las opciones de filtro";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchOptions();
    }, [fetchOptions]);

    return {
        options,
        loading,
        error,
        refetch: fetchOptions,
    };
}

export function useExerciseMutations(): UseExerciseMutationsResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (product: ExerciseFormData) => {
        try {
            setLoading(true);
            setError(null);

            return await createExe(product);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Error al crear el ejercicio";

            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const update = useCallback(async (id: string, product: ExerciseFormData) => {
        try {
            setLoading(true);
            setError(null);

            return await updateExe(id, product);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Error al actualizar el ejercicio";

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

            await deleteExe(id);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Error al eliminar el ejercicio";

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