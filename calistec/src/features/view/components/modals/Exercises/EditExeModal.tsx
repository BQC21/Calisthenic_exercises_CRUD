"use client";

import { useEffect, useState } from "react";

import type { Exercise, ExerciseFormData } from "@/lib/types/services/exe-types";

import {
    FOCUS_OPTIONS, 
    LEVEL_OPTIONS,
} from "@/lib/utils/options";
import { AddCloseIcon } from "../../icons/AddCloseIcon";
import { AddTextField } from "../../Form_fields/AddTextField";
import { AddSelectField } from "../../Form_fields/AddSelectField";
import { createExercisesFormStateFromExercises } from "@/lib/mapping/mapping_exe";
import { EditExeModalProps } from "@/lib/types/components/modals";

export function EditExeModal({exercise, onUpdateExercise, onClose }: EditExeModalProps) {
    const [form, setForm] = useState<ExerciseFormData>(() => createExercisesFormStateFromExercises(exercise));

    useEffect(() => {
        setForm(createExercisesFormStateFromExercises(exercise))
    }, [exercise])

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-emerald-400/15 bg-[#0a0f0c] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between border-b border-emerald-400/10 px-6 py-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/70">Editar ejercicio</p>
                        <h2 className="mt-1 text-2xl font-black text-white">Actualizar ejercicio</h2>
                    </div>
                    <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-emerald-400/10 p-2 text-emerald-100/70 transition hover:bg-emerald-400/10 hover:text-white"
                    aria-label="Cerrar modal"
                    >
                    <AddCloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[calc(95vh-88px)] overflow-y-auto px-6 py-6">
                    <div className="space-y-8">
                        <section className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <AddTextField 
                                    label="Nombre del ejercicio"
                                    placeholder="Ej: Pull ups"
                                    value={String(form.title)}
                                    onChange={(value) => updateField("title", value)}
                                />
                                <AddSelectField
                                    label="Enfoque del ejercicio"
                                    required
                                    value={String(form.focus)}
                                    options={FOCUS_OPTIONS}
                                    onChange={(value) => updateField("focus", value)}
                                />
                                <AddSelectField
                                    label="Nivel de ejercicio"
                                    required
                                    value={String(form.level)}
                                    options={LEVEL_OPTIONS}
                                    onChange={(value) => updateField("level", value)}
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
                            Actualizar Ejercicio
                        </button>
                    </div>
                    </div>
                </form>
            </div>
        </div>    
    );
}