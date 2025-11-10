import { mockPlanets } from '@/db/mockData'
import { Button } from '@/shared/components/Button'
import { Plus } from 'lucide-react'
import { PlanetCard } from '../components/PlanetCard'
import { Title } from '@/shared/components/Title'

export const Planets = () => {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <Title>Gestión de Planetas</Title>

        <Button className="!text-gray-800 active:scale-95">
          <Plus className="mr-3" size={16} />
          Agregar Planeta
        </Button>
      </header>

      {mockPlanets.map(planet => (
        <PlanetCard key={planet.id} planet={planet} />
      ))}
    </div>
  )
}
