"use client";

import { useState } from "react";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { EditExeModal } from "@/app/components/modals/EditExeModal";
import type { Exercise } from "@/features/types/exe-types";

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
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
            <PlusIcon />
            <span>Añadir Ejercicio</span>
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