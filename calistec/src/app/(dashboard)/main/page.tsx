"use client";

import { PortalShell } from "@/app/components/app/PortalShell";

export default function DashboardPage() {

    return (
        <PortalShell
            title="Vista general"
            subtitle="Ahí puedes ver un resumen de tu actividad reciente y tu progreso general."
            activePath="/main"
        >
        {/* Contenido del dashboard */}
        <div className="flex flex-col gap-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-lg font-medium text-slate-900">Bienvenido a tu panel de control</h2>
                <p className="mt-2 text-sm text-slate-600">
                    Aquí puedes ver un resumen de tu actividad reciente y tu progreso general.
                </p>
            </div>
            {/* Agrega más secciones o widgets según sea necesario */}
        </div>
        </PortalShell>
    );
}