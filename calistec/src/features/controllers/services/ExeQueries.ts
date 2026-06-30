import { createClient } from "@/lib/supabase/client";
import type { Exercise, ExerciseFormData } from "@/lib/types/services/exe-types";
import { mapSupabaseRowToExe, mapExeToSupabaseRow } from "../../../lib/mapping/mapping_exe";

const EXERCISES_TABLE = "ejercicios";


// Post operation -- create new exercise
export async function createExe(exercise: ExerciseFormData): Promise<Exercise> {
  const supabase = createClient();
  const supabaseRow = mapExeToSupabaseRow(exercise);

  const { data, error } = await supabase
    .from(EXERCISES_TABLE)
    .insert(supabaseRow)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear el ejercicio: ${error.message}`);
  }

  return mapSupabaseRowToExe(data);
}

// Get operation -- all exercises
export async function getExe(): Promise<Exercise[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(EXERCISES_TABLE)
    .select("*");

  if (error) {
    throw new Error(`Error al obtener los ejercicios: ${error.message}`);
  }

  return data.map(mapSupabaseRowToExe);
}

// Get operation -- only an exercise from Id
export async function getExeById(id: string): Promise<Exercise> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(EXERCISES_TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error al obtener el ejercicio: ${error.message}`);
  }

  return mapSupabaseRowToExe(data);
}

// Put operation -- update a selected exercise 
export async function updateExe(id: string, exercise: ExerciseFormData): Promise<Exercise> {
  const supabase = createClient();
  const supabaseRow = mapExeToSupabaseRow(exercise);

  const { data, error } = await supabase
    .from(EXERCISES_TABLE)
    .update(supabaseRow)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar el ejercicio: ${error.message}`);
  }

  return mapSupabaseRowToExe(data);
}

// Delete operation -- remove a selected exercise 
export async function deleteExe(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from(EXERCISES_TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Error al eliminar el ejercicio: ${error.message}`);
  }
}

// Get filtered exercises
export async function getExeFilterOptions(): Promise<{
    focus: string[];
    level: string[];
}> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(EXERCISES_TABLE)
    .select("focus, level");

  if (error) {
    throw new Error(`Error al obtener las opciones de filtrado: ${error.message}`);
  }

  const focus = Array.from(new Set(data.map((item) => item.focus).filter(Boolean)));
  const level = Array.from(new Set(data.map((item) => item.level).filter(Boolean)));

  return { focus, level };
}