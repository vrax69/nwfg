// app/rates-db/page.tsx

import React from 'react';
import Squares from '../../components/ui/Squares'; // Asegúrate de que la ruta sea correcta

// Agrega esta configuración de metadata
export const metadata = {
  title: "Actualizar tarifas",
};

const RatesDbPage = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Fondo con el componente Squares */}
      <Squares />

      {/* Contenido de la página */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center' }}>
       
      </div>
    </div>
  );
};

export default RatesDbPage;