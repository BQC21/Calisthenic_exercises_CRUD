"use client";

import { useState } from "react";
import { EditIcon } from "@/features/view/components/icons/EditIcon";
import { EditExeModal } from "@/features/view/components/modals/Exercises/EditExeModal";
import type { Exercise } from "@/lib/types/exe-types";

type Button2EditProps = {
    exercise: Exercise;
    onUpdateExercise: (exercise: Exercise) => void;
};

export default function Button2Edit({ exercise, onUpdateExercise }: Button2EditProps) {
    const [open, setOpen] = useState(false);

    return (
    <div>
        <button
            onClick={() => setOpen(true)}
            className="table-icon-button icon-button--edit"
            type="button"
            title="Editar ejercicio"
        >
            <EditIcon />
        </button>

        {open && (
            <EditExeModal
                exercise = {exercise}
                onUpdateExercise={async (exercise) => {
                    await onUpdateExercise(exercise);
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
    </div>
    );
}