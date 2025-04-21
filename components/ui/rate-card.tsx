import React from "react";
import {
  Check,
  CalendarDays,
  History,
  CreditCard,
  Flame,
  Zap,
  BarChart3,
  Building2,
  Map,
  Server
} from "lucide-react";

// Componente personalizado para ClockFading
const ClockFadingSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8v4l2 2" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

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
  Logo_URL?: string; // Añadida la nueva propiedad
}

const Card = ({ rate }: { rate: RateProps }) => {
  return (
    <div className="group relative w-80">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20" />
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-6">
          <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
          <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />

          <div className="relative">
            <div className="flex items-center gap-2">
              {rate.Logo_URL && (
                <img
                  src={rate.Logo_URL}
                  alt="Logo"
                  className="h-6 w-6 object-contain rounded"
                />
              )}
              <h3 className="text-sm font-medium uppercase tracking-wider text-cyan-500">
                {rate.Standard_Utility_Name}
              </h3>
            </div>
            
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">${Number(rate.Rate).toFixed(4)}</span>
              {rate.duracion_rate && (
                <span className="text-sm text-slate-400">/ {rate.duracion_rate}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-400">{rate.Product_Name}</p>
          </div>

          <div className="relative mt-6 space-y-4">
            {[
              {
                label: rate.ETF && "ETF:",
                value: rate.ETF,
                icon: History,
              },
              {
                label: rate.MSF && "MSF:",
                value: rate.MSF,
                icon: CreditCard,
              },
              {
                label: rate.Service_Type && (rate.Service_Type === "Electric" ? "Servicio:" : rate.Service_Type === "Gas" ? "Servicio:" : null),
                value: rate.Service_Type === "Electric" ? "Electricidad" : rate.Service_Type === "Gas" ? "Gas" : null,
                icon: rate.Service_Type === "Electric" ? Zap : Flame,
              },
              {
                label: rate.Unit_of_Measure && "Unidad:",
                value: rate.Unit_of_Measure,
                icon: BarChart3,
              },
              {
                label: rate.Company_DBA_Name && "Proveedor:",
                value: rate.Company_DBA_Name,
                icon: Building2,
              },
              {
                label: rate.State && "Estado:",
                value: rate.State,
                icon: Map,
              },
              {
                label: rate.LDC && "Distribuidor:",
                value: rate.LDC,
                icon: Server,
              },
            ].map(
              (item, index) =>
                item.label && item.value && (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                      <item.icon className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div className="flex gap-1">
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-sm text-slate-300">{item.value}</p>
                    </div>
                  </div>
                )
            )}
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
              <CalendarDays className="h-5 w-5 text-slate-400" />
              <span className="text-xs font-medium text-slate-400">
                Actualizado en {new Date(rate.Last_Updated).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '-')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
