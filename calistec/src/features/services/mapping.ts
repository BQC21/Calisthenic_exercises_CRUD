import type { Exercise, ExerciseFormData } from "@/lib/types/exe-types";
import type { Routine, RoutineWithExercises, RoutineExerciseItem } from "@/lib/types/routine-types";

export type SupabaseExeRow = {
    id?: number | string;
    exercises?: string;
    focus?: string;
    movement?: string;
    level?: string;
    type?: string;
};

export type SupabaseRoutineRow = {
    id?: number | string;
    title?: string;
    description?: string;
};

export type SupabaseRoutineExerciseRow = {
    id?: number | string;
    routine_id?: number | string;
    exercise_id?: number | string;
    position?: number;
    exercise?: SupabaseExeRow | null;
};

export type SupabaseRoutineWithExercisesRow = SupabaseRoutineRow & {
    routine_exercises?: SupabaseRoutineExerciseRow[] | null;
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


export function mapSupabaseRowToRoutineWithExercises(
    row: SupabaseRoutineWithExercisesRow
): RoutineWithExercises {
    return {
        id: row.id?.toString() || "",
        title: row.title || "",
        description: row.description || "",
        // mapea cada ejercicio
        routine_exercises: (row.routine_exercises || []).map((item) => ({
            id: item.id?.toString() || "",
            routine_id: item.routine_id?.toString() || "",
            exercise_id: item.exercise_id?.toString() || "",
            position: item.position || 0,
            exercise: mapSupabaseRowToExe(item.exercise || {}),
        })),
    };
}

/**
 * Al Supabase
 */
export function mapRoutineToSupabaseRow(
    routine: Routine
): SupabaseRoutineWithExercisesRow {
    return {
        id: routine.id || undefined,
        title: routine.title,
        description: routine.description,
    };
}

export function mapRoutine_ExercisesToSupabaseRow(
    routine_exercise: RoutineExerciseItem
): SupabaseRoutineExerciseRow {
    return {
        routine_id: routine_exercise.routine_id,
        exercise_id: routine_exercise.exercise_id,
        position: routine_exercise.position,
    };
}

export function mapRoutineExercisesListToSupabaseRow(
    routineExercises: RoutineExerciseItem[]
): SupabaseRoutineExerciseRow[] {
    return routineExercises.map(
        mapRoutine_ExercisesToSupabaseRow
    );
}

export function mapExeToSupabaseRow(
        exercise: ExerciseFormData
    ): SupabaseExeRow {
        return {
            exercises: exercise.exercise,
            focus: exercise.focus,
            movement: exercise.movement,
            level: exercise.level,
            type: exercise.type,
    };
}