"use client";

import { DeleteExeModal } from "@/features/view/components/modals/Exercises/DeleteExeModal";
import { DeleteIcon } from "@/features/view/components/icons/DeleteIcon";
import { useState } from "react";
import { DeleteExeModalProps_exe } from "@/lib/types/components/buttons";

export function Button2Delete({ exercise, onDeleteExercise }: DeleteExeModalProps_exe) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            type="button"
            onClick={() => setOpen(true)}
            className="table-icon-button icon-button--delete"
            title="Eliminar ejercicio"
        >
            <DeleteIcon />
        </button>

        {open && (
            <DeleteExeModal
                exercise={exercise}
                onDeleteExercise={(exerciseId) => {
                    onDeleteExercise(exerciseId);
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
        </>
    );
}