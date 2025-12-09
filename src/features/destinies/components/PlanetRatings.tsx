import type { Destiny } from '@/app/types/Destiny'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import { Progress } from '@/shared/components/ui/progress'
import { Star } from 'lucide-react'
import { useMemo } from 'react'

interface Props {
  planet: Destiny
}

export const PlanetRatings = ({ planet }: Props) => {
  const ratingDistribution = useMemo(() => {
    const summary = planet.reviewSummary
    const total = summary.totalReviews

    return [
      {
        stars: 5,
        count: summary.rating5,
        percentage: Math.round((summary.rating5 / total) * 100),
      },
      {
        stars: 4,
        count: summary.rating4,
        percentage: Math.round((summary.rating4 / total) * 100),
      },
      {
        stars: 3,
        count: summary.rating3,
        percentage: Math.round((summary.rating3 / total) * 100),
      },
      {
        stars: 2,
        count: summary.rating2,
        percentage: Math.round((summary.rating2 / total) * 100),
      },
      {
        stars: 1,
        count: summary.rating1,
        percentage: Math.round((summary.rating1 / total) * 100),
      },
    ]
  }, [planet.reviewSummary])

  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>Valoraciones</Title>
        <div className="mb-4 text-center">
          <div className="mb-1 text-3xl">
            {planet.reviewSummary.averageRating.toFixed(1)}
          </div>

          <div className="mb-1 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(planet.reviewSummary.averageRating || 0)
                    ? 'fill-current text-yellow-400'
                    : 'text-gray-400'
                }
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {planet.reviewSummary.totalReviews} reseñas
          </div>
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
