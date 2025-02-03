import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function DashboardPage() {
  return (
    <BackgroundBeamsWithCollision>
      <div /> {/* Esto evitará el error */}
    </BackgroundBeamsWithCollision>
  );
}
  
