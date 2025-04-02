'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("https://www.nwfg.net/api/auth/logout", {
      method: "POST",
      credentials: "include", // ⚠️ ¡Muy importante para enviar la cookie!
    })

    router.push("/") // o window.location.href = '/' si prefieres redirección forzada
  }

  const handleReturn = () => {
    router.push("/dashboard")
  }

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-600">Acceso denegado</h1>
      <p className="mt-2">No tienes permisos para acceder a esta sección.</p>

      <div className="mt-6 flex justify-center gap-4">
        <Button
          variant="secondary"
          className="bg-black text-white hover:bg-neutral-800"
          onClick={handleLogout}
        >
          Logout
        </Button>

        <Button
          variant="default"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={handleReturn}
        >
          Regresar
        </Button>
      </div>
    </div>
  )
}
// Este componente es una página de error personalizada para manejar el acceso denegado
// en una aplicación Next.js. Cuando un usuario intenta acceder a una sección sin permisos,