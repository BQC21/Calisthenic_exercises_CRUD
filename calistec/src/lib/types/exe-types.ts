
// Estado del formulario para agregar o editar
export type ExerciseFormData = Omit<Exercise, "id">;
export type ExerciseFormState = Omit<Exercise, "id">;
// export type EquiposFilterValues = Record<FilterKey, string>;

// Equipo seleccionado
export type SelectedExerciseItem = {
    row: string;
    id: string | number | undefined;
    title: string | undefined;
    focus:string | undefined;
    level: string | undefined;
};

// Campos de la base de datos
export type SupabaseExerciseRow = {
    id?: number | string;
    title?: string;
    focus?: string;
    level?: string;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
}

// Campos para la tabla
export type Exercise = {
    id: number | string | undefined;
    title: string | undefined;
    focus: string | undefined;
    level: string | undefined;
    created_at: Date | string | null | undefined;
    updated_at: Date | string | null | undefined;
};

// Estado de la visualización
export interface UseExerciseResult {
    exercises: Exercise[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

// Opciones para el filtrado
export type ExerciseFilterOptions = {
    focus: string[];
    level: string[];
};

// Mostrar tabla modificada
export interface UseExerciseMutationsResult {
    loading: boolean;
    error: string | null;
    create: (exercise: ExerciseFormData) => Promise<Exercise>;
    update: (id: string, exercise: ExerciseFormData) => Promise<Exercise>;
    remove: (id: string) => Promise<void>;
}