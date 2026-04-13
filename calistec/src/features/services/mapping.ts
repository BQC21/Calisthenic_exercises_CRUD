import type { Exercise, ExerciseFormData } from "@/features/types/exe-types";

export type SupabaseExeRow = {
    id?: number | string;
    exercise?: string;
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
            exercise: row.exercise || "",
            focus: row.focus || "",
            movement: row.movement || "",
            level: row.level || "",
            type: row.type || "",
    };
}

/**
 * Al Supabase
 */
export function mapProductToSupabaseRow(
        product: ExerciseFormData
    ): SupabaseExeRow {
        return {
            exercise: product.exercise,
            focus: product.focus,
            movement: product.movement,
            level: product.level,
            type: product.type,
    };
}