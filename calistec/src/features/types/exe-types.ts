
// Campos para la base de datos
export type Exercise = {
    id: string;
    exercise: string;
    focus: string;
    movement: string;
    level: string;
    type: string;
};

// Estado del formulario para agregar o editar
export type ExerciseFormData = Omit<Exercise, "id">;
    
// Estado de la visualización
export interface UseExercisesResult {
    exercises: Exercise[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

// Opciones para el filtrado
export type ExerciseFilterOptions = {
    focus: string[];
    movement: string[];
    level: string[];
    type: string[];
};

// Mostrar tabla modificada
export interface UseExerciseMutationsResult {
    loading: boolean;
    error: string | null;
    create: (exercise: ExerciseFormData) => Promise<Exercise>;
    update: (id: string, exercise: ExerciseFormData) => Promise<Exercise>;
    remove: (id: string) => Promise<void>;
}