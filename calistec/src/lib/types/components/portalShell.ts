import { ReactNode } from "react";

export type PortalShellProps = {
    title: string;
    subtitle: string;
    activePath: string;
    children: ReactNode;
};

// añadir modulos por rutas
export type PortalNavItem = {
    label: string;
    href: string;
};

export const navigation: PortalNavItem[] = [
    { label: "Vista principal", href: "/main" },
    { label: "Ejercicios", href: "/exercises" },
    { label: "Rutinas", href: "/routines" },
];