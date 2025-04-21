import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../app/styles/input-rates.css';
import Card from "./rate-card"; // o tu ruta correcta


interface CustomCSSProperties {
  "--i"?: number;
}

declare module 'react' {
  interface CSSProperties extends CustomCSSProperties {}
}

const Input = () => {
  console.log('Componente Input renderizado'); // Log inicial de renderizado
  
  const [rates, setRates] = useState<any[]>([]);  // Guarda los datos de la vista
  const [searchTerm, setSearchTerm] = useState(''); // Lo que escribe el usuario
  const [filteredSPLs, setFilteredSPLs] = useState<string[]>([]); // SPLs que coinciden
  const [debouncedTerm, setDebouncedTerm] = useState(''); // Término de búsqueda con debounce
  const [selectedSPL, setSelectedSPL] = useState<string>(''); // SPL seleccionado
  const [blurVisible, setBlurVisible] = useState(false); // Estado para controlar el overlay blur
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null); // Plan seleccionado para mostrar en la tarjeta

  // Nuevo efecto para manejar el debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 100); // Espera 100ms después de dejar de escribir

    return () => {
      clearTimeout(handler); // Cancela si el usuario escribe otra vez
    };
  }, [searchTerm]);

  useEffect(() => {
    console.log('Iniciando fetch de datos...');
    const fetchRates = async () => {
      try {
        const res = await fetch('https://nwfg.net:3002/api/rates/view', {
          credentials: 'include',
        });
        const data = await res.json();
        console.log(`Datos recibidos: ${data.length} registros`);
        setRates(data);
      } catch (err) {
        console.error("Error al cargar tarifas:", err);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    console.log(`Término de búsqueda con debounce: "${debouncedTerm}"`);
    console.log(`Estado actual de rates: ${rates.length} elementos`);
    
    if (!debouncedTerm || rates.length === 0) {
      console.log('Búsqueda vacía o sin datos, limpiando filteredSPLs');
      setFilteredSPLs([]);
      return;
    }

    const matches = rates.filter(rate =>
      rate.Standard_Utility_Name?.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    
    console.log(`Coincidencias encontradas: ${matches.length}`);

    const splsUnicos = Array.from(new Set(matches.map(rate => rate.SPL)));
    console.log(`SPLs únicos: ${splsUnicos.length}`, splsUnicos);
    
    setFilteredSPLs(splsUnicos);
  }, [debouncedTerm, rates]);

  // Actualizar el useEffect para establecer el SPL seleccionado por defecto cuando cambian los filteredSPLs
  useEffect(() => {
    if (filteredSPLs.length > 0 && !filteredSPLs.includes(selectedSPL)) {
      setSelectedSPL(filteredSPLs[0]);
    } else if (filteredSPLs.length === 0) {
      setSelectedSPL('');
    }
  }, [filteredSPLs]);

  // Log después de cada renderizado cuando filteredSPLs cambia
  useEffect(() => {
    console.log('Estado actualizado de filteredSPLs:', filteredSPLs);
  }, [filteredSPLs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Input cambiado a: "${e.target.value}"`);
    setSearchTerm(e.target.value);
  };

  // Función para manejar el cambio de pestañas
  const handleTabChange = (spl: string) => {
    setSelectedSPL(spl);
  };

  return (
    <div className="input-rates-wrapper">
      <div className="container">
        <div className="input-wrapper">
          <div className="input">
            <div className="glow left" />
            <div className="glow right" />
            <input
              type="text"
              name="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <div className="reflection" />
            <div className="icon">
              <svg stroke="#fff" viewBox="0 0 38 38" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="loading">
                <g fillRule="evenodd" fill="none">
                  <g strokeWidth={3} transform="translate(1 1)">
                    <circle r={18} cy={18} cx={18} strokeOpacity=".2" />
                    <path d="M36 18c0-9.94-8.06-18-18-18" />
                  </g>
                </g>
              </svg>
              <svg viewBox="0 0 490.4 490.4" version="1.1" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="magnifier">
                <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796   s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z" />
              </svg>
            </div>
            <div className={`result ${filteredSPLs.length > 0 ? 'visible' : ''}`}>
              <header className="result-header">
                {filteredSPLs.map((spl, index) => (
                  <div key={spl} style={{ "--i": index + 1 } as React.CSSProperties }>
                    <input
                      type="radio"
                      id={`spl-${spl}`}
                      name="tab"
                      checked={selectedSPL === spl}
                      onChange={() => handleTabChange(spl)}
                    />
                    <label htmlFor={`spl-${spl}`} data-label={spl.toUpperCase()}>
                      <span>{spl.toUpperCase()}</span>
                    </label>
                  </div>
                ))}
              </header>
              <div className="result-content-header">
                <div style={{"--i": 1}}>Utility <span>↓</span></div>
                <div style={{"--i": 2}}>Product Name</div>
                <div style={{"--i": 3}}>Rate $</div>
              </div>
              <div className="result-content" key={selectedSPL}>
                {(() => {
                  const seen = new Set();
                  const filtered = rates.filter(
                    (item) =>
                      item.Standard_Utility_Name?.toLowerCase().includes(debouncedTerm.toLowerCase()) &&
                      item.SPL === selectedSPL
                  );

                  const uniqueResults = filtered.filter((item) => {
                    // Crear una clave única basada en los campos visibles
                    const key = `${item.Standard_Utility_Name}-${item.Product_Name}-${item.Rate}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                  });

                  return uniqueResults
                    .sort((a, b) => {
                      const productCompare = (a.Product_Name || "").localeCompare(b.Product_Name || "");
                      if (productCompare !== 0) return productCompare;
                      return (a.Standard_Utility_Name || "").localeCompare(b.Standard_Utility_Name || "");
                    })
                    .map((item, index) => (
                      <a
                        key={`${item.Rate_ID}-${index}`}
                        style={{ "--i": index + 1 } as React.CSSProperties}
                        onClick={() => {
                          setSelectedPlan(item);
                          setBlurVisible(true);
                        }}
                      >
                        <div>{item.Standard_Utility_Name}</div>
                        <div title={item.Product_Name}>{item.Product_Name}</div>
                        <div>{Number(item.Rate).toFixed(4)}</div>
                      </a>
                    ));
                })()}

                <div className="lava" />
              </div>
            </div>
          </div>
          <div className="glow-outline" />
          <div className="glow-layer-bg" />
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
          <div className="glow-layer-3" />
          <div className="glow left" />
          <div className="glow right" />
        </div>
      </div>
      {blurVisible && selectedPlan && (
        <div
          className="blur-overlay"
          onClick={() => {
            setBlurVisible(false);
            setSelectedPlan(null);
          }}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // evita cerrar si clicas dentro
          >
            <Card rate={selectedPlan} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Input;
