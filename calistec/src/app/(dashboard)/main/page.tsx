"use client";

import { PortalShell } from "@/app/components/app/PortalShell";

export default function DashboardPage() {

    return (
        <main className="min-h-screen bg-[var(--page-bg)] text-[var(--foreground)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 lg:px-8">
                <PortalShell
                    title="Vista general"
                    subtitle="Ahí puedes ver un resumen de tu actividad reciente y tu progreso general."
                    activePath="/main"
                >
                {/* Contenido del dashboard */}
                <div className="flex flex-col gap-6">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-medium text-slate-900">Contenido pendiente por desarrollar ...</h2>
                    </div>
                    {/* Agrega más secciones o widgets según sea necesario */}
                </div>
                </PortalShell>
            </div>
        </main>
    );
}