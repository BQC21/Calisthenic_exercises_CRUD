import { AddNumberFieldProps } from "@/lib/types/components/form_fields";
import { AddFieldLabel } from "./AddFieldLabel";

export function AddNumberField({
        label,
        required,
        value,
        onChange,
        step,
        min,
        max,
        disabled,
    }: AddNumberFieldProps) {
    return (
        <div>
        <AddFieldLabel label={label} required={required} />
        <input
            type="number"
            required={required}
            value={value === "" ? "" : Number.isFinite(value) ? value : ""}
            onChange={(event) => onChange(Number(event.target.value))}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            placeholder={String(min)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg text-slate-900 
                    outline-none transition placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 
                    focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"
        />
        </div>
    );
}