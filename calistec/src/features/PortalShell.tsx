"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { createClient } from "@/lib/supabase/client";

type PortalNavItem = {
    label: string;
    href: string;
};

// añadir modulos por rutas
const navigation: PortalNavItem[] = [
    { label: "Principal", href: "/main" },
    { label: "Ejercicios", href: "/exercises" },
    { label: "Rutinas", href: "/routines" },
];

type PortalShellProps = {
    title: string;
    subtitle: string;
    activePath: string;
    children: ReactNode;
};

export function PortalShell({ title, subtitle, activePath, children }: PortalShellProps) {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null); // mostrar email del usuario
    const [isSigningOut, setIsSigningOut] = useState(false); // indica si el usuario salió de la cuenta

    useEffect(() => {
        const supabase = createClient();
        let isMounted = true;

        void supabase.auth.getUser().then(({ data }) => {
            if (isMounted) {
                setUserEmail(data.user?.email ?? null);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    // Evento en caso el usuario cierre sesión
    async function handleSignOut() {
        try {
            setIsSigningOut(true);

            const supabase = createClient(); // invoca una instancia del cliente de Supabase
            await supabase.auth.signOut(); // cierra la sesión en Supabase

            router.replace("/login");
            router.refresh();
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <main className="min-h-screen bg-[var(--page-bg)] text-[var(--foreground)]">
            <div className="flex min-h-screen flex-col bg-[var(--page-bg)]">
                <header className="border-b border-[rgba(34,197,94,0.16)] bg-[rgba(6,9,7,0.96)] px-4 py-4 backdrop-blur md:px-6">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-semibold tracking-tight text-[var(--accent-strong)] sm:text-2xl">
                                    CalisTEC
                                </h1>
                                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                                    Portal de entrenamiento
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden text-right sm:block">
                                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Perfil</p>
                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                    {userEmail ?? "Usuario autenticado"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleSignOut}
                                disabled={isSigningOut}
                                className="soft-button rounded-full px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSigningOut ? "Saliendo..." : "Cerrar sesión"}
                            </button>
                        </div>
                    </div>

                    <nav className="mx-auto mt-4 flex w-full max-w-7xl flex-wrap items-center gap-2 overflow-x-auto pb-1">
                        {navigation.map((item) => {
                            const isActive = item.href === activePath;

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={[
                                        "chip px-4 py-2 text-sm font-semibold transition",
                                        isActive
                                            ? "chip--active shadow-[0_10px_24px_rgba(16,185,129,0.14)]"
                                            : "hover:border-[rgba(16,185,129,0.28)] hover:text-[#d8fff0]",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </header>

                <section className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                        <div className="space-y-3">
                            <h2 className="hero-title text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
                            <p className="hero-subtitle max-w-3xl text-base sm:text-lg">{subtitle}</p>
                        </div>

                        <div className="surface-card p-4 sm:p-6">{children}</div>
                    </div>
                </section>
            </div>
        </main>
    );
}