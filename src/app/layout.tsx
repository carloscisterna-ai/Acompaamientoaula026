import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acompaña 2026 · Colegio John F. Kennedy",
  description: "Plataforma de acompañamiento y retroalimentación docente",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
