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
      <div className="flex w-full flex-col gap-3 p-4 md:gap-4 md:p-6">
        <Title className="text-base">Valoraciones</Title>
        <div className="mb-2 text-center md:mb-4">
          <div className="mb-1 text-2xl md:text-3xl">
            {planet.reviewSummary.averageRating.toFixed(1)}
          </div>

          <div className="mb-1 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(planet.reviewSummary.averageRating || 0)
                    ? 'fill-current text-yellow-400'
                    : 'text-gray-400'
                }
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground md:text-sm">
            {planet.reviewSummary.totalReviews} reseñas
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(rating => (
            <div
              key={rating.stars}
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              <span className="w-6 md:w-8">{rating.stars} ★</span>
              <Progress
                value={rating.percentage}
                className="h-1.5 flex-1 md:h-2"
              />
              <span className="w-8 text-right text-muted-foreground md:w-12">
                {rating.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
