import { Button } from '@/shared/components/Button'
import { Plus } from 'lucide-react'
import { StarshipsList } from '../components/StarshipsList'

export const Starships = () => {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <h2 className="text-cyan-400">Gestión de Naves</h2>

        <Button className="!text-gray-800 active:scale-95">
          <Plus className="mr-3" size={16} />
          Agregar Nave
        </Button>
      </header>

      <StarshipsList />
    </div>
  )
}
