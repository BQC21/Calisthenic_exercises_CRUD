
export type RoutineFormData = Omit<Routine, "id">;
export type RoutineFormState = Omit<Routine, "id">;

export type SupabaseRoutineRow = {
    id?: number | string;
    title?: string;
    description?: string;
    time_init?: Date | string | null;
    time_finish?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};

export type Routine = {
    id: number | string;
    title: string;
    description: string;
    time_init: Date | string | null;
    time_finish: Date | string | null;
    created_at: Date | string | null;
    updated_at: Date | string | null;
};


// Estado de la visualización
export interface UseRoutineResult {
    routines: Routine[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

// Mostrar tabla modificada
export interface UseRoutineMutationsResult {
    loading: boolean;
    error: string | null;
    create: (routine: RoutineFormData) => Promise<Routine>;
    update: (id: string, routine: RoutineFormData) => Promise<Routine>;
    remove: (id: string) => Promise<void>;
}