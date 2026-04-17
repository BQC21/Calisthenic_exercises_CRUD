type AddExeFieldLabelProps = {
  label: string;
  required?: boolean;
};

export function AddExeFieldLabel({ label, required }: AddExeFieldLabelProps) {
  return (
    <label className="mb-2 block text-sm font-bold text-slate-900">
      {label} {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}