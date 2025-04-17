import React from "react";
import { Check, Clock } from "lucide-react";

interface RateProps {
  Standard_Utility_Name: string;
  Product_Name: string;
  Rate: number;
  duracion_rate?: string;
  ETF?: string;
  MSF?: string;
  Last_Updated?: string;
  Service_Type?: string;
  Unit_of_Measure?: string;
  Company_DBA_Name?: string;
  SPL?: string;
  State?: string;
  LDC?: string;
}

const Card = ({ rate }: { rate: RateProps }) => {
  const features: string[] = [];

  if (rate.ETF) features.push(`ETF: ${rate.ETF}`);
  if (rate.MSF) features.push(`MSF: ${rate.MSF}`);
  if (rate.Service_Type) features.push(`Servicio: ${rate.Service_Type}`);
  if (rate.Unit_of_Measure) features.push(`Unidad: ${rate.Unit_of_Measure}`);
  if (rate.Company_DBA_Name) features.push(`Proveedor: ${rate.Company_DBA_Name}`);
  if (rate.State) features.push(`Estado: ${rate.State}`);
  if (rate.LDC) features.push(`LDC: ${rate.LDC}`);

  return (
    <div className="group relative w-80">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20" />
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-6">
          <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
          <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />

          <div className="relative">
            <h3 className="text-sm font-medium uppercase tracking-wider text-cyan-500">
              {rate.Standard_Utility_Name}
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">${rate.Rate.toFixed(4)}</span>
              {rate.duracion_rate && (
                <span className="text-sm text-slate-400">/ {rate.duracion_rate}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-400">{rate.Product_Name}</p>
          </div>

          <div className="relative mt-6 space-y-4">
            {features.map((text, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                  <Check className="h-4 w-4 text-cyan-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-8">
            <button className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]">
              <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                <span className="relative flex items-center justify-center gap-2">
                  ¡Leer guion!
                  <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </button>
          </div>

          {rate.Last_Updated && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">
                Actualizado: {new Date(rate.Last_Updated).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
