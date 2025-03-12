"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      {date && <p className="mt-4">Fecha seleccionada: {date.toDateString()}</p>}
    </div>
  );
}
