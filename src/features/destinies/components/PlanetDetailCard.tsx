import { useBookingStore } from '@/app/stores/booking-store'
import type { Destiny } from '@/app/types/Destiny'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import { useNavigate } from '@tanstack/react-router'
import { Rocket, Star } from 'lucide-react'
import { CarrouselImage } from './Carrouselmage'

interface Props {
  planet: Destiny
  planetImages: string[]
}

export const PlanetDetailCard = ({ planet, planetImages }: Props) => {
  const navigate = useNavigate()
  const { setDestiny, resetBooking } = useBookingStore()

  const handleBooking = () => {
    resetBooking()
    setDestiny(planet)
    navigate({ to: '/reservas/fechas' })
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex w-full flex-col overflow-hidden">
        <CarrouselImage planet={planet} planetImages={planetImages} />
        <div className="flex flex-col gap-3 p-4 md:gap-4 md:p-6">
          {/* Title & Rating */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <Title className="text-lg md:text-xl">{planet.name}</Title>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-400 md:h-5 md:w-5" />
              <span className="text-sm">
                {planet.reviewSummary.averageRating}
              </span>
              <span className="text-xs text-muted-foreground md:text-sm">
                ({planet.reviewSummary.totalReviews} reseñas)
              </span>
            </div>
          </div>

          {/* System & Price */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground md:text-sm">
              {planet.system} • Cuadrante Alpha
            </p>
            <div className="text-lg font-semibold text-cyan-400 md:text-xl">
              {planet.price.toLocaleString()}{' '}
              <span className="text-sm">GC</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground md:text-sm">
            {planet.description}
          </p>

          {/* Book Button */}
          <Button onClick={handleBooking} className="mt-2 w-full md:mt-4">
            <Rocket size={16} className="mr-2" />
            <span className="hidden sm:inline">
              Reservar Viaje a {planet.name}
            </span>
            <span className="sm:hidden">Reservar Viaje</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
