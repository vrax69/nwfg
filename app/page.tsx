"use client";
import React from "react";
import { WavyBackground } from "../components/ui/wavy-background";

// Cambia esto para exportar por defecto
export default function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="container_login">
        <form className="form_login">
          <img src="https://www.newwavepower.net/wp-content/themes/nwp/images/logo.png" alt="Logo" className="logo" />
          <p id="heading">¡Bienvenido!</p>
          <div className="field_login">
            <input
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Nombre de Usuario"
              className="input-field"
              type="text"
              required />
          </div>
          <div className="field_login">
            <input 
              id="password" 
              name="password" 
              placeholder="Contraseña" 
              className="input-field" 
              type="password" 
              required />
          </div>
          <div className="btn">
            <button type="submit" className="button1">Login</button>
            <button type="button" className="button2">Crear Usuario</button>
          </div>
          <button type="button" className="button3">Soy tonto y olvidé la Contraseña</button>
        </form>
      </div>
    </WavyBackground>
  );
}
