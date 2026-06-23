import { mapExercise_RoutineToSupabaseRow, mapSupabaseRowToExercise_Routine } from "@/lib/mapping/mapping_ExeRoutine";
import { createClient } from "@/lib/supabase/client";
import { Exercise_Routine, Exercise_RoutineFormData } from "@/lib/types/routineExe-types";

const EXERCISE_ROUTINE_TABLE = "ejercicio-rutina" 

export async function createJoinRoutineExercises(
    routine_exercise: Exercise_RoutineFormData
): Promise<Exercise_Routine> {
    const supabase = createClient();
    const baseRow = mapExercise_RoutineToSupabaseRow(routine_exercise) as Record<string, unknown>;
    const { data, error } = await supabase  
        .from(EXERCISE_ROUTINE_TABLE)
        .insert(baseRow)
        .select()
        .single();

    if (error) {
        throw new Error(`Error al crear la relación 
            proyecto - equipo: ${error.message}`);
    }

    return mapSupabaseRowToExercise_Routine(data);
}

export async function getJoinRoutineExercises(): Promise<Exercise_Routine[]>{
    const supabase = createClient();

    const { data, error } = await supabase
        .from(EXERCISE_ROUTINE_TABLE)
        .select("*,ejercicios(*),rutinas(*)")
    
    if (error) {
        throw new Error(`Error al obtener las relaciones 
            proyecto - equipo: ${error.message}`);
    }
    
    return data.map(mapSupabaseRowToExercise_Routine)
}

export async function getRoutineExercisesById(id: string): Promise<Exercise_Routine> {
    const supabase = createClient();

    const { data, error } = await supabase
    .from(EXERCISE_ROUTINE_TABLE)
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
        throw new Error(`Error al obtener la relación 
            proyecto - equipo: ${error.message}`);
    }

    return mapSupabaseRowToExercise_Routine(data);
}


export async function updateJoinRoutineExercises(
    id: string, project_equipos: Exercise_RoutineFormData
): Promise<Exercise_Routine>{
    const supabase = createClient();
    const baseRow = mapExercise_RoutineToSupabaseRow(project_equipos) as Record<string, unknown>;

    const { data, error } = await supabase
        .from(EXERCISE_ROUTINE_TABLE)
        .update(baseRow)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(`Error al actualizar la relación 
            ejercicio - rutina: ${error.message}`);
    }

    return mapSupabaseRowToExercise_Routine(data);
}

export async function deleteJoinRoutineExercises(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
    .from(EXERCISE_ROUTINE_TABLE)
    .delete()
    .eq("id", id);

    if (error) {
        throw new Error(`Error al borrar la relación 
            ejercicio - rutina: ${error.message}`);
    }
}