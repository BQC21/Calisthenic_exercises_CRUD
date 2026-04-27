
import type { Exercise } from "@/lib/types/exe-types";

export type Routine = {
    id: string;
    title: string;
    description: string;
};


export type RoutineExerciseItem = {
    id: string;
    routine_id: string;
    exercise_id: string;
    position: number;
    exercise: Exercise;
};

export type RoutineWithExercises = Routine & {
    routine_exercises: RoutineExerciseItem[];
};

export type RoutineList = Routine[]; // Muestra lista de rutinas
export type RoutineWithExercisesList = RoutineWithExercises[]; // Muestra lista de rutinas con sus ejercicios

export interface UseRoutineResult {
    routines: Routine[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export interface UseRoutineMutationsResult {
    loading: boolean;
    error: string | null;
    create: (routine: Routine) => Promise<Routine>;
    update: (id: string, routine: Routine) => Promise<Routine>;
    remove: (id: string) => Promise<void>;
}