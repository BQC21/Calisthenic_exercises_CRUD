import type { Exercise, ExerciseFormData } from "@/lib/types/exe-types";

export type SupabaseExeRow = {
    id?: number | string;
    exercises?: string;
    focus?: string;
    movement?: string;
    level?: string;
    type?: string;
};

/**
 * Al frontend
 */
export function mapSupabaseRowToExe(
        row: SupabaseExeRow
    ): Exercise {
        return {
            id: row.id?.toString() || "",
            exercise: row.exercises || "",
            focus: row.focus || "",
            movement: row.movement || "",
            level: row.level || "",
            type: row.type || "",
    };
}

/**
 * Al Supabase
 */
export function mapExeToSupabaseRow(
        product: ExerciseFormData
    ): SupabaseExeRow {
        return {
            exercises: product.exercise,
            focus: product.focus,
            movement: product.movement,
            level: product.level,
            type: product.type,
    };
}