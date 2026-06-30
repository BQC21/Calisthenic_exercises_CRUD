import { Routine } from "@/lib/types/services/routine-types";
import { useState } from "react";
import { DeleteIcon } from "../../icons/DeleteIcon";
import DeleteRoutineModal from "../../modals/routines/DeleteRoutineModal";
import { DeleteRoutineModalProps } from "@/lib/types/components/buttons";

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