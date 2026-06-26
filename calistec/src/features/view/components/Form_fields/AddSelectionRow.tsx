import { AddSelectField } from "./AddSelectField";

const selectionRowStyles = "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.35fr)_auto] lg:items-end";
const actionButtonStyles = "shrink-0 whitespace-nowrap rounded-xl border border-slate-300 px-4 py-3 text-[#75E6FF] font-semibold text-slate-700 transition hover:bg-slate-50";

type SelectionRowProps = {
    label: string;
    buttonLabel: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    onClick?: () => void;
};

export function SelectionRow({ label, buttonLabel, value, options, 
    onChange, onClick }: SelectionRowProps) {
        return (
            <div className={selectionRowStyles}>
                <div className="min-w-0">
                    <AddSelectField
                        label={label}
                        required
                        value={value}
                        options={options}
                        onChange={onChange}
                    />
                </div>
                <button type="button" className={actionButtonStyles} onClick={onClick}>
                    {buttonLabel}
                </button>
            </div>
        );
    }