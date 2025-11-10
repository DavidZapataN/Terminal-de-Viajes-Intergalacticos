import type { Planet } from '@/features/admin/components/PlanetCard'
import { Badge } from '@/shared/components/Bagde'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { useNavigate } from '@tanstack/react-router'
import { Clock, MapPin, Rocket, Star, Users } from 'lucide-react'

interface Props {
  planet: Planet
}

export const PlanetSummaryCard = ({ planet }: Props) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate({ to: `/destinies/${planet.id}` })
  }

  return (
    <Card className="group cursor-pointer hover:[box-shadow:var(--hologram-glow)]">
      <div
        className="flex w-full flex-col overflow-hidden"
        onClick={handleCardClick}
      >
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <ImageWithFallback
            src={planet.image}
            alt={planet.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge className="border-cyan-400/50 bg-black/50 text-white">
              {planet.system}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1">
            <Star size={10} className="fill-current text-yellow-400" />
            <span className="text-sm text-white">{planet.rating}</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="rounded-lg border border-cyan-400/50 bg-black/50 px-4 py-2 text-white">
              Ver detalles →
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 transition-colors group-hover:text-cyan-400">
            {planet.name}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {planet.description}
          </p>

          <div className="mb-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>Clima: {planet.climate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-purple-400" />
              <span>{planet.distance} años luz</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-emerald-400" />
              <span>{planet.reviews} reseñas</span>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap gap-1">
            {planet.activities.slice(0, 2).map(activity => (
              <Badge key={activity} className="text-xs">
                {activity}
              </Badge>
            ))}
            {planet.activities.length > 2 && (
              <Badge className="text-xs">
                +{planet.activities.length - 2} más
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg text-cyan-400">
                {planet.price.toLocaleString()}
              </span>
              <span className="ml-1 text-sm text-muted-foreground">GC</span>
            </div>
            <Button className="border-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-sm text-white hover:from-cyan-600 hover:to-purple-600">
              <Rocket className="mr-2 h-4 w-4" />
              Reservar Ahora
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
