import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold">
          Terminal de Viajes Intergalácticos
        </h1>
        <p className="mt-4 text-gray-400">
          Bienvenido a la aplicación. Usa el menú para navegar.
        </p>
      </div>
    </div>
  )
}
