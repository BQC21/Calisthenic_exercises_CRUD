import { AddFieldLabel } from "@/features/view/components/Form_fields/AddFieldLabel";

type AddReadonlyFieldProps = {
    label: string;
    value: string;
};

export function AddReadonlyField({ label, value }: AddReadonlyFieldProps) {
    return (
        <div>
        <AddFieldLabel label={label} />
        <div className="rounded-xl border border-emerald-400/15 bg-black/35 px-4 py-3 text-sm text-emerald-50">{value}</div>
        </div>
    );
}