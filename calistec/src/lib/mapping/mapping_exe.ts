import type { Exercise, ExerciseFormData, ExerciseFormState, 
    SupabaseExerciseRow } from "@/lib/types/exe-types";
    
import { parseNullableDate } from "../utils/helpers";

// enlace con los atributos de Supabase
export function createExercisesFormStateFromExercises(exercise: Exercise): ExerciseFormState {
    return {
        title: exercise.title,
        focus: exercise.focus,
        level: exercise.level,
        created_at: exercise.created_at,
        updated_at: exercise.updated_at,
    };
}

/**
 * Al frontend
 */
export function mapSupabaseRowToExe(
        row: SupabaseExerciseRow
    ): Exercise {
        return {
            id: row.id?.toString() || "",
            title: row.title || "",
            focus: row.focus || "",
            level: row.level || "",
            created_at: parseNullableDate(row.created_at) ?? new Date(),
            updated_at: parseNullableDate(row.created_at) ?? new Date(),
    };
}

/**
 * Al Supabase
 */
export function mapExeToSupabaseRow(
        exercise: ExerciseFormData
    ): SupabaseExerciseRow {
        return {
            title: exercise.title,
            focus: exercise.focus,
            level: exercise.level,
            created_at: exercise.created_at,
            updated_at: exercise.updated_at,
    };
}