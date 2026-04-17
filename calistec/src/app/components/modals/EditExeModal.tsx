"use client";

import { useState } from "react";
import { AddExeSelectField } from "@/app/components/Form_fields/AddExeSelectField";
import { AddExeCloseIcon } from "@/app/components/icons/AddExeCloseIcon";
import type { Exercise, ExerciseFormData } from "@/features/types/exe-types";
import { INITIAL_EXERCISE_FORM } from "@/utils/formats";

import {
    FOCUS_OPTIONS, MOVEMENT_OPTIONS,
    LEVEL_OPTIONS, TYPE_OPTIONS
} from "@/utils/formats";

// --- Tipo de variables ---
type AddProductModalProps = {
    exercise: Exercise;
    onUpdateExercise: (exercise: Exercise) => void;
    onClose: () => void;
};

export function EditExeModal({exercise, onUpdateExercise, onClose }: AddProductModalProps) {
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

        onUpdateExercise({
            id: exercise.id,
            ...form,
        });
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[95vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <h2 className="text-2xl font-bold text-slate-900">Añadir Nuevo Producto</h2>
                    <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Cerrar modal"
                    >
                    <AddExeCloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[calc(95vh-88px)] overflow-y-auto px-6 py-6">
                    <div className="space-y-8">
                        <section className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <AddExeSelectField
                                    label="Enfoque del ejercicio"
                                    required
                                    value={form.focus}
                                    options={FOCUS_OPTIONS}
                                    onChange={(value) => updateField("focus", value)}
                                />
                                <AddExeSelectField
                                    label="Dirección de movimient"
                                    required
                                    value={form.movement}
                                    options={MOVEMENT_OPTIONS}
                                    onChange={(value) => updateField("movement", value)}
                                />
                                <AddExeSelectField
                                    label="Nivel de ejercicio"
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
                    <div className="mt-8 flex justify-end gap-4 border-t border-slate-200 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-xl bg-indigo-700 px-6 py-3 text-lg font-semibold text-white transition hover:bg-indigo-800"
                        >
                            Actualizar Ejercicio
                        </button>
                    </div>
                    </div>
                </form>
            </div>
        </div>    
    );
}