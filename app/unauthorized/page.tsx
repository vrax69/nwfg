// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">Acceso denegado</h1>
        <p className="mt-2">No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }
  