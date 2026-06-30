
// campo de fecha
export type AddDateFieldProps = {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    disabled?: boolean;
};

export type AddDateTimeFieldProps = {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

// campo de solo lectura
export type AddReadonlyFieldProps = {
    label: string;
    value: string;
    colorClass?: string; // Optional color class for conditional styling
};

//campo para agregar
export type AddFieldLabelProps = {
    label: string;
    required?: boolean;
};

// campo para números
export type AddNumberFieldProps = {
    label: string;
    required?: boolean;
    value: number | "";
    onChange: (value: number) => void;
    step?: number | "";
    min?: number | "";
    max?: number | "";
    disabled?: boolean;
};

// campo para radios de selección
export type AddRadioFieldProps = {
    label: string;
    checked: boolean;
    onChange: () => void;
};

// campo para título
export type AddSectionTitleProps = {
    title: string;
};

// campo para selectores
export type AddSelectFieldProps = {
    label: string;
    required?: boolean;
    options: string[];
    value: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    customClass?: string; // Optional custom class for styling
};

export type SelectionRowProps = {
    label: string;
    buttonLabel: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    onClick?: () => void;
    customSelectClass?: string; // Optional custom class for select styling
};

// campo para texto
export type AddTextFieldProps = {
    label: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};