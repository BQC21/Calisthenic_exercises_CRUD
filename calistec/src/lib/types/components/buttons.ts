import { Exercise, ExerciseFormData, SelectedExerciseItem } from "../services/exe-types";
import { Routine, RoutineFormData } from "../services/routine-types";
import { Exercise_Routine } from "../services/routineExe-types";

// ------ Agregar ------

export type Button2ModalProps = {
    onAddProduct: (
        product: RoutineFormData,
        selectedExercises: SelectedExerciseItem[]
    ) => Promise<void> | void;
};

export type Button2ModalProps_exe = {
    onAddProduct: (product: ExerciseFormData) => void;
};

// ------ Editar -------

export type Button2EditProps = {
    routine: Routine;
    exercise_routines: Exercise_Routine[];
    onUpdateRoutine: (
        routine: Routine,
        selectedExercises: SelectedExerciseItem[]
    ) => Promise<void> | void;
};

export type Button2EditProps_exe = {
    exercise: Exercise;
    onUpdateExercise: (exercise: Exercise) => void;
};

// ------ Eliminar -----

export type DeleteRoutineModalProps = {
    routine: Routine;
    onDeleteRoutine: (routineId: string) => void;
};

export type DeleteExeModalProps_exe = {
    exercise: Exercise;
    onDeleteExercise: (exerciseId: string) => void;
};