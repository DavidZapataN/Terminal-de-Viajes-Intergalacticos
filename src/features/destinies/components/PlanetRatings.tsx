import type { Planet } from '@/app/types/Destiny'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import { Progress } from '@/shared/components/ui/progress'
import { Star } from 'lucide-react'

export interface RatingDistribution {
  stars: number
  count: number
  percentage: number
}

interface Props {
  planet: Planet
  ratingDistribution: RatingDistribution[]
}

export const PlanetRatings = ({ planet, ratingDistribution }: Props) => {
  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>Valoraciones</Title>
        <div className="mb-4 text-center">
          <div className="mb-1 text-3xl">{planet.rating}</div>

          <div className="mb-1 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(planet.rating)
                    ? 'fill-current text-yellow-400'
                    : 'text-gray-400'
                }
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">20 reseñas</div>
        </div>

        {ratingDistribution.map(rating => (
          <div key={rating.stars} className="flex items-center gap-2 text-sm">
            <span className="w-8">{rating.stars} ★</span>
            <Progress value={rating.percentage} className="h-2 flex-1" />
            <span className="w-12 text-muted-foreground">{rating.count}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
