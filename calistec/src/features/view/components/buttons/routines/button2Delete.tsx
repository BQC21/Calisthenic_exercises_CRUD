import { Routine } from "@/lib/types/routine-types";
import { Exercise_Routine } from "@/lib/types/routineExe-types";
import { useState } from "react";
import { DeleteIcon } from "../../icons/DeleteIcon";

type DeleteRoutineModalProps = {
    routine: Routine;
    exercise_routine: Exercise_Routine[];
    onDeleteRoutine: (routineId: string) => void;
    onDeleteExerciseRoutine: (exerciseRoutineId: string) => void;
};

export function Button2Trash({ routine, exercise_routine,
    onDeleteRoutine, onDeleteExerciseRoutine }: DeleteRoutineModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            type="button"
            onClick={() => setOpen(true)}
            className="table-icon-button text-indigo-600"
            title="Eliminar proyecto"
        >
            <DeleteIcon />
        </button>

        {open && (
            <DeleteRoutineModal
                routine={routine}
                exercise_routine={exercise_routine}
                onDeleteRoutine={(routineId: string) => {
                    onDeleteRoutine(routineId);
                    setOpen(false);
                }}
                onDeleteExerciseRoutine={(exerciseRoutineId: string) => {
                    onDeleteExerciseRoutine(exerciseRoutineId);
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
        </>
    );
}