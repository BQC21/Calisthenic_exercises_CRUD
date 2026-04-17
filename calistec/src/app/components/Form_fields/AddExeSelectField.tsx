
type AddExeSelectFieldProps = {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function AddExeSelectField({
  label,
  required,
  options,
  value,
  disabled,
  onChange,
}: AddExeSelectFieldProps) {
  return (
    <div>
      <select
        required={required}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="w-full rounded-xl border border-emerald-400/15 bg-[#070b08] px-4 py-3 text-sm text-emerald-50 outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15"
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