import { AddExeFieldLabel } from "@/app/components/Form_fields/AddExeFieldLabel";

type AddProductReadonlyFieldProps = {
    label: string;
    value: string;
};

export function AddExeReadonlyField({ label, value }: AddProductReadonlyFieldProps) {
    return (
        <div>
        <AddExeFieldLabel label={label} />
        <div className="rounded-xl border border-emerald-400/15 bg-black/35 px-4 py-3 text-sm text-emerald-50">{value}</div>
        </div>
    );
}