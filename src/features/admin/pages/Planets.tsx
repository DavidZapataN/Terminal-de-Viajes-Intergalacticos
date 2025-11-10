import { Button } from '@/shared/components/Button'
import { Plus } from 'lucide-react'
import { PlanetCard } from '../components/PlanetCard'
import { Title } from '@/shared/components/Title'
import { usePlanetsStore } from '@/app/stores/planets-store'
import type { Planet } from '@/app/types/Planet'

export const Planets = () => {
  const planets = usePlanetsStore(state => state.planets)
  const updatePlanet = usePlanetsStore(state => state.updatePlanet)
  const deletePlanet = usePlanetsStore(state => state.deletePlanet)

  const handleUpdate = (updatedPlanet: Planet) => {
    updatePlanet(updatedPlanet)
  }

  const handleDelete = (planetId: string) => {
    deletePlanet(planetId)
  }

  return (
    <div className="mt-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <Title>Gestión de Planetas</Title>

        <Button className="!text-gray-800 active:scale-95">
          <Plus className="mr-3" size={16} />
          Agregar Planeta
        </Button>
      </header>

      {planets.map(planet => (
        <PlanetCard
          key={planet.id}
          planet={planet}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
