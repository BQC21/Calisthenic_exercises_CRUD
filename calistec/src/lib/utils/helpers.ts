// función para imprimir valores nullables de fecha en un formato legible, o un guion si el valor es inválido o nulo
export function parseNullableDate(value: Date | string | null | undefined): Date | null {
	if (!value) return null;

	const date = value instanceof Date ? value : new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}


export function formatDate(value: unknown) {
    if (!value) return "-";

    const date = value instanceof Date ? value : new Date(value as string | number);
    // return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("es-PE");
    return Number.isNaN(date.getTime()) ? "-" : date.toISOString().slice(0, 16);
}

export function formatDateTimeDisplay(value: unknown): string {
    if (!value) return "-";
    
    const date = value instanceof Date ? value : new Date(value as string | number);
    if (Number.isNaN(date.getTime())) return "-";
    
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}