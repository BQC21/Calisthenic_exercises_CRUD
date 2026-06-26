import { Routine } from "@/lib/types/routine-types";
import { useState } from "react";
import { DeleteIcon } from "../../icons/DeleteIcon";
import DeleteRoutineModal from "../../modals/routines/DeleteRoutineModal";

type DeleteRoutineModalProps = {
    routine: Routine;
    onDeleteRoutine: (routineId: string) => void;
};

export function Button2Delete({ routine,
    onDeleteRoutine }: DeleteRoutineModalProps) {
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
                onDeleteRoutine={(routineId: string) => {
                    onDeleteRoutine(routineId);
                    setOpen(false);
                }}
                // onDeleteExerciseRoutine={(exerciseRoutineId: string) => {
                //     onDeleteExerciseRoutine(exerciseRoutineId);
                //     setOpen(false);
                // }}
                onClose={() => setOpen(false)}
            />
        )}
        </>
    );
}