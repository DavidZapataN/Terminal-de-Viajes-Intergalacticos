import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import { X, Star } from 'lucide-react'
import { useState } from 'react'
import type { CreateReview } from '@/app/types/api/review/CreateReview'

interface Props {
  destinyId: number
  userId: number
  onClose: () => void
  onSubmit: (review: CreateReview) => Promise<void>
}

export const CreateReviewModal = ({
  destinyId,
  userId,
  onClose,
  onSubmit,
}: Props) => {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5)
  const [content, setContent] = useState('')
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        authorId: userId,
        destinyId,
        content: content.trim(),
        rating,
      })
      onClose()
    } catch (error) {
      console.error('Error al crear reseña:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg">
        <div className="flex w-full flex-col gap-3 p-4 md:gap-4 md:p-6">
          <div className="flex items-center justify-between">
            <Title className="text-base md:text-lg">Escribir reseña</Title>
            <Button
              variant="text"
              className="h-8 w-8 p-0"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <X size={18} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="mb-2 block text-xs md:text-sm">
                Calificación <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1 md:gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={24}
                      className={`md:h-8 md:w-8 ${
                        star <= (hoveredStar || rating)
                          ? 'fill-current text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-xs md:text-sm"
              >
                Tu opinión <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Comparte tu experiencia en este destino..."
                className="w-full rounded-lg border border-border bg-background p-3 text-xs outline-none focus:border-cyan-400 md:text-sm"
                rows={4}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                className="flex-1 text-sm"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 text-sm"
                disabled={!content.trim() || isSubmitting}
              >
                {isSubmitting ? 'Publicando...' : 'Publicar reseña'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
