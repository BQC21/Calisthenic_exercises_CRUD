import { AddExeFieldLabel } from "@/app/components/Form_fields/AddExeFieldLabel";

type AddExeTextFieldProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export function AddExeTextField({
  label,
  required,
  placeholder,
  value,
  onChange,
}: AddExeTextFieldProps) {
  return (
    <div>
      <AddExeFieldLabel label={label} required={required} />
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-emerald-400/15 bg-[#070b08] px-4 py-3 text-sm text-emerald-50 outline-none transition placeholder:text-emerald-100/35 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15"
      />
    </div>
  );
}