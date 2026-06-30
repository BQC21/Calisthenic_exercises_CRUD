import { AddFieldLabel } from "@/features/view/components/Form_fields/AddFieldLabel";
import { AddSelectFieldProps } from "@/lib/types/components/form_fields";

export function AddSelectField({
  label,
  required,
  options,
  value,
  disabled,
  onChange,
}: AddSelectFieldProps) {
  return (
    <div>
      <AddFieldLabel label={label} required={required} />
      <select
        required={required}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="w-full rounded-xl border border-emerald-400/15 
          bg-[#070b08] px-4 py-3 text-sm 
          text-emerald-50 outline-none transition 
          focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}