"use client"

import dynamic from "next/dynamic"
import styles from "../styles/rates.module.css" // Importa el CSS del componente
import { useEffect } from "react"; // Importa useEffect

// Dynamic import of the Input component
const Input_rates  = dynamic(() => import("../../components/ui/Input_rates"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function RatesPage() {
   // Cambia el título de la pestaña usando useEffect
   useEffect(() => {
    document.title = "Rates Nwfg "; // Título personalizado
  }, []);

  return (
    <div className={styles.container}>
      <img src="https://rates-nwpc.s3.us-east-2.amazonaws.com/LOGO_NWFG-.png" alt="Logo NWFG" className={styles.logo} />
      <Input_rates />
    </div>
  )
}

