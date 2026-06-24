"use client";

import { useState } from "react";
import { PlusIcon } from "@/features/view/components/icons/PlusIcon";
import { RoutineFormData } from "@/lib/types/routine-types";
import AddRoutineModal from "../../modals/routines/AddRoutineModal";
import { SelectedExerciseItem } from "@/lib/types/exe-types";

type Button2ModalProps = {
    onAddProduct: (
        product: RoutineFormData,
        selectedExercises: SelectedExerciseItem[]
    ) => Promise<void> | void;
};

export default function Button2Modal({ onAddProduct }: Button2ModalProps) {
    const [open, setOpen] = useState(false);

    return (
    <div>
        <button
            onClick={() => setOpen(true)}
            className="action-button action-button--success"
        >
            <PlusIcon />
            <span>Añadir rutina</span>
        </button>

        {open && (
            <AddRoutineModal
                onAddRoutine={async (routine, selectedExercises) => {
                    await onAddProduct(routine, selectedExercises);
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
    </div>
    );
}