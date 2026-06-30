import { AddDateTimeFieldProps } from "@/lib/types/components/form_fields";
import { AddFieldLabel } from "./AddFieldLabel";

export function AddDateTimeField({
    label,
    required,
    value,
    onChange,
    disabled,
}: AddDateTimeFieldProps) {
    return (
        <div>
            <AddFieldLabel label={label} required={required} />
            <input
                type="datetime-local"
                required={required}
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
                disabled={disabled}
                aria-label={label}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 
                        text-lg text-white outline-none transition disabled:bg-slate-100 
                        disabled:text-slate-500 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"
            />
        </div>
    );
}