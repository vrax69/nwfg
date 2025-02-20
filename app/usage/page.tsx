"use client";

import { useState } from "react";
import Stepper, { Step } from "../../components/ui/stepper";
import ColumnSelector from '../../components/ui/ColumnSelector'; // Asegúrate de importar el componente nuevo

export default function Page() {
  const [name, setName] = useState<string>(""); // Definir el estado correctamente

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText="Previous"
      nextButtonText="Next"
    >
      <Step>
        <h2>Bienvenido al stepper para cambiar las tarifas!</h2>
        <p>Recuerda seguir cada paso al pie de la letra!</p>
      </Step>
      <Step>
        <h2>Selecciona tus columnas</h2>
        <ColumnSelector />
      </Step>
      <Step>
        <h2>How about an input?</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name?"
        />
      </Step>
      <Step>
        <h2>Final Step</h2>
        <p>You made it!</p>
      </Step>
    </Stepper>
  );
}