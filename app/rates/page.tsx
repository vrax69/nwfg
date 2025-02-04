"use client"

import dynamic from "next/dynamic"
import styles from "./rates.module.css"

// Dynamic import of the Input component
const Input = dynamic(() => import("../../components/ui/Input"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function RatesPage() {
  return (
    <div className={styles.container}>
      <img src="https://rates-nwpc.s3.us-east-2.amazonaws.com/LOGO_NWFG-.png" alt="Logo NWFG" className={styles.logo} />
      <Input />
    </div>
  )
}

