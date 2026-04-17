import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalisTEC",
  description: "Aplicación para registrar y analizar el volumen de entrenamiento por sesión de calistenia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--page-bg)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}