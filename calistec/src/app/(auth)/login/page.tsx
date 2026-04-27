import { LoginForm } from "@/app/components/auth/LoginForm";

export default async function LoginPage() {

    return (
        <main className="auth-shell">
            <section className="auth-card">
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="auth-logo-mark mb-6" aria-hidden>
                        <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 24L24 30M24 30L30 24M24 30L30 36M30 36L36 30M30 36L36 42M36 30L42 24"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M14 20L20 26M44 38L50 44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            <path d="M14 26L20 20M44 44L50 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1 className="mb-2 text-5xl font-extrabold tracking-tight text-[#08d171]">Calistweight</h1>
                    <p className="text-[2rem] leading-none text-[#a9b3c3]">Entrena sin limites</p>
                </div>

                <LoginForm />
            </section>
        </main>
    );
}