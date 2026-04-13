
// Campos para la base de datos para los productos
export type Exercise = {
    id: string;
    exercise: string;
    focus: string;
    movement: string;
    level: string;
    type: string;
};

// Estado del formulario para agregar o editar productos
export type ExerciseFormData = Omit<Exercise, "id">;
    
// Estado de la visualización de productos
export interface UseExercisesResult {
    exercises: Exercise[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

// Opciones para el filtrado de productos
export type ExerciseFilterOptions = {
    focus: string[];
    movement: string[];
    level: string[];
    type: string[];
};

// Mostrar tabla de productos modificadas
export interface UseExerciseMutationsResult {
    loading: boolean;
    error: string | null;
    create: (exercise: ExerciseFormData) => Promise<Exercise>;
    update: (id: string, exercise: ExerciseFormData) => Promise<Exercise>;
    remove: (id: string) => Promise<void>;
}