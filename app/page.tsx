"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WavyBackground } from "../components/ui/wavy-background";

export default function WavyBackgroundDemo() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Debug log para confirmar que el componente se monta
  console.log("👀 Componente cargado");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug log para confirmar que la función se ejecuta
    console.log("🟡 handleSubmit ejecutado");
    
    try {
      setError(""); // limpia errores anteriores
      setLoading(true); // activar estado de carga
      
      // Debug log para ver los datos enviados
      console.log("📤 Enviando:", { email, password });
      
      const res = await fetch("https://www.nwfg.net:3003/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ¡Crítico para enviar/recibir cookies!
        body: JSON.stringify({ email, password }),
      });
      
      console.log("📥 Respuesta recibida:", res.status);
      
      const data = await res.json();
      console.log("📦 Datos:", data);

      if (res.ok) {
        console.log("✅ Login exitoso - Redirigiendo...");
        
        // Esperamos un momento para asegurar que la cookie se establezca
        setTimeout(() => {
          // Redirección forzada con URL completa (no con router.push que podría ser interceptado)
          window.location.href = "/dashboard";
        }, 500);
      } else {
        setError(data.message || "Error desconocido");
        setLoading(false);
      }
    } catch (error) {
      console.error("💥 Error de login:", error);
      setError("Error al conectar con el servidor");
      setLoading(false);
    }
  };

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="container_login">
        <form className="form_login" onSubmit={handleSubmit}>
          <img
            src="https://www.newwavepower.net/wp-content/themes/nwp/images/logo.png"
            alt="Logo"
            className="logo"
          />
          <p id="heading">¡Bienvenido!</p>
          <div className="field_login">
            <input
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Correo"
              className="input-field"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field_login">
            <input
              id="password"
              name="password"
              placeholder="Contraseña"
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn">
            <button type="submit" className="button1" disabled={loading}>
              {loading ? "Cargando..." : "Login"}
            </button>
            <button type="button" className="button2" disabled={loading}>Crear Usuario</button>
          </div>
          <button type="button" className="button3" disabled={loading}>forgot password</button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {loading && <p style={{ color: "blue", marginTop: "10px" }}>Procesando login...</p>}
        </form>
      </div>
    </WavyBackground>
  );
}

// Versión segura para debugging de cookies (evita errores en SSR)
if (typeof window !== 'undefined') {
  console.log('🍪 Cookies disponibles:', document.cookie);
}
