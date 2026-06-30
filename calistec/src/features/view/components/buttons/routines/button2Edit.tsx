import { Routine, RoutineFormData } from "@/lib/types/services/routine-types";
import { useState } from "react";
import { EditIcon } from "../../icons/EditIcon";
import { SelectedExerciseItem } from "@/lib/types/services/exe-types";
import { Exercise_Routine } from "@/lib/types/services/routineExe-types";
import UpdateRoutineModal from "../../modals/routines/EditRoutineModal";
import { Button2EditProps } from "@/lib/types/components/buttons";

export default function Button2Edit({ routine, exercise_routines, onUpdateRoutine }: Button2EditProps) {
    const [open, setOpen] = useState(false);

    return (
    <div>
        <button
            onClick={() => setOpen(true)}
            className="table-icon-button icon-button--edit"
            type="button"
            title="Editar rutina"
        >
            <EditIcon />
        </button>

        {open && (
            <UpdateRoutineModal
                existingRoutine = {routine}
                existingRoutineExercise = {exercise_routines.filter((er) => er.rutina_id === routine.id)}
                onUpdateRoutine={async function (formData: RoutineFormData, selectedExercises){
                        const updatedRoutine: Routine = {...routine, ...formData} as Routine;
                        await onUpdateRoutine(updatedRoutine, selectedExercises);
                        setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        )}
    </div>
    );
}