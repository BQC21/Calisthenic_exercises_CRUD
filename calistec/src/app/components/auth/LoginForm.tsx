"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
    // variables de estado
    const router = useRouter(); // permite navegación entre rutas
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // lógica del evento al ingresar al dashboard desde auth
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setErrorMessage(null);

            const supabase = createClient(); // conexión a Supabase desde browser
            const normalizedEmail = email.trim().toLowerCase();

            // esperar la lectura de la tabla usuarios de Supabase
            const { error } = await supabase.auth.signInWithPassword({
                email: normalizedEmail,
                password,
            });

            // en caso lo ingresado no coincida con el DB de Supabase
            if (error) {
                if (error.message.toLowerCase().includes("invalid login credentials")) {
                    setErrorMessage(
                        "Ese usuario no existe en Supabase Auth o la contraseña no coincide. Revisa que la cuenta esté creada en Authentication, no solo en la tabla public.usuarios."
                    );
                    return;
                }

                setErrorMessage(error.message);
                return;
            }

            // en caso de éxito navegarlo al dashboard principal
            router.replace("/dashboard");
            router.refresh(); // actualizar la vista con refresco de datos
        } finally {
            setIsLoading(false); // quita el indicador de carga 
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-[2rem] font-bold text-[#ecf2ff]">
                    Correo electronico
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    placeholder="tu@email.com"
                    className="auth-input text-xl"
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-[2rem] font-bold text-[#ecf2ff]">
                    Contrasena
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="*******"
                    className="auth-input text-xl"
                    required
                />
            </div>

            {errorMessage ? (
                <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-base font-medium text-red-200">
                    {errorMessage}
                </p>
            ) : null}

            <button
                type="submit"
                disabled={isLoading}
                className="auth-primary-btn text-[2rem]"
            >
                {isLoading ? "Iniciando..." : "Iniciar sesion"}
            </button>
        </form>
    );
}