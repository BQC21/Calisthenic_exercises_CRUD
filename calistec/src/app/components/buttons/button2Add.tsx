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
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
            <PlusIcon />
            <span>Añadir Producto</span>
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