import { Routine, RoutineFormData } from "@/lib/types/routine-types";
import { useState } from "react";
import { EditIcon } from "../../icons/EditIcon";
import { SelectedExerciseItem } from "@/lib/types/exe-types";
import { Exercise_Routine } from "@/lib/types/routineExe-types";
import UpdateRoutineModal from "../../modals/routines/EditRoutineModal";

type Button2EditProps = {
    routine: Routine;
    exercise_routines: Exercise_Routine[];
    onUpdateRoutine: (
        routine: Routine,
        selectedExercises: SelectedExerciseItem[]
    ) => Promise<void> | void;
};

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