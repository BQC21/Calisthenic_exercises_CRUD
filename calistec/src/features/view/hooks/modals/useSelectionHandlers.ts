import { Exercise, SelectedExerciseItem } from "@/lib/types/services/exe-types";
import { useCallback } from "react";

//OUTPUTS
interface SelectionHandlers {
    handle_onChange: (value: string, label: string) => void;
    handle_onClick: (label: string) => void;
}

export function useSelectionHandlers(
    exercise: Exercise[],
    // selectedExerciseByRow: Record<string, string>,
    selectedExerciseByRow: Record<string, {ejercicioId: string, title: string,
                                            focus: string, level: string}>,
    selectedExerciseTable: SelectedExerciseItem[],
    // setSelectedExerciseByRow: (value: Record<string, string> 
    //     | ((prev: Record<string, string>) => Record<string, string>)) => void,
    setSelectedExerciseByRow: (value: Record<string, {ejercicioId: string, title: string, focus: string, level: string}>
        | ((prev: Record<string, {ejercicioId: string, title: string, focus: string, level: string}>) => 
            Record<string, {ejercicioId: string, title: string, focus: string, level: string}>)) => void,
    setSelectedExerciseTable: (value: SelectedExerciseItem[]
        | ((prev: SelectedExerciseItem[]) => SelectedExerciseItem[])) => void,
): SelectionHandlers {

    const handle_onChange = useCallback(
        (value: string, label: string) => {
            // Limpiar el selector si se selecciona la opción por defecto
            setSelectedExerciseByRow((prev) => {
                const newState = { ...prev };
                delete newState[`${label}`];
                return newState;
            });

            // Buscar el ejercicio seleccionado
            const selected = exercise.find(
                (exercise) => exercise.title === value
            );

            // Actualizar el estado del selector con el material encontrado
            if (selected) {
                setSelectedExerciseByRow((
                    prev: Record<string, {ejercicioId: string, title: string, focus: string, level: string}>) => 
                    ({
                        ...prev,
                        [label]: {
                            ejercicioId: selected.id as string,
                            title: selected.title as string,
                            focus: selected.focus as string,
                            level: selected.level as string,
                        }
                    } as Record<string, {ejercicioId: string, title: string, focus: string, level: string}>)
                );
            }
        },[exercise, setSelectedExerciseByRow])

    const handle_onClick = useCallback(
        (label: string) => {
            const selectedExercise = selectedExerciseByRow[`${label}`];

            // Validar que hay una selección válida
            if (!selectedExercise || selectedExercise.title === `Seleccionar - ${label}`) {
                return;
            }

            // Revisar si el EJERCICIO ya ha sido seleccionado
            const isAlreadyAdded = selectedExerciseTable.some(
                (item) => item.id === selectedExercise.ejercicioId
            );

            if (isAlreadyAdded) {
                return;
            }

            setSelectedExerciseTable((prev: SelectedExerciseItem[]) => [
                ...prev,
                {
                    row: label,
                    id: selectedExercise.ejercicioId,
                    title: selectedExercise.title,
                    focus: selectedExercise.focus,
                    level: selectedExercise.level,
                },
            ]);

            // Limpiar el selector temporal
            setSelectedExerciseByRow((prev) => {
                const newState = { ...prev };
                delete newState[`${label}`];
                return newState;
            });
        },[selectedExerciseByRow,
        selectedExerciseTable,
        setSelectedExerciseByRow,
        setSelectedExerciseTable]
    );

    return {
        handle_onChange,
        handle_onClick,
    };
}