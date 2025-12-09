import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { Heart, MessageCircle, Star } from 'lucide-react'

export interface Review {
  id: number
  user: string
  avatar: string
  date: string
  rating: number
  comment: string
  helpful: number
}

interface Props {
  reviews: Review[]
}

export const PlanetReviews = ({ reviews }: Props) => {
  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>Reseñas de viajeros</Title>

        {reviews.map(review => (
          <div
            key={review.id}
            className="border-b border-border pb-4 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={review.avatar} />
                <AvatarFallback className="bg-linear-to-r from-cyan-500 to-purple-500 text-xs text-white">
                  {review.user
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">{review.user}</span>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? 'fill-current text-yellow-400'
                          : 'text-gray-400'
                      }
                    />
                  ))}
                </div>

                <p className="mb-2 text-sm text-muted-foreground">
                  {review.comment}
                </p>

                <div className="flex items-center gap-2">
                  <Button variant="text" className="h-6 px-2 text-xs">
                    <Heart size={14} className="mr-1" />
                    Útil ({review.helpful})
                  </Button>
                  <Button variant="text" className="h-6 px-2 text-xs">
                    <MessageCircle size={14} className="mr-1" />
                    Responder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button variant="text" className="holo-border mt-4 w-full">
          Ver todas las reseñas
        </Button>
      </div>
    </Card>
  )
}
