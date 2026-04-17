import type { Exercise } from "@/features/types/exe-types";

export type ExerciseFormState = Omit<Exercise, "id">;

export const FOCUS_OPTIONS = [
	"PUSH",
	"PULL",
	"CORE",
	"LEGS",
	"BALANCE",
];

export const MOVEMENT_OPTIONS = [
	"Horizontal",
	"Vertical",
	"Diagonal",
];

export const LEVEL_OPTIONS = [
	"Newbie",
	"Beginner",
	"Intermediate",
	"Advanced",
	"Elite",
];

export const TYPE_OPTIONS = [
	"Reps",
	"Time",
];


export const INITIAL_EXERCISE_FORM: ExerciseFormState = {
	exercise: " ",
	focus: FOCUS_OPTIONS[0],
	movement: MOVEMENT_OPTIONS[0],
	level: LEVEL_OPTIONS[0],
	type: TYPE_OPTIONS[0],
};

export function createExeFormStateFromExe(exercise: Exercise): ExerciseFormState {
	return {
		exercise: exercise.exercise,
		focus: exercise.focus,
		movement: exercise.movement,
		level: exercise.level,
		type: exercise.type,
	};	
};
