import { SupabaseExerciseRow } from "../types/services/exe-types"
import { SupabaseRoutineRow } from "../types/services/routine-types"
import { Exercise_Routine, Exercise_RoutineFormData, Exercise_RoutineFormState, 
    SupabaseExercise_RoutineRow } from "../types/services/routineExe-types"
import { mapSupabaseRowToExe } from "./mapping_exe"
import { mapSupabaseRowToRoutine } from "./mapping_routine"

export function createExercise_RoutineFormStateFromExercise_Routine(
    exercise_routine: Exercise_Routine
): Exercise_RoutineFormState{
    return {
        ejercicio_id: exercise_routine.ejercicio_id,
        exercise_info: exercise_routine.exercise_info,
        rutina_id: exercise_routine.rutina_id,
        routine_info: exercise_routine.routine_info,
    }
}

export function mapSupabaseRowToExercise_Routine(
    row: SupabaseExercise_RoutineRow
): Exercise_Routine{
    return {
        id: row.id?.toString() || "",
        ejercicio_id: row.ejercicio_id?.toString() || "",  
        exercise_info: row.exercise_info
                    ? mapSupabaseRowToExe(row.exercise_info as SupabaseExerciseRow)
                        : row.exercises
                        ? mapSupabaseRowToExe(row.exercises as SupabaseExerciseRow)
                        : row.ejercicios
                        ? mapSupabaseRowToExe(row.ejercicios as SupabaseExerciseRow)
                            : undefined,
        rutina_id: row.rutina_id?.toString() || "",  
        routine_info: row.routine_info
                    ? mapSupabaseRowToRoutine(row.routine_info as SupabaseRoutineRow)
                    : row.routines
                        ? mapSupabaseRowToRoutine(row.routines as SupabaseRoutineRow)
                        : row.rutinas
                        ? mapSupabaseRowToRoutine(row.rutinas as SupabaseRoutineRow)
                        : undefined,        
    }
}

export function mapExercise_RoutineToSupabaseRow(
    exercise_routine: Exercise_RoutineFormData
): SupabaseExercise_RoutineRow{
    return {
        ejercicio_id: exercise_routine.ejercicio_id,
        rutina_id: exercise_routine.rutina_id,
    }
}

