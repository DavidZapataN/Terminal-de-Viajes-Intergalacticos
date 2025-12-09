import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import {
  Heart,
  MessageCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Trash2,
  Send,
  X,
  MessageCircleMore,
} from 'lucide-react'
import { useState } from 'react'
import {
  getReviewRepliesByReviewId,
  deleteReview,
  createReviewReply,
  deleteReviewReply,
} from '@/app/services/review.service'
import type { ReviewReply } from '@/app/types/ReviewReply'
import { Input } from '@/shared/components/Input'

export interface Review {
  id: number
  authorId: number
  user: string
  avatar: string
  date: string
  rating: number
  comment: string
  helpful: number
}

interface Props {
  reviews: Review[]
  currentUserId?: number
  onReviewDeleted: (reviewId: number) => void
}

const ReviewItem = ({
  review,
  currentUserId,
  onDelete,
}: {
  review: Review
  currentUserId?: number
  onDelete: (reviewId: number) => void
}) => {
  const [showReplies, setShowReplies] = useState(false)
  const [replies, setReplies] = useState<ReviewReply[]>([])
  const [isLoadingReplies, setIsLoadingReplies] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)

  const isOwnReview = currentUserId === review.authorId

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteReview(review.id)
      onDelete(review.id)
    } catch (error) {
      console.error('Error al eliminar reseña:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleReplies = async () => {
    if (!showReplies && replies.length === 0) {
      setIsLoadingReplies(true)
      try {
        const repliesData = await getReviewRepliesByReviewId(review.id)
        setReplies(repliesData)
      } catch (error) {
        console.error('Error al cargar respuestas:', error)
      } finally {
        setIsLoadingReplies(false)
      }
    }
    setShowReplies(!showReplies)
  }

  const handleReplyClick = () => {
    if (!currentUserId) {
      alert('Debes iniciar sesión para responder')
      return
    }
    setShowReplyInput(!showReplyInput)
    setReplyContent('')
  }

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !currentUserId) return

    setIsSubmittingReply(true)
    try {
      const newReply = await createReviewReply({
        authorId: currentUserId,
        reviewId: review.id,
        content: replyContent.trim(),
      })
      setReplies(prev => [...prev, newReply])
      setReplyContent('')
      setShowReplyInput(false)
      if (!showReplies) {
        setShowReplies(true)
      }
    } catch (error) {
      console.error('Error al crear respuesta:', error)
      alert('Error al enviar la respuesta')
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const handleDeleteReply = async (replyId: number) => {
    try {
      await deleteReviewReply(replyId)
      setReplies(prev => prev.filter(r => r.id !== replyId))
    } catch (error) {
      console.error('Error al eliminar respuesta:', error)
      alert('Error al eliminar la respuesta')
    }
  }

  return (
    <div className="border-b border-border pb-4 last:border-b-0">
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
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {review.date}
              </span>
              {isOwnReview && (
                <Button
                  variant="secondary"
                  className="h-6! w-6! p-0! text-red-400! hover:bg-red-400/20!"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  title="Eliminar reseña"
                >
                  <Trash2 size={14} />
                </Button>
              )}
            </div>
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

          <p className="mb-2 text-sm text-muted-foreground">{review.comment}</p>

          <div className="flex items-center gap-2">
            <Button variant="text" className="h-6 px-2 text-xs">
              <Heart size={14} className="mr-1" />
              Útil ({review.helpful})
            </Button>
            <Button
              variant="text"
              className="h-6 px-2 text-xs"
              onClick={handleReplyClick}
            >
              <MessageCircle size={14} className="mr-1" />
              Responder
            </Button>
          </div>

          {showReplyInput && (
            <div className="mt-3 flex items-start gap-2">
              <Input
                icon={MessageCircleMore}
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="flex-1 text-xs"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmitReply()
                  }
                }}
              />
              <Button
                variant="secondary"
                className="h-8! w-8! p-0!"
                onClick={handleSubmitReply}
                disabled={!replyContent.trim() || isSubmittingReply}
              >
                <Send size={14} />
              </Button>
              <Button
                variant="secondary"
                className="h-8! w-8! p-0! text-red-400! hover:bg-red-400/20!"
                onClick={() => {
                  setShowReplyInput(false)
                  setReplyContent('')
                }}
              >
                <X size={14} />
              </Button>
            </div>
          )}

          <Button
            variant="text"
            className="mt-2 h-6 px-2 text-xs"
            onClick={handleToggleReplies}
          >
            {showReplies ? (
              <ChevronUp size={14} className="mr-1" />
            ) : (
              <ChevronDown size={14} className="mr-1" />
            )}
            {isLoadingReplies
              ? 'Cargando...'
              : showReplies
                ? 'Ocultar respuestas'
                : 'Ver respuestas'}
          </Button>

          {showReplies && replies.length > 0 && (
            <div className="mt-3 space-y-3 border-l-2 border-cyan-400/30 pl-4">
              {replies.map(reply => {
                const isOwnReply = currentUserId === reply.author.id
                return (
                  <div key={reply.id} className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-linear-to-r from-purple-500 to-pink-500 text-xs text-white">
                        {reply.author.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium">
                          {reply.author.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(reply.createdAt).toLocaleDateString(
                              'es-ES'
                            )}
                          </span>
                          {isOwnReply && (
                            <Button
                              variant="text"
                              className="h-6! w-6! p-0! text-red-400! hover:bg-red-400/20!"
                              onClick={() => handleDeleteReply(reply.id)}
                              title="Eliminar respuesta"
                            >
                              <Trash2 size={12} />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {showReplies && replies.length === 0 && !isLoadingReplies && (
            <p className="mt-2 text-xs text-muted-foreground">
              No hay respuestas aún
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export const PlanetReviews = ({
  reviews,
  currentUserId,
  onReviewDeleted,
}: Props) => {
  if (reviews.length === 0) {
    return (
      <Card>
        <div className="flex w-full flex-col gap-4 p-6">
          <Title>Reseñas de viajeros</Title>
          <p className="text-sm text-muted-foreground">
            Aún no hay reseñas para este destino. ¡Sé el primero en escribir una
            !
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>Reseñas de viajeros</Title>

        {reviews.map(review => (
          <ReviewItem
            key={review.id}
            review={review}
            currentUserId={currentUserId}
            onDelete={onReviewDeleted}
          />
        ))}

        <Button variant="text" className="holo-border mt-4 w-full">
          Ver todas las reseñas
        </Button>
      </div>
    </Card>
  )
}
