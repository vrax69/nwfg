"use client";  // 👈 Agrega esto en la primera línea
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'  // 👈 Importa useRouter

// Define TypeScript interfaces for better type safety
interface PixelCanvasProps {
  gap?: number
  speed?: number
  colors?: string
  noFocus?: boolean
}

interface CardProps {
  icon: string
  label: string
  color: string
  canvasProps?: PixelCanvasProps
  onClick?: () => void  // 👈 Agrega la prop onClick
}

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pixel-canvas': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Centralize configuration and make it more flexible
const PIXEL_SCRIPT_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pixel-RKkUKH2OXWk9adKbDnozmndkwseTQh.js'

const PixelCanvas: React.FC<PixelCanvasProps> = ({ 
  gap = 5, 
  speed = 30, 
  colors = "#e0f2fe, #7dd3fc, #0ea5e9", 
  noFocus = false 
}) => {
  return ( // @ts-ignore
    <pixel-canvas 
      data-gap={gap} 
      data-speed={speed} 
      data-colors={colors}
      {...(noFocus ? { "data-no-focus": "" } : {})}
      className="absolute inset-0 size-full"
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    />
  )
}

const Card: React.FC<CardProps> = ({ 
  icon, 
  label, 
  color, 
  canvasProps = {},
  onClick  // 👈 Recibe la prop onClick
}) => {
  // Hover animation configuration
  const hoverTransition = { 
    duration: 0.8, 
    ease: [0.5, 1, 0.89, 1] 
  }

  return (
    <motion.div 
      className="light:border-gray-900 !dark:border-gray-[900] group relative isolate grid aspect-[4/5] select-none place-items-center overflow-hidden rounded-xl border transition-all duration-200 hover:text-black dark:hover:text-white sm:aspect-square md:aspect-[4/5]"
      onClick={onClick}  // 👈 Agrega el manejador de clic
      style={{ cursor: onClick ? 'pointer' : 'default' }}  // 👈 Cambia el cursor si hay un onClick
    >
      <PixelCanvas {...canvasProps} />
      
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,transparent_55%,#ffffff)] shadow-[-0.5cqi_0.5cqi_2.5cqi_inset_#f3f4f6] dark:bg-[radial-gradient(circle_at_bottom_left,transparent_55%,#101012)] dark:shadow-[-0.5cqi_0.5cqi_2.5cqi_inset_#09090b]"
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        transition={hoverTransition}
      />
      
      <motion.div
        className="absolute inset-0 m-auto aspect-square bg-[radial-gradient(circle,#f3f4f6,transparent_65%)] dark:bg-[radial-gradient(circle,#09090b,transparent_65%)]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={hoverTransition}
      />
      
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
        className="ease-[cubic-bezier(0.5,1,0.89,1)] relative z-10 h-auto w-[30%] text-gray-600 transition-all duration-300 group-hover:text-black dark:text-[#52525b] dark:group-hover:text-white sm:w-[40%] md:w-[35%] lg:w-[30%]"
        whileHover={{ 
          scale: 1.1,
          transition: hoverTransition 
        }}
      >
        <path d={icon} fill="currentColor" />
      </motion.svg>
      
      <span className="sr-only">{label}</span>
      
      <span className="absolute bottom-4 left-4 text-sm font-medium text-gray-600 dark:text-gray-400 sm:text-base md:text-lg">
        {label}
      </span>
    </motion.div>
  )
}

export default function PixelCards() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const router = useRouter()  // 👈 Inicializa useRouter

  useEffect(() => {
    const script = document.createElement('script')
    script.src = PIXEL_SCRIPT_URL
    script.async = true
    
    script.onload = () => setIsScriptLoaded(true)
    script.onerror = () => console.error('Failed to load pixel canvas script')
    
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const cardConfigurations = [
    {
      icon: "M216,42H40A14,14,0,0,0,26,56V200a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A14,14,0,0,0,216,42ZM40,54H216a2,2,0,0,1,2,2V98H38V56A2,2,0,0,1,40,54ZM38,200V110H98v92H40A2,2,0,0,1,38,200Zm178,2H110V110H218v90A2,2,0,0,1,216,202Z",
      label: "Rates DB",
      color: "#e0f2fe"
    },
    {
      icon: "M200,24H72A16,16,0,0,0,56,40V64H40A16,16,0,0,0,24,80v96a16,16,0,0,0,16,16H56v24a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm-40,80h40v48H160Zm40-16H160V80a16,16,0,0,0-16-16V40h56ZM72,40h56V64H72ZM40,80H144v79.83c0,.06,0,.11,0,.17s0,.11,0,.17V176H40ZM72,192h56v24H72Zm72,24V192a16,16,0,0,0,16-16v-8h40v48ZM65.85,146.88,81.59,128,65.85,109.12a8,8,0,0,1,12.3-10.24L92,115.5l13.85-16.62a8,8,0,1,1,12.3,10.24L102.41,128l15.74,18.88a8,8,0,0,1-12.3,10.24L92,140.5,78.15,157.12a8,8,0,0,1-12.3-10.24Z",
      label: "Rates LookUp",
      color: "#01dc36",
      canvasProps: { gap: 10, speed: 25, colors: "#01dc36, #01dc36, #01dc36" },
      onClick: () => router.push('/rates')  // 👈 Agrega la redirección
    },
    {
      icon: "M180,146H158V110h22a34,34,0,1,0-34-34V98H110V76a34,34,0,1,0-34,34H98v36H76a34,34,0,1,0,34,34V158h36v22a34,34,0,1,0,34-34ZM158,76a22,22,0,1,1,22,22H158ZM54,76a22,22,0,0,1,44,0V98H76A22,22,0,0,1,54,76ZM98,180a22,22,0,1,1-22-22H98Zm12-70h36v36H110Zm70,92a22,22,0,0,1-22-22V158h22a22,22,0,0,1,0,44Z",
      label: "Command",
      color: "#fef08a",
      canvasProps: { gap: 3, speed: 20, colors: "#fef08a, #fde047, #eab308" }
    },
    {
      icon: "M222,67.34a33.81,33.81,0,0,0-10.64-24.25C198.12,30.56,176.68,31,163.54,44.18L142.82,65l-.63-.63a22,22,0,0,0-31.11,0l-9,9a14,14,0,0,0,0,19.81l3.47,3.47L53.14,149.1a37.81,37.81,0,0,0-9.84,36.73l-8.31,19a11.68,11.68,0,0,0,2.46,13A13.91,13.91,0,0,0,47.32,222,14.15,14.15,0,0,0,53,220.82L71,212.92a37.92,37.92,0,0,0,35.84-10.07l52.44-52.46,3.47,3.48a14,14,0,0,0,19.8,0l9-9a22.06,22.06,0,0,0,0-31.13l-.66-.65L212,91.85A33.76,33.76,0,0,0,222,67.34Zm-123.61,127a26,26,0,0,1-26,6.47,6,6,0,0,0-4.17.24l-20,8.75a2,2,0,0,1-2.09-.31l9.12-20.9a5.94,5.94,0,0,0,.19-4.31A25.91,25.91,0,0,1,56,166h70.78ZM138.78,154H65.24l48.83-48.84,36.76,36.78Zm64.77-70.59L178.17,108.9a6,6,0,0,0,0,8.47l4.88,4.89a10,10,0,0,1,0,14.15l-9,9a2,2,0,0,1-2.82,0l-60.69-60.7a2,2,0,0,1,0-2.83l9-9a10,10,0,0,1,14.14,0l4.89,4.89a6,6,0,0,0,4.24,1.75h0a6,6,0,0,0,4.25-1.77L172,52.66c8.57-8.58,22.51-9,31.07-.85a22,22,0,0,1,.44,31.57Z",
      label: "Dropper",
      color: "#fecdd3",
      canvasProps: { gap: 6, speed: 80, colors: "#fecdd3, #fda4af, #e11d48", noFocus: true }
    }
  ]

  return (
    <main className="m-auto grid min-h-[320px] w-full max-w-[60rem] grid-cols-1 gap-4 rounded-2xl bg-[#aecbfb] p-4 text-gray-800 dark:bg-[#8ea2db] dark:text-[#e3e3e3] sm:grid-cols-2 lg:grid-cols-4 shadow-lg">
      {isScriptLoaded && cardConfigurations.map((cardConfig, index) => (
        <Card 
          key={cardConfig.label}
          icon={cardConfig.icon}
          label={cardConfig.label}
          color={cardConfig.color}
          canvasProps={cardConfig.canvasProps}
          onClick={cardConfig.onClick}  // 👈 Pasa la prop onClick
        />
      ))}
    </main>
  )
}