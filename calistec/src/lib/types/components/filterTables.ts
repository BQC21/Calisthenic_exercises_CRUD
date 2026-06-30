import { FOCUS_OPTIONS, LEVEL_OPTIONS } from "@/lib/utils/options";

export type FilterKey = "focus" | "level" ;

export type ExeFilterValues = Record<FilterKey, string>;

export const FILTERS = [
    {
        id: "focus",
        label: "Filtrar por enfoque",
        placeholder: "Todos los enfoques",
        content: FOCUS_OPTIONS
    },
    {
        id: "level",
        label: "Filtrar por niel",
        placeholder: "Todos los niveles",
        content: LEVEL_OPTIONS,
    },
];

export type ExeFiltersProps = {
    values: ExeFilterValues;
    onFilterChange: (key: FilterKey, value: string) => void;
};