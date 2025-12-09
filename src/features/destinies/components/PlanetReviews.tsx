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
  likeReview,
  unlikeReview,
} from '@/app/services/review.service'
import type { ReviewReply } from '@/app/types/ReviewReply'
import { Input } from '@/shared/components/Input'
import { showWarning, showError, showSuccess } from '@/lib/toast.config'

export interface Review {
  id: number
  authorId: number
  user: string
  avatar: string
  date: string
  rating: number
  comment: string
  likedByUsers: number[]
}

interface Props {
  reviews: Review[]
  currentUserId?: number
  isLoading?: boolean
  onReviewDeleted: (reviewId: number) => void
  onReviewLikesUpdated: (reviewId: number, likedByUsers: number[]) => void
}

const ReviewItem = ({
  review,
  currentUserId,
  onDelete,
  onLikesUpdated,
}: {
  review: Review
  currentUserId?: number
  onDelete: (reviewId: number) => void
  onLikesUpdated: (reviewId: number, likedByUsers: number[]) => void
}) => {
  const [showReplies, setShowReplies] = useState(false)
  const [replies, setReplies] = useState<ReviewReply[]>([])
  const [isLoadingReplies, setIsLoadingReplies] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)
  const [isTogglingLike, setIsTogglingLike] = useState(false)

  const isOwnReview = currentUserId === review.authorId
  const isLiked = currentUserId
    ? review.likedByUsers.includes(currentUserId)
    : false

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteReview(review.id)
      onDelete(review.id)
      showSuccess('Reseña eliminada correctamente')
    } catch (error) {
      console.error('Error al eliminar reseña:', error)
      showError('Error al eliminar la reseña')
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
      showWarning('Debes iniciar sesión para responder')
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
      showSuccess('Respuesta publicada correctamente')
    } catch (error) {
      console.error('Error al crear respuesta:', error)
      showError('Error al enviar la respuesta')
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const handleDeleteReply = async (replyId: number) => {
    try {
      await deleteReviewReply(replyId)
      setReplies(prev => prev.filter(r => r.id !== replyId))
      showSuccess('Respuesta eliminada correctamente')
    } catch (error) {
      console.error('Error al eliminar respuesta:', error)
      showError('Error al eliminar la respuesta')
    }
  }

  const handleToggleLike = async () => {
    if (!currentUserId) {
      showWarning('Debes iniciar sesión para dar like')
      return
    }

    setIsTogglingLike(true)
    try {
      const response = isLiked
        ? await unlikeReview(review.id)
        : await likeReview(review.id)
      onLikesUpdated(review.id, response.likedByUsers)
    } catch (error) {
      console.error('Error al actualizar like:', error)
      showError('Error al actualizar el like')
    } finally {
      setIsTogglingLike(false)
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
            <Button
              variant="text"
              className={`h-6 px-2 text-xs ${isLiked ? 'text-red-400' : ''}`}
              onClick={handleToggleLike}
              disabled={isTogglingLike}
            >
              <Heart
                size={14}
                className={`mr-1 ${isLiked ? 'fill-current' : ''}`}
              />
              Útil ({review.likedByUsers.length})
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
  isLoading = false,
  onReviewDeleted,
  onReviewLikesUpdated,
}: Props) => {
  const [showAll, setShowAll] = useState(false)
  const REVIEWS_LIMIT = 10

  const displayedReviews = showAll ? reviews : reviews.slice(0, REVIEWS_LIMIT)
  const hasMoreReviews = reviews.length > REVIEWS_LIMIT

  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>
          Reseñas de viajeros{' '}
          {!isLoading && reviews.length > 0 && `(${reviews.length})`}
        </Title>

        {isLoading ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Cargando reseñas...
          </p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay reseñas para este destino. ¡Sé el primero en escribir
            una!
          </p>
        ) : (
          <>
            {displayedReviews.map(review => (
              <ReviewItem
                key={review.id}
                review={review}
                currentUserId={currentUserId}
                onDelete={onReviewDeleted}
                onLikesUpdated={onReviewLikesUpdated}
              />
            ))}

            {hasMoreReviews && (
              <Button
                variant="text"
                className="holo-border mt-4 w-full"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll
                  ? 'Ver menos reseñas'
                  : `Ver todas las reseñas (${reviews.length - REVIEWS_LIMIT} más)`}
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  )
}
