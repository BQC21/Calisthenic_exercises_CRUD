import { createClient } from "@/lib/supabase/client";
import type { 
    Routine, 
    RoutineExerciseItem, 
    RoutineWithExercises,
    RoutineList,
    RoutineWithExercisesList
} from "@/lib/types/routine-types";
import { 
    mapRoutine_ExercisesToSupabaseRow, 
    mapRoutineToSupabaseRow,
    mapRoutineExercisesListToSupabaseRow,
    mapSupabaseRowToRoutineWithExercises
} from "./mapping";

const ROUTINES_TABLE = 'rutinas';

// Post operation
export async function createRoutine(routineExercises: RoutineExerciseItem[]): Promise<Routine> {
    const supabase = createClient();
    const supabaseRow = mapRoutineExercisesListToSupabaseRow(routineExercises);

    const { data, error } = await supabase
    .from(ROUTINES_TABLE)
    .insert(supabaseRow)
    .select()
    .single();

    if (error) {
        throw new Error(`Error al crear la rutina: ${error.message}`);
    }

    return mapSupabaseRowToRoutineWithExercises(data);
}

// Get operation
export async function getRoutine(): Promise<RoutineWithExercises[]> {
    const supabase = createClient();

    const { data, error } = await supabase
    .from(ROUTINES_TABLE)
    .select("*");

    if (error) {
        throw new Error(`Error al obtener las rutinas: ${error.message}`);
    }

    return data.map(mapSupabaseRowToRoutineWithExercises);
}

// Get operation -- only an routine from Id
export async function getRoutineById(id: string): Promise<Routine> {
    const supabase = createClient();

    const { data, error } = await supabase
    .from(ROUTINES_TABLE)
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
        throw new Error(`Error al obtener la rutina: ${error.message}`);
    }

    return mapSupabaseRowToRoutineWithExercises(data);
}

// Put operation
export async function updateExe(id: string, routine: Routine): Promise<Routine> {
    const supabase = createClient();
    const supabaseRow = mapRoutineToSupabaseRow(routine);

    const { data, error } = await supabase
    .from(ROUTINES_TABLE)
    .update(supabaseRow)
    .eq("id", id)
    .select()
    .single();

    if (error) {
        throw new Error(`Error al actualizar la rutina: ${error.message}`);
    }

    return mapSupabaseRowToRoutineWithExercises(data);
}

// Delete operation
export async function deleteRoutine(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
    .from(ROUTINES_TABLE)
    .delete()
    .eq("id", id);

    if (error) {
        throw new Error(`Error al eliminar la rutina: ${error.message}`);
    }
}