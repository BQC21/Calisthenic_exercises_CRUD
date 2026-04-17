"use client";

import { DeleteExeModal } from "@/app/components/modals/DeleteExeModal";
import { DeleteIcon } from "@/app/components/icons/DeleteIcon";
import { useState } from "react";
import { Exercise } from "@/features/types/exe-types";

type DeleteExeModalProps = {
    exercise: Exercise;
    onDeleteExercise: (exerciseId: string) => void;
};

export function Button2Delete({ exercise, onDeleteExercise }: DeleteExeModalProps) {
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