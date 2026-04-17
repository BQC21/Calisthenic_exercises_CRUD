import { FilterIcon } from "@/app/components/icons/FilterIcon";

type FilterKey = "focus" | "movement" | "level" | "type";

export type ExeFilterValues = Record<FilterKey, string>;

const FILTERS = [
    {
        id: "focus",
        label: "Filtrar por enfoque",
        placeholder: "Todos los enfoques",
        content: ["PULL", "PUSH", "LEGS", "CORE", "BALANCE"],
    },
    {
        id: "movement",
        label: "Filtrar por tipo de movimiento",
        placeholder: "Todas los tipos de movimiento",
        content: ["Horizontal", "Vertical", "Diagonal"],
    },
    {
        id: "level",
        label: "Filtrar por niel",
        placeholder: "Todos los niveles",
        content: ["Newbie", "Beginner", "Intermediate", "Advanced", "Elite"],
    },
    {
        id: "type",
        label: "Filtrar por modalidad",
        placeholder: "Todas los modalidades",
        content: ["Time", "Reps"],
    },
];

type ExeFiltersProps = {
    values: ExeFilterValues;
    onFilterChange: (key: FilterKey, value: string) => void;
};

export function ExeFilter({ values, onFilterChange }: ExeFiltersProps) {
    return (
        <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
                {FILTERS.map((filter) => (
                    <label key={filter.id} className="space-y-2">
                        <span className="block text-sm font-semibold tracking-wide text-emerald-100/80">
                            {filter.label}
                        </span>
                        <div className="relative">
                            <FilterIcon />
                            <select
                                className="filter-control h-12 w-full appearance-none pl-11 pr-10 text-sm"
                                value={values[filter.id as FilterKey]}
                                onChange={(event) => onFilterChange(filter.id as FilterKey, event.target.value)}
                            >
                                <option value="">{filter.placeholder}</option>
                                {filter.content.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <svg
                                aria-hidden="true"
                                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-300/60"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                    </label>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/60">
                    Vista rápida
                </span>
                {["Todos", "Empuje", "Tirón", "Piernas", "Core", "Balance"].map((item, index) => (
                    <button
                        key={item}
                        type="button"
                        className={`chip px-4 py-2 text-sm font-semibold ${index === 0 ? "chip--active" : ""}`}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}