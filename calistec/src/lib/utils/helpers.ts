import type { Exercise, ExerciseFormState } from "@/lib/types/exe-types";

export function createExeFormStateFromExe(exercise: Exercise): ExerciseFormState {
	return {
		exercise: exercise.exercise,
		focus: exercise.focus,
		movement: exercise.movement,
		level: exercise.level,
		type: exercise.type,
	};	
};