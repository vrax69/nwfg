import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import PixelCards from "../../components/ui/pixel-card"; // Importa correctamente el componente

// Agrega esta configuración de metadata
export const metadata = {
  title: "Dashboard 📊",
};

export default function DashboardPage() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex justify-center items-center h-screen w-full">
        <PixelCards /> {/* Muestra las tarjetas directamente */}
      </div>
    </BackgroundBeamsWithCollision>
  );
}
