import { createClient } from "@/lib/supabase/client";
import type { Exercise, ExerciseFormData } from "@/lib/types/exe-types";
import { mapSupabaseRowToExe, mapExeToSupabaseRow } from "./mapping";

const EXERCISES_TABLE = "ejercicios";


// Post operation -- create new exercise
export async function createExe(product: ExerciseFormData): Promise<Exercise> {
  const supabase = createClient();
  const supabaseRow = mapExeToSupabaseRow(product);

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
export async function updateExe(id: string, product: ExerciseFormData): Promise<Exercise> {
  const supabase = createClient();
  const supabaseRow = mapExeToSupabaseRow(product);

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
    movement: string[];
    level: string[];
    type: string[];
}> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(EXERCISES_TABLE)
    .select("focus, movement, level, type");

  if (error) {
    throw new Error(`Error al obtener las opciones de filtrado: ${error.message}`);
  }

  const focus = Array.from(new Set(data.map((item) => item.focus).filter(Boolean)));
  const movement = Array.from(new Set(data.map((item) => item.movement).filter(Boolean)));
  const level = Array.from(new Set(data.map((item) => item.level).filter(Boolean)));
  const type = Array.from(new Set(data.map((item) => item.type).filter(Boolean)));

  return { focus, movement, level, type };
}