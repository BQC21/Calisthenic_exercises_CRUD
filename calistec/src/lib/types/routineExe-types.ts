import { Exercise, SupabaseExerciseRow } from "./exe-types";
import { Routine, SupabaseRoutineRow } from "./routine-types";

export type Exercise_RoutineFormState = Omit<Exercise_Routine, "id">;
export type Exercise_RoutineFormData = Omit<Exercise_Routine, "id">;

export type SupabaseExercise_RoutineRow = {
    id?: number | string;
    exercise_id?: number | string;
    exercise_info?: SupabaseExerciseRow;
    exercises?: SupabaseExerciseRow; 
    routine_id?: number | string;
    routine_info?: SupabaseRoutineRow;
    routines?: SupabaseRoutineRow; 
}

export type Exercise_Routine = {
    id: number | string | undefined;
    exercise_id: number | string | undefined;
    exercise_info: Exercise | undefined;
    routine_id: number | string | undefined;
    routine_info: Routine | undefined;
}

export type UseExercise_RoutineResult = {
    exercises_routines: Exercise_Routine[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export type useExercise_RoutineMutationResult = {
    loading: boolean;
    error: string | null;
    create: (exercises_routines: Exercise_RoutineFormData) => Promise<Exercise_Routine>;
    update: (id: string, exercises_routines: Exercise_RoutineFormData) => Promise<Exercise_Routine>;
    remove: (id: string) => Promise<void>;
}