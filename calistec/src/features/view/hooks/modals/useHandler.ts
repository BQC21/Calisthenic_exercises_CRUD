import { Exercise, SelectedExerciseItem } from "@/lib/types/exe-types";

export function handlerSelector(
    selectedExerciseTable: SelectedExerciseItem[],
    exercise: Exercise[], 
): (string | undefined)[]{
        // EL FILTRADOR
        const filteredOptions = [
            `Seleccionar ejercicios`,
            ...exercise
                .filter((exercise) => {
                    const isAlreadySelected = selectedExerciseTable.some(
                        (item) => item.id === String(exercise.id)
                    );
                    return !isAlreadySelected; // retiene en el selector los no seleccionados
                })
                .map((material) => material.title),
        ] 
        return filteredOptions;
    } 