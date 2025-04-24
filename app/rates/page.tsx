"use client"

import dynamic from "next/dynamic"
import { useEffect } from "react"
import "../styles/rates-global.css" // Importa el nuevo CSS global sin módulos

const Input_rates = dynamic(() => import("../../components/ui/Input_rates"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function RatesPage() {
  useEffect(() => {
    document.title = "Rates Nwfg"
  }, [])

  return (
    <div className="page-container">
      <img
        src="https://rates-nwpc.s3.us-east-2.amazonaws.com/LOGO_NWFG-.png"
        alt="Logo NWFG"
        className="logo"
      />
      <Input_rates />
    </div>
  )
}
