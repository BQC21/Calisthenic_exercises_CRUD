import { SupabaseExerciseRow } from "../types/exe-types"
import { SupabaseRoutineRow } from "../types/routine-types"
import { Exercise_Routine, Exercise_RoutineFormData, Exercise_RoutineFormState, 
    SupabaseExercise_RoutineRow } from "../types/routineExe-types"
import { mapSupabaseRowToExe } from "./mapping_exe"
import { mapSupabaseRowToRoutine } from "./mapping_routine"

export function createExercise_RoutineFormStateFromExercise_Routine(
    exercise_routine: Exercise_Routine
): Exercise_RoutineFormState{
    return {
        exercise_id: exercise_routine.exercise_id,
        exercise_info: exercise_routine.exercise_info!,
        routine_id: exercise_routine.routine_id,
        routine_info: exercise_routine.routine_info!,
    }
}

export function mapSupabaseRowToExercise_Routine(
    row: SupabaseExercise_RoutineRow
): Exercise_Routine{
    return {
        id: row.id?.toString() || "",
        exercise_id: row.exercise_id?.toString() || "",  
        exercise_info: row.exercise_info
                    ? mapSupabaseRowToExe(row.exercise_info as SupabaseExerciseRow)
                        : row.exercises
                        ? mapSupabaseRowToExe(row.exercises as SupabaseExerciseRow)
                            : undefined,
        routine_id: row.routine_id?.toString() || "",  
        routine_info: row.routine_info
                    ? mapSupabaseRowToRoutine(row.routine_info as SupabaseRoutineRow)
                    : row.routines
                        ? mapSupabaseRowToRoutine(row.routines as SupabaseRoutineRow)
                        : undefined,        
    }
}

export function mapExercise_RoutineToSupabaseRow(
    exercise_routine: Exercise_RoutineFormData
): SupabaseExercise_RoutineRow{
    return {
        exercise_id: exercise_routine.exercise_id,  
        routine_id: exercise_routine.routine_id,  
    }
}