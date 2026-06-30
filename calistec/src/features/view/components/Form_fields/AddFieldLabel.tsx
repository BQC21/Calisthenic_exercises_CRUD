import { AddFieldLabelProps } from "@/lib/types/components/form_fields";

export function AddFieldLabel({ label, required }: AddFieldLabelProps) {
  return (
    <label className="mb-2 block text-sm font-semibold text-emerald-100/80">
      {label} {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}