import { Exercise, SelectedExerciseItem } from "../services/exe-types";
import { Routine } from "../services/routine-types";
import { Exercise_Routine } from "../services/routineExe-types";

export type ExeTableProps = {
    exercises: Exercise[];
    totalExecises: number;
    onUpdateExercise: (exercise: Exercise) => void;
    onDeleteExercise: (exerciseId: string) => void;
};

export type RoutineTableProps = {
    routines: Routine[];
    exercise_routines: Exercise_Routine[];
    totalRoutines: number;
    onUpdateRoutine: (
        routine: Routine,
        selectedExercises: SelectedExerciseItem[]
    ) => Promise<void> | void;
    onDeleteRoutine: (routineId: string) => void;
    onDeleteExerciseRoutine: (exercise_RoutineId: string) => void;
};