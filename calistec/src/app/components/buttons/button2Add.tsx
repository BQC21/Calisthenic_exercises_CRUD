"use client";

import { useState } from "react";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { AddExeModal } from "@/app/components/modals/AddExeModal";
import type { ExerciseFormData } from "@/features/types/exe-types";

type Button2ModalProps = {
    onAddProduct: (product: ExerciseFormData) => void;
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
            <span>Añadir ejercicio</span>
        </button>

        {open && (
            <AddExeModal
                onAddProduct={async (exercise) => {
                    await onAddProduct(exercise);
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
    </div>
    );
}