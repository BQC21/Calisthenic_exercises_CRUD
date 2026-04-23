import type { ExerciseFormState } from "@/lib/types/exe-types";
import { FOCUS_OPTIONS, MOVEMENT_OPTIONS, LEVEL_OPTIONS, TYPE_OPTIONS } from "@/lib/utils/options";

export const INITIAL_EXERCISE_FORM: ExerciseFormState = {
    exercise: " ",
    focus: FOCUS_OPTIONS[0],
    movement: MOVEMENT_OPTIONS[0],
    level: LEVEL_OPTIONS[0],
    type: TYPE_OPTIONS[0],
};