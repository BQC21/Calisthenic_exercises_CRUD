

import { Routine, RoutineFormData, RoutineFormState, SupabaseRoutineRow } from "../types/routine-types";
import { parseNullableDate } from "../utils/helpers";

// enlace con los atributos de Supabase
export function createRoutineFormStateFromRoutine(routine: Routine): RoutineFormState {
    return {
        description: routine.description,
        time_init: routine.time_init,
        time_finish: routine.time_finish,
        created_at: routine.created_at,
        updated_at: routine.updated_at,
    };
}

/**
 * Al frontend
 */
export function mapSupabaseRowToRoutine(
        row: SupabaseRoutineRow
    ): Routine {
        return {
            id: row.id?.toString() || "",
            description: row.description || "",
            time_init: parseNullableDate(row.time_init),
            time_finish: parseNullableDate(row.time_finish),
            created_at: parseNullableDate(row.created_at) ?? new Date(),
            updated_at: parseNullableDate(row.created_at) ?? new Date(),
    };
}

/**
 * Al Supabase
 */
export function mapRoutineToSupabaseRow(
        routine: RoutineFormData
    ): SupabaseRoutineRow {
        return {
        description: routine.description,
        time_init: routine.time_init,
        time_finish: routine.time_finish,
        created_at: routine.created_at,
        updated_at: routine.updated_at,
    };
}