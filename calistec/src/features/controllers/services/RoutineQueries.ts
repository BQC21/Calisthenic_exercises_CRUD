import { mapRoutineToSupabaseRow, mapSupabaseRowToRoutine } from "@/lib/mapping/mapping_routine";
import { createClient } from "@/lib/supabase/client";
import { Routine, RoutineFormData } from "@/lib/types/routine-types";

const ROUTINES_TABLE = 'rutinas';

// Post operation
export async function createRoutine(routine: RoutineFormData): Promise<Routine> {
    const supabase = createClient();
    const supabaseRow = mapRoutineToSupabaseRow(routine);

    const { data, error } = await supabase
    .from(ROUTINES_TABLE)
    .insert(supabaseRow)
    .select()
    .single();

    if (error) {
        throw new Error(`Error al crear la rutina: ${error.message}`);
    }

    return mapSupabaseRowToRoutine(data);
}

// Get operation
export async function getRoutine(): Promise<Routine[]> {
    const supabase = createClient();

    const { data, error } = await supabase
    .from(ROUTINES_TABLE)
    .select("*");

    if (error) {
        throw new Error(`Error al obtener las rutinas: ${error.message}`);
    }

    return data.map(mapSupabaseRowToRoutine);
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

    return mapSupabaseRowToRoutine(data);
}

// Put operation
export async function updateRoutine(id: string, routine: Routine): Promise<Routine> {
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

    return mapSupabaseRowToRoutine(data);
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