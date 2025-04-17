"use client";

import { useState } from "react";
import Card from "../../components/ui/rate-card"; // asegúrate que la ruta sea correcta al archivo real

export default function Page() {
  const rate = {
    Standard_Utility_Name: "Energy Texas",
    Product_Name: "Plan Premium",
    Rate: 12.99,
    duracion_rate: "12 meses",
    ETF: "$150",
    MSF: "$9.99",
    Last_Updated: "2023-04-15T10:30:00",
    Service_Type: "Electric",
    Unit_of_Measure: "KWH",
    Company_DBA_Name: "Indra Energy",
    State: "TX",
    LDC: "Oncor"
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <Card rate={rate} />
    </main>
  );
}
