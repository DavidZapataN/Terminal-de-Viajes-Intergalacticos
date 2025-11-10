import type { Spaceship } from '@/features/admin/components/StarshipsList'
import { Card } from '@/shared/components/Card'
import { Check } from 'lucide-react'

interface Props {
  ship: Spaceship
  checked?: boolean
}

export const StarshipInfoCard = ({ ship, checked }: Props) => {
  return (
    <Card className="h-max !w-full cursor-pointer">
      <div className="flex w-full flex-col gap-2.5 p-2">
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h4 className="mb-1">{ship.name}</h4>
              <p className="text-sm text-muted-foreground">{ship.class}</p>
            </div>
            {checked && <Check className="h-5 w-5 text-primary" />}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Capacidad: {ship.capacity}</span>
            <span>Velocidad: Warp {ship.speed}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {ship.amenities.slice(0, 3).map(amenity => (
              <span
                key={amenity}
                className="rounded bg-accent px-2 py-1 text-xs"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
