import { DeleteRoutineModalProps } from "@/lib/types/components/modals";

export default function DeleteRoutineModal({
    routine,
    onDeleteRoutine,
    onClose,
}: DeleteRoutineModalProps) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="w-full max-w-md rounded-lg bg-[var(--surface)] p-6 shadow-xl">
                <h2 className="mb-4 text-lg font-semibold text-white">Eliminar rutina</h2>
                <p className="mb-6 text-emerald-100/80">
                    Estas seguro de que deseas eliminar la rutina {routine.description}?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm font-medium text-emerald-100/80 hover:bg-emerald-400/10"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={() => {onDeleteRoutine(String(routine.id))}}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
