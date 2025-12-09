import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Title } from '@/shared/components/Title'
import { DollarSign, Funnel, Globe, Search, X } from 'lucide-react'
import { PlanetSummaryCard } from '../components/PlanetSummaryCard'
import { useDestinyStore } from '@/app/stores/destiny-store'
import { useState, useEffect } from 'react'
import { getDestinies } from '@/app/services/destiny.service'
import type {
  FilterDestiny,
  AtmosphereType,
} from '@/app/types/api/destiny/FilterDestiny'

const atmosphereFilters: { label: string; value: AtmosphereType }[] = [
  { label: 'Respirable', value: 'breathable' },
  { label: 'No respirable', value: 'not breathable' },
  { label: 'Tóxica', value: 'toxic' },
  { label: 'Sin atmósfera', value: 'none' },
]

export const Destinies = () => {
  const destinies = useDestinyStore(state => state.destinies)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAtmosphere, setSelectedAtmosphere] =
    useState<AtmosphereType | null>(null)
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const applyFilters = async () => {
    setIsLoading(true)
    try {
      const filters: FilterDestiny = {}

      if (searchQuery.trim()) {
        filters.name = searchQuery
      }

      if (selectedAtmosphere) {
        filters.atmosphere = selectedAtmosphere
      }

      if (minPrice) {
        filters.minPrice = parseFloat(minPrice)
      }

      if (maxPrice) {
        filters.maxPrice = parseFloat(maxPrice)
      }

      await getDestinies(filters)
    } catch (error) {
      console.error('Error al aplicar filtros:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    applyFilters()
  }, [searchQuery, selectedAtmosphere, minPrice, maxPrice])

  const handleAtmosphereFilter = (atmosphere: AtmosphereType) => {
    setSelectedAtmosphere(prev => (prev === atmosphere ? null : atmosphere))
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedAtmosphere(null)
    setMinPrice('')
    setMaxPrice('')
  }

  const hasActiveFilters =
    searchQuery || selectedAtmosphere || minPrice || maxPrice

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

        {hasActiveFilters && (
          <Button
            variant="secondary"
            className="holo-border w-full md:w-auto"
            onClick={clearFilters}
          >
            <X size={16} className="mr-2" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="flex gap-5">
        <Input
          icon={DollarSign}
          placeholder="Precio mín"
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="w-32"
        />
        <Input
          icon={DollarSign}
          placeholder="Precio máx"
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="w-32"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Funnel size={16} />
          Filtrar por atmósfera:
        </div>

        {atmosphereFilters.map(filter => (
          <Button
            key={filter.value}
            variant="secondary"
            className={`holo-border ${
              selectedAtmosphere === filter.value
                ? 'bg-cyan-400/10 ring-2 ring-cyan-400'
                : ''
            }`}
            onClick={() => handleAtmosphereFilter(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Globe size={48} className="mb-4 animate-spin text-cyan-400" />
          <h3 className="mb-2 text-xl">Buscando destinos...</h3>
        </div>
      ) : destinies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Globe size={48} className="mb-4 text-gray-400" />
          <h3 className="mb-2 text-xl">No se encontraron destinos</h3>
          <p className="mb-4 text-gray-400">
            No hay destinos que coincidan con tus criterios de búsqueda
          </p>
          <Button onClick={clearFilters}>Limpiar filtros</Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">
              {destinies.length}{' '}
              {destinies.length === 1
                ? 'destino encontrado'
                : 'destinos encontrados'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinies.map(destiny => (
              <PlanetSummaryCard key={destiny.id} planet={destiny} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
