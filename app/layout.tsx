import type { Metadata } from "next";
import "@/app/styles/globals.css"; // Asegúrate de importar estilos globales

export const metadata: Metadata = {
  title: "Nwfg",
  description: "ayuda a tus a gentes a hacer menos tiempo en la venta con estas multiples herramietnas, optimiza y encargate de",
  icons: {
    icon: "https://rates-nwpc.s3.us-east-2.amazonaws.com/rtrete.png",
  },
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
