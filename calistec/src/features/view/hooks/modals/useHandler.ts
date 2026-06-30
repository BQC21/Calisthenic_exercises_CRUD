import { Exercise, SelectedExerciseItem } from "@/lib/types/services/exe-types";

export function handlerSelector(
    label: string,
    selectedExerciseTable: SelectedExerciseItem[],
    exercise: Exercise[], 
): (string | undefined)[]{
    let filteredOptions: (string | undefined)[] = [`Seleccionar - ${label}`]

    // EL FILTRADOR
    filteredOptions = [
        `Seleccionar - ${label}`,
        ...exercise
            .filter((exercise) => {
                const isAlreadySelected = selectedExerciseTable.some(
                    (item) => item.id === String(exercise.id)
                );
                return !isAlreadySelected; // retiene en el selector los no seleccionados
            })
            .map((exercise) => exercise.title),
    ] 
    return filteredOptions;
} 