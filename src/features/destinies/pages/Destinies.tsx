import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Title } from '@/shared/components/Title'
import { Funnel, Globe, Search, X } from 'lucide-react'
import { PlanetSummaryCard } from '../components/PlanetSummaryCard'
import { usePlanetsStore } from '@/app/stores/planets-store'
import { useState, useMemo } from 'react'

const climateFilters = [
  'Templado',
  'Océanico',
  'Volcánico',
  'Polar',
  'Bosque',
  'Desierto',
]

export const Destinies = () => {
  const planets = usePlanetsStore(state => state.planets)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClimate, setSelectedClimate] = useState<string | null>(null)

  const filteredPlanets = useMemo(() => {
    let filtered = planets

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        planet =>
          planet.name.toLowerCase().includes(lowerQuery) ||
          planet.system.toLowerCase().includes(lowerQuery) ||
          planet.description.toLowerCase().includes(lowerQuery) ||
          planet.climate.toLowerCase().includes(lowerQuery)
      )
    }

    // Filtrar por clima
    if (selectedClimate) {
      console.log(selectedClimate);

      filtered = filtered.filter(
        planet => planet.climate.toLowerCase().includes(selectedClimate.toLowerCase())
      )
    }

    return filtered
  }, [planets, searchQuery, selectedClimate])

  const handleClimateFilter = (climate: string) => {
    setSelectedClimate(prev => (prev === climate ? null : climate))
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedClimate(null)
  }

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-5">
      <Title>Explorar Destinos Galácticos</Title>
      <span className="text-gray-400">
        Descubre mundos increíbles en toda la galaxia
      </span>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Buscar destino..."
          icon={Globe}
          actionIcon={Search}
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1"
        />

        {(searchQuery || selectedClimate) && (
          <Button
            variant="secondary"
            className="holo-border w-full md:w-auto"
            onClick={clearFilters}
          >
            <X size={16} className="mr-2" />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Funnel size={16} />
          Filtrar por clima:
        </div>

        {climateFilters.map(filter => (
          <Button
            key={filter}
            variant="secondary"
            className={`holo-border ${
              selectedClimate === filter
                ? 'bg-cyan-400/10 ring-2 ring-cyan-400'
                : ''
            }`}
            onClick={() => handleClimateFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {filteredPlanets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Globe size={48} className="mb-4 text-gray-400" />
          <h3 className="mb-2 text-xl">No se encontraron planetas</h3>
          <p className="mb-4 text-gray-400">
            No hay planetas que coincidan con tus criterios de búsqueda
          </p>
          <Button onClick={clearFilters}>Limpiar filtros</Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">
              {filteredPlanets.length}{' '}
              {filteredPlanets.length === 1
                ? 'planeta encontrado'
                : 'planetas encontrados'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlanets.map(planet => (
              <PlanetSummaryCard key={planet.id} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
