"use client";

import { useState } from "react";
import { AddExeSelectField } from "@/app/components/Form_fields/AddExeSelectField";
import { AddExeTextField } from "@/app/components/Form_fields/AddExeTextField";
import { AddExeCloseIcon } from "@/app/components/icons/AddExeCloseIcon";
import type { ExerciseFormData } from "@/lib/types/exe-types";
import { INITIAL_EXERCISE_FORM } from "@/lib/utils/initialValues";

import {
    FOCUS_OPTIONS, MOVEMENT_OPTIONS,
    LEVEL_OPTIONS, TYPE_OPTIONS
} from "@/lib/utils/options";

// --- Tipo de variables ---
type AddProductModalProps = {
    onAddProduct: (product: ExerciseFormData) => void;
    onClose: () => void;
};

export function AddExeModal({onAddProduct, onClose }: AddProductModalProps) {
    const [form, setForm] = useState<ExerciseFormData>(INITIAL_EXERCISE_FORM);

    // Actualizar campos del formulario
    function updateField<K extends keyof ExerciseFormData>(field: K, value: ExerciseFormData[K]) {
        setForm((current) => {
            const updated = { ...current, [field]: value };
            return updated;
        });
    }

    // Aceptar insercion
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onAddProduct({
            ...form,
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-emerald-400/15 bg-[#0a0f0c] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between border-b border-emerald-400/10 px-6 py-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/70">Nuevo ejercicio</p>
                        <h2 className="mt-1 text-2xl font-black text-white">Añadir ejercicio</h2>
                    </div>
                    <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-emerald-400/10 p-2 text-emerald-100/70 transition hover:bg-emerald-400/10 hover:text-white"
                    aria-label="Cerrar modal"
                    >
                    <AddExeCloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[calc(95vh-88px)] overflow-y-auto px-6 py-6">
                    <div className="space-y-8">
                        <section className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <AddExeTextField 
                                    label="Nombre del ejercicio"
                                    placeholder="Ej: Pull ups"
                                    value={form.exercise}
                                    onChange={(value) => updateField("exercise", value)}
                                />
                                <AddExeSelectField
                                    label="Enfoque del ejercicio"
                                    required
                                    value={form.focus}
                                    options={FOCUS_OPTIONS}
                                    onChange={(value) => updateField("focus", value)}
                                />
                                <AddExeSelectField
                                    label="Dirección de movimiento"
                                    required
                                    value={form.movement}
                                    options={MOVEMENT_OPTIONS}
                                    onChange={(value) => updateField("movement", value)}
                                />
                                <AddExeSelectField
                                    label="Nivel del ejercicio"
                                    required
                                    value={form.level}
                                    options={LEVEL_OPTIONS}
                                    onChange={(value) => updateField("level", value)}
                                />
                                <AddExeSelectField
                                    label="¿ Tiempo o repeticiones ?"
                                    required
                                    value={form.type}
                                    options={TYPE_OPTIONS}
                                    onChange={(value) => updateField("type", value)}
                                />
                            </div>
                        </section>
                    <div className="mt-8 flex justify-end gap-4 border-t border-emerald-400/10 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="soft-button rounded-xl px-6 py-3 text-sm font-semibold"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="action-button px-6 py-3 text-sm"
                        >
                            Añadir Ejercicio
                        </button>
                    </div>
                    </div>
                </form>
            </div>
        </div>    
    );
}