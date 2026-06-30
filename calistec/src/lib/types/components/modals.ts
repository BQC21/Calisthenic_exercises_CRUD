import { Exercise, ExerciseFormData, SelectedExerciseItem } from "../services/exe-types";
import { Routine, RoutineFormData } from "../services/routine-types";
import { Exercise_Routine } from "../services/routineExe-types";

// ------------------
// modals -- agregar
// ------------------

export type AddExeModalProps = {
    onAddProduct: (product: ExerciseFormData) => void;
    onClose: () => void;
};

export type AddRoutineModalProps = {
    onAddRoutine: (
        routine: RoutineFormData,
        selectedExercise: SelectedExerciseItem[]
    ) => Promise<void> | void;
    onClose: () => void;
}

// ------------------
// modals -- editar
// ------------------

export type EditExeModalProps = {
    exercise: Exercise;
    onUpdateExercise: (exercise: Exercise) => void;
    onClose: () => void;
};

export type EditRoutineModalProps = {
    existingRoutine: Routine,
    existingRoutineExercise: Exercise_Routine[],
    onUpdateRoutine: (
        routine: RoutineFormData,
        selectedExercise: SelectedExerciseItem[]
    ) => Promise<void> | void;
    onClose: () => void;
}

// ------------------
// modals -- eliminar
// ------------------

export type DeleteExeModalProps = {
    exercise: Exercise;
    onDeleteExercise: (exerciseId: string) => void
    onClose: () => void;
};

export type DeleteRoutineModalProps = {
    routine: Routine;
    onDeleteRoutine: (routineId: string) => void;
    onClose: () => void;
};