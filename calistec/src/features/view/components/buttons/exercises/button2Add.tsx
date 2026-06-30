"use client";

import { useState } from "react";
import { PlusIcon } from "@/features/view/components/icons/PlusIcon";
import { AddExeModal } from "@/features/view/components/modals/Exercises/AddExeModal";
import { Button2ModalProps, Button2ModalProps_exe } from "@/lib/types/components/buttons";

export default function Button2Modal({ onAddProduct }: Button2ModalProps_exe) {
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