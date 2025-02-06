// app/rates-db/page.tsx

import React from 'react';
import Squares from '../../components/ui/Squares'; // Asegúrate de que la ruta sea correcta

const RatesDbPage = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Fondo con el componente Squares */}
      <Squares />

      {/* Contenido de la página */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center' }}>
        <h1>Rates DB</h1>
        <p>Esta es la página de Rates DB con un fondo animado.</p>
      </div>
    </div>
  );
};

export default RatesDbPage;