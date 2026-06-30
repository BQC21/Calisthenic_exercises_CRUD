import { AddFieldLabel } from "@/features/view/components/Form_fields/AddFieldLabel";
import { AddTextFieldProps } from "@/lib/types/components/form_fields";

export function AddTextField({
  label,
  required,
  placeholder,
  value,
  onChange,
}: AddTextFieldProps) {
  return (
    <div>
      <AddFieldLabel label={label} required={required} />
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-emerald-400/15 bg-[#070b08] 
            px-4 py-3 text-sm text-emerald-50 outline-none transition 
            placeholder:text-emerald-100/35 focus:border-emerald-400/50 
            focus:ring-2 focus:ring-emerald-400/15"
      />
    </div>
  );
}