import type { ExerciseFormState } from "@/lib/types/services/exe-types";
import { FOCUS_OPTIONS, LEVEL_OPTIONS } from "./options";
import { RoutineFormState } from "../types/services/routine-types";
import { Exercise_RoutineFormState } from "../types/services/routineExe-types";

export const INITIAL_EXERCISE_FORM: ExerciseFormState = {
    title: " ",
    focus: FOCUS_OPTIONS[0],
    level: LEVEL_OPTIONS[0],
    created_at: new Date(),
    updated_at: new Date()
};

export const INITIAL_ROUTINE_FORM: RoutineFormState = {
    created_at: new Date(),
    updated_at: new Date(),
    description: " ",
    time_init: new Date(),
    time_finish: new Date(),
}

export const INITIAL_ROUTINE_EXERCISE_FORM: Exercise_RoutineFormState = {
    ejercicio_id: " ",
    exercise_info: undefined,
    rutina_id: " ",
    routine_info: undefined, 
}