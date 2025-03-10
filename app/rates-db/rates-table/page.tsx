"use client"

import Component from "../../../components/ui/rates-table"

export default function SyntheticV0PageForDeployment() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4">
        <h1 className="font-bold text-left" style={{ fontSize: "20px" }}>Rates Data Base</h1>
      </header>
      <div className="flex-grow">
        <Component />
      </div>
    </div>
  )
}