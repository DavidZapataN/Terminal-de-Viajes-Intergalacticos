import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Edit, Trash2 } from 'lucide-react'

export interface Planet {
  id: string
  name: string
  system: string
  description: string
  climate: string
  activities: string[]
  rating: number
  reviews: number
  image: string
  distance: number // in light years
  price: number // in galactic credits
  position: { x: number; y: number } // for map positioning
}

interface Props {
  planet: Planet
}

export const PlanetCard = ({ planet }: Props) => {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-5">
        <header className="flex items-center justify-between">
          <h3>{planet.name}</h3>
          <div className="flex gap-2">
            <Button className="holo-border" variant="secondary">
              <Edit size={16} />
            </Button>

            <Button
              className="holo-border !text-red-400 hover:!text-white"
              variant="secondary"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </header>

        <p className="mb-2 text-sm text-gray-400">{planet.system}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Clima:</span>
            {planet.climate}
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Distancia:</span>
            {planet.distance} años luz
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Precio:</span>
            <span className="text-cyan-400">
              {planet.price.toLocaleString()} GC
            </span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Rating:</span>
            {planet.rating} ⭐ ({planet.reviews} reseñas)
          </p>
        </div>
      </div>
    </Card>
  )
}
