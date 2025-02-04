import type { Metadata } from "next";
import "@/app/styles/globals.css"; // Asegúrate de importar estilos globales

export const metadata: Metadata = {
  title: "Nwfg",
  description: "Sistema de gestión y autenticación",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
