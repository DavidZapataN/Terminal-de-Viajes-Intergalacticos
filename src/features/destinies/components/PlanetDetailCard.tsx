import { Card } from '@/shared/components/Card'
import { CarrouselImage } from './Carrouselmage'
import { Title } from '@/shared/components/Title'
import { Rocket, Star } from 'lucide-react'
import { Button } from '@/shared/components/Button'
import type { Planet } from '@/app/types/Destiny'
import { useNavigate } from '@tanstack/react-router'

interface Props {
  planet: Planet
  planetImages: string[]
}

export const PlanetDetailCard = ({ planet, planetImages }: Props) => {
  const navigate = useNavigate()

  const handleBooking = () => {
    navigate({ to: '/reservas' })
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex w-full flex-col overflow-hidden">
        <CarrouselImage planet={planet} planetImages={planetImages} />
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between">
            <Title>{planet.name}</Title>
            <div className="mb-1 flex items-center gap-1">
              <Star className="h-5 w-5 fill-current text-yellow-400" />
              <span className="text-sm">{planet.rating}</span>
              {/* <span className="text-sm text-muted-foreground">
                ({planet.reviews} reseñas)
              </span> */}
            </div>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {planet.system} • Cuadrante Alpha
            </p>
            <div className="text-cyan-400">
              {planet.price.toLocaleString()}{' '}
              <span className="text-sm">GC</span>
            </div>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            {planet.description}
          </p>

          <Button onClick={handleBooking} className="mt-4 w-full">
            <Rocket size={16} className="mr-2" />
            Reservar Viaje a {planet.name}
          </Button>
        </div>
      </div>
    </Card>
  )
}
