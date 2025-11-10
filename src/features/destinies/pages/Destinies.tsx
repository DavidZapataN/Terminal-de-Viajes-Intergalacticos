import { mockPlanets } from '@/db/mockData'
import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Title } from '@/shared/components/Title'
import { Funnel, Globe, Search } from 'lucide-react'
import { PlanetSummaryCard } from '../components/PlanetSummaryCard'

const filters = [
  'Templado',
  'Océanico',
  'Volcánico',
  'Polar',
  'Bosque',
  'Desierto',
]

export const Destinies = () => {
  const filteredPlanets = mockPlanets.filter(_ => true) // Placeholder for actual filter logic

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-5">
      <Title>Explorar Destinos Galácticos</Title>
      <span className="text-gray-400">
        Descubre mundos increíbles en toda la galaxia
      </span>

      <Input
        placeholder="Buscar destino..."
        icon={Globe}
        actionIcon={Search}
        type="text"
      />

      <div className="flex gap-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Funnel size={16} />
          Filtrar por clima:
        </div>

        {filters.map(filter => (
          <Button key={filter} variant="secondary" className="holo-border">
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlanets.map(planet => (
          <PlanetSummaryCard key={planet.id} planet={planet} />
        ))}
      </div>
    </div>
  )
}
