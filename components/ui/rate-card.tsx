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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Ajusta la ruta según tu estructura de proyecto

// Objeto de enlaces para los scripts por SPL, idioma y tipo
const scriptLinks: Record<string, Record<string, Record<string, string>>> = {
  cs: {
    english: {
      inbound: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EZaxS1BYmdBCoz8xIWsuUVkBgwgPy4JIRTKDBlir6q-3YQ?e=uzlSSS",
      flex: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Ea0reQ8iyJdBoOaXSF7G-qMBOyU31_KPr2UHN2ITfEugLg?e=AbWuoW",
    },
    spanish: {
      inbound: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQ7sXWsvYuNNsz9V1ut8Re0Bbs104onPQuWeyvGHAXoYUw?e=vM64m1",
      flex: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/ETspDTYPFNdEs-86Rg4JXWIB1dal-YqN5ehzOSkj2PCOXg?e=6jDBuv",
    },
  },
  ne: {
    english: {
      inbound: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EcyHH3PIjQJKhkm6VIJU3lUBtJC_00OEKpc-d9jSNZGOqA?e=soB16R",
    },
  },
  nge: {
    english: {
      inbound: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EcSm-NddOHtAvwgBwHIGMD0BQGB4qNjrMj_O4tHEl5DB2g?e=gcL1hf",
    },
    spanish: {
      inbound: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EfVLXS-EeRVAtmxHeSvKMiABJeEygGodGsYJu-vShRQBrw?e=9gcVIV",
    },
  },
  nv: {
    english: {
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EV7nWgTJH89Irm0lxWn5D9gB18iDaD7THGiFy8Lx3kmvgQ?e=C9OXDA",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EW79hKvZiI9ElrvyfZU5OLsBxRWNHOSebq9cTZ1wSbAkDA?e=RR9ZF7",
      OH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EXPxa13uSmRNrRWldGc7bbcBKvJi-cLDwMe0sQMl4J-ruA?e=0w30aM",
    },
    spanish: {
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EdjmradY0cJAq7tspkukgygBaalVNhlWMrpm_EYspHzPIw?e=1zwHj1",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQuWGg_3EMBChdDBMEQN_OQBKjiHabFUatXx2OD9e-MkHA?e=JOXoAE",
      OH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EVCOObhispNOhIsbRnrzIDABqKPqMv5QNW9uiiFwYTtPZA?e=GRF3h6",
    },  
  },
  re: {
    english: {
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQVZBfylsdhDvsd0b1_mfGUBAN4QQdwVRlNk-3aBYRRF9A?e=oWbCjS",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EdTFhArcu6NHk7sp4LKRcZ4ByuubARKvVGxLiMefKqT37w?e=3V1p4y",
      OH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EYVm27iYCAFBs9TsmB_66lgBh9GILP0D-JWEOF0HccRbrA?e=yDMs5d",
      PA:"https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/ERN8wsicKKpJuBDJrebrYcEBgj3Ip3h5ZsXXqHOKXUV6iQ?e=GYpMhC",
    },
    spanish: {
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EWvpSDWENblCsIntpPyy734BWdZxSjPvyH9TtnxkdSgy_g?e=ANuI6x",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EX53ahMySLFPlAVdbdZN6IYB-xu-uMkIm99mtyoY-rvxVQ?e=8evMv5",
      OH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EcjQeOa6T_RHjgV4sijOwbMB7onCkVtKBIKuw7ONzh5GvQ?e=WR7SJm",
      PA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EdZsU6giNRlDsHseov5UkbwBmp3Xg5QEy1WZIeu5DnnSig?e=mS4EgL",
    },  
  },
  spe: {
    english: {      
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Efjp1BqhMT5Eg4YNzWdTmg0BQkrZSR6-zgMA76BJkMPO7A?e=HIcbjs",
      DC: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EV7g-G4GU6pInPfQ6IRVmcUByj0DrgpGIFRt-JZHG8v8fw?e=1eCttb",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EUtXEAFnfqFNliV26xdrtUcB8EgbfHY6RweJvYnODGRfvg?e=CAZNSJ",
      OH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EbhDTheu12pInOEojShdk10BlPqwj4UCkTUoQlQPvKsSYw?e=NliHQr",
      IN: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Ea-lrRIICjxFiE80T5S67hgBQxF6MREQepZ73pcxnlfY3g?e=skONnV",
      ME: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQNdSu8YsrdDgW88LFKsEFEBFEyZdQ2UGLKzMSpX3EiSdA?e=5CHjbc",
      MA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EX1dbucwPUtDmRVl3xDco-MBuyDFqiqzkIFlic6uybfuyw?e=hbnMog",
      MI: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EXeDlXi0K-xNrBem6CwYCkwBblXJE7SFLJHCRdvPrfidLg?e=KDib5C",
      NJ: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Ean7wZriHMlMhJ-wvxCZOxQB8x3QdLtYBy6BlKfcmovlFg?e=8MQ5m7",
      NH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EWGaga3G_pxDt7imIuzmJmIB6Absn0GVxgC1eN0BeuVVhg?e=lVfI4y",
      NY: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EV-q8tQkxiVOpH-kdmhjNVoBf9BfL0yCWh6gmPDY7eYT4w?e=fm1CVo",
      PA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EcSxrK9rA_lBixQUwkDRtoUBr13R3DNeUk9PSlqQxP9qGw?e=izUSDb",
      RI: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EbmTQOGSxipHumdaivj4fp4Bnfj4z25OPANQxxIHsYMe7g?e=HqvAmx",
      VA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EcDPR68z25pKiXxpd4mBEmwBWogrI90nz1DrbCkQBxlQKQ?e=49S5vU",
    },
    spanish: {
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EXpsqjlFOr1DvBif2LMb8NYBJpcC172pg4Y01C5iXDmSeQ?e=pYRfko",
      DC: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Ea9vX39Ww6pEgkoRY6FE9MIBNcbEtPCmGuOMrDvHa5ePkw?e=ZqPnyp",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EZsyW8th2tNNuZihn3jpJggB234BDx4w6VPWAwCuG4ejGg?e=6c5j4d",
      MA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EXYbUUn1zfxNufykCH-9ZSgBmcdctKMxNCp2P25lBh6tWQ?e=6CYaCv",
      OH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EfCKSU4Fpr1NttsHZkhFk1cBPyujSqdJHm22Krd85hRURw?e=fbibU5",
      ME: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EXi6Zhtz6fxAoyVBT9abO6ABAGsAr3Qf2pQF_HLVEj-Jvg?e=bt0b6F",
      MI: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EUXmHQEeebFImaMxvUe-EYMBnwT1ArcPpyylB80AgoaemA?e=aflHKa",
      NJ: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQOIN1ukcIxPkovBIO6weCYB59ysMgydB8Q4ipe1yh45Hw?e=pcDLu4",
      NH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQOIN1ukcIxPkovBIO6weCYB59ysMgydB8Q4ipe1yh45Hw?e=xKLsoM",
      NY: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Efwd2WfjvGNFqjbkGhXM2FkBp1TmqaFokpiRsZjGjJU60g?e=vFPJyg",
      PA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Efwd2WfjvGNFqjbkGhXM2FkBp1TmqaFokpiRsZjGjJU60g?e=vFPJyg",
      RI: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EShYBoldertHsgoWYogXAXkBBQVdNrtZZWByTNedo3Bj4A?e=xh0ACz",
      VA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EZrnsBjPegdFi46d0h8OqNQBQLxVG80eYeI5wZwAcAYB4w?e=wr7rYP",
    },
  },
  wg: {
    english: {
      DC: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EUAIJJu-wMJLumsq0RfCe74Bgqp-41TU_EGs5_dQPkQwJw?e=dNos7B",
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EeESlouSyERFjA4ALSkBAEYBQmfBZWmRGiJih3d9gJihSQ?e=5Qleuh",
      MD: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/EUdg2h2HCL9OmaXnWQy_VDgBdUJw-JABADD0f2tH6pR5og?e=CfROsN",
      OH: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQmGB_A0p0lOqAmI496AaMABWe4DzxFAV0kAO6gCHz926g?e=PemihX",
      PA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EQIL3Esp8JZMofGET-vY6rgBHI_HQ8qZ2Vpg-NrIoE1fVg?e=wIylnC",
      VA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EUaI9RqjtctKs6N9P-fB7E0BtP0mj0pZ730DeBYaAcA4cw?e=NwtEqq",
    },
  },
  ie: {
    english: {
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/ESR8UdARYpRJiDR34pDsM1MBN7uPID9Mwz-qFj-4gdZUIQ?e=GKRHMm",
      DC: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/ESaI8y7-uqJJms03Y4U87voBSFzoWTJ822doGn1hfaSdFw?e=jXA3zR",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EVZNGarJC21PojA1rZSNb5gBOqcmqkftx-iSBlcq-SdKFw?e=KfEM0L",
      MA: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/EdEun0duWJ5Og5HVzeckDZwB4eU-KgP9Qb8bdW2sWOsYpg?e=6Pjj1v",
      MI: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/Efuzo3qTjZ9KpJxxjrZkOB0BxqeDgwyRY8Ufux38oHNIZA?e=KSIPq2",
      NJ: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/EfhnO5v3qj5HjDkd8v71UqABZ3ZIWTrloXfO8jmg-a3V4A?e=3LyYkK",
      PA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EaoQe0FoP9tNkE_hojN9zq0BnmdlmFzl1NhNGPv9cI3gqQ?e=s02YMs",
      VA: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/ET9oqJUe6LlDkAiVyXonlWYB04izL9zqKYGQJ3BAeQ3hUw?e=4Etg6o",
      MD: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EWGm2dqiGVpCofaE9wKK_N8BWmAiQBYoaxK3E4rAL9qNMg?e=76gEpM",
    },
    spanish: {
      DE: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/EQMtQm4NftdPvS9h6yThGcEBQD7poR2XTICf0lfi27tl9w?e=7TADDj",
      DC: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EUWzUjL-6jZOnB2dzHv9lbABYZSAiZkxgxOegpUdxL4AlQ?e=2Hq4yK",
      IL: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/Efol4olBPhJArNpH1qy4KdgBSz1Tqnk0UYbIgPhcKOKaxg?e=tSA7Dn",
      MA: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/EZbNPTtpMPNFl9OUbQUydIoBJHuutn_55p9sMcX1EIKlyQ?e=a973o4",
      MI: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/ESsSkfHc_tNNmPUSU9WmKHEBYD7AL70xQxNNANy-4cPuMQ?e=gH4yb2",
      NJ: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/ETU6v1F2QxNNpVY4cD25YBoBrN84rpVLFiTkK0xWbqrxQA?e=iwlmkp",
      PA: "https://newwavefamilygroupsas-my.sharepoint.com/:w:/g/personal/mortiz_nwfamilygroup_com/EVpCVj1RGU5IjDASezjg1V4B5c4jAz_D4mvtOWySus9tLA?e=dvwn7O",
      VA: "https://newwavefamilygroupsas-my.sharepoint.com/:b:/g/personal/mortiz_nwfamilygroup_com/EZf4ky3HtrtKsXyxBP1HsH0B_As0Hy2RfL4N9g3shNPa4w?e=bnbeYx",
      MD: "",
    }
  }   
};
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
                  className="h-10 max-w-[100px] object-contain rounded"
                />
              )}
              <h3 className="text-sm font-medium uppercase tracking-wider text-cyan-500">
                {rate.Standard_Utility_Name}
              </h3>
            </div>
            
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">
                ${Number(rate.Rate) < 1 ? Number(rate.Rate).toFixed(4) : Number(rate.Rate).toFixed(2)}
              </span>
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
                label: rate.LDC && "LDC#:",
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]">
                  <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                    <span className="relative flex items-center justify-center gap-2">
                      ¡Leer guion!
                    </span>
                  </div>
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogTitle>Selecciona un guion</AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-muted-foreground">
                  Elige el tipo de guion que quieres abrir para este proveedor.
                </AlertDialogDescription>

                {/* Script buttons dinámicos */}
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-wrap justify-start items-start gap-2">
                    {["english", "spanish"].flatMap((lang) => {
                      const spl = rate.SPL?.toLowerCase() ?? "";
                      const state = rate.State ?? "";
                      const scriptSet = scriptLinks[spl]?.[lang];

                      if (!scriptSet) return [];

                      // SPLs que solo muestran scripts por estado
                      const onlyStateBased = ["nv", "re", "spe", "wg", "ie"];

                      if (onlyStateBased.includes(spl)) {
                        const url = scriptSet[state];
                        if (!url || !url.startsWith("http")) return [];
                        return [
                          <AlertDialogAction asChild key={`${lang}-${state}`}>
                            <a
                              href={url}
                              target="_blank"
                              className="px-3 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 rounded transition whitespace-nowrap"
                            >
                              {`Script (${lang === "english" ? "EN" : "ES"})`}
                            </a>
                          </AlertDialogAction>,
                        ];
                      } else {
                        // SPLs que muestran todos los tipos (cs, ne, nge)
                        return Object.entries(scriptSet)
                          .filter(([, url]) => url?.startsWith("http"))
                          .map(([key, url]) => (
                            <AlertDialogAction asChild key={`${lang}-${key}`}>
                              <a
                                href={url}
                                target="_blank"
                                className="px-3 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 rounded transition whitespace-nowrap"
                              >
                                {`${key.charAt(0).toUpperCase() + key.slice(1)} (${lang === "english" ? "EN" : "ES"})`}
                              </a>
                            </AlertDialogAction>
                          ));
                      }
                    })}
                  </div>

                  <div className="flex justify-end">
                    <AlertDialogCancel className="text-red-500 text-xs px-2 py-1 border border-red-500 hover:bg-red-500 hover:text-white transition rounded">
                      Cerrar
                    </AlertDialogCancel>
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
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
