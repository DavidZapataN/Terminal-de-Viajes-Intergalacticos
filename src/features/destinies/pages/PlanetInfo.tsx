import { Button } from '@/shared/components/Button'
import {
  Activity,
  ArrowLeft,
  Clock,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Thermometer,
  Users,
} from 'lucide-react'
import { PlanetDetailCard } from '../components/PlanetDetailCard'
import {
  PlanetTechnicalSheet,
  type TechnicalData,
} from '../components/PlanetTechnicalSheet'
import { PlanetActivities } from '../components/PlanetActivities'
import { PlanetRatings } from '../components/PlanetRatings'
import { PlanetReviews } from '../components/PlanetReviews'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useDestinyStore } from '@/app/stores/destiny-store'
import { useAuthStore } from '@/app/stores/auth-store'
import { useEffect, useState, useMemo } from 'react'
import {
  getReviewsByDestinyId,
  createReview,
} from '@/app/services/review.service'
import {
  getDestinyReviewSummary,
  likeDestiny,
  unlikeDestiny,
} from '@/app/services/destiny.service'
import type { Review as ReviewType } from '@/app/types/Review'
import type { CreateReview } from '@/app/types/api/review/CreateReview'
import { CreateReviewModal } from '../components/CreateReviewModal'
import { showWarning, showError, showSuccess } from '@/lib/toast.config'

const atmosphereName = {
  breathable: 'Respirable',
  'not breathable': 'No respirable',
  toxic: 'Tóxica',
  none: 'Sin atmósfera',
}

export const PlanetInfo = () => {
  const navigate = useNavigate()
  const { destinoId } = useParams({ from: '/destinos/$destinoId' })
  const destinies = useDestinyStore(state => state.destinies)
  const isLoadingDestinies = useDestinyStore(state => state.isLoading)
  const updateDestinyReviewSummary = useDestinyStore(
    state => state.updateDestinyReviewSummary
  )
  const currentUser = useAuthStore(state => state.user)
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)
  const [isTogglingDestinyLike, setIsTogglingDestinyLike] = useState(false)

  const planet = useMemo(() => {
    return destinies.find(d => d.id === parseInt(destinoId))
  }, [destinies, destinoId])

  useEffect(() => {
    const loadReviews = async () => {
      if (!planet) return

      setIsLoadingReviews(true)
      try {
        const reviewsData = await getReviewsByDestinyId(planet.id)
        setReviews(reviewsData)
      } catch (error) {
        console.error('Error al cargar reviews:', error)
      } finally {
        setIsLoadingReviews(false)
      }
    }

    loadReviews()
  }, [planet?.id])

  const handleBack = () => {
    navigate({ to: '/destinos' })
  }

  const handleCreateReview = async (reviewData: CreateReview) => {
    try {
      const newReview = await createReview(reviewData)
      setReviews(prev => [newReview, ...prev])
      showSuccess('Reseña publicada correctamente')

      if (planet) {
        try {
          const updatedSummary = await getDestinyReviewSummary(planet.id)
          updateDestinyReviewSummary(planet.id, updatedSummary)
        } catch (error) {
          console.error('Error al actualizar el resumen de reseñas:', error)
        }
      }
    } catch (error) {
      console.error('Error al crear reseña:', error)
      showError('Error al publicar la reseña')
    }
  }

  const handleReviewDeleted = async (reviewId: number) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId))

    if (planet) {
      try {
        const updatedSummary = await getDestinyReviewSummary(planet.id)
        updateDestinyReviewSummary(planet.id, updatedSummary)
      } catch (error) {
        console.error('Error al actualizar el resumen de reseñas:', error)
      }
    }
  }

  const handleReviewLikesUpdated = (
    reviewId: number,
    likedByUsers: number[]
  ) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, likedByUsers } : r))
    )
  }

  const handleToggleDestinyLike = async () => {
    if (!currentUser || !planet) {
      showWarning('Debes iniciar sesión para agregar a favoritos')
      return
    }

    setIsTogglingDestinyLike(true)
    try {
      const userId = currentUser.id
      const isLiked = planet.likedByUsers.includes(userId)

      if (isLiked) {
        await unlikeDestiny(planet.id)
        showSuccess('Eliminado de favoritos')
      } else {
        await likeDestiny(planet.id)
        showSuccess('Agregado a favoritos')
      }
    } catch (error) {
      console.error('Error al actualizar favoritos:', error)
      showError('Error al actualizar favoritos')
    } finally {
      setIsTogglingDestinyLike(false)
    }
  }

  const handleOpenReviewModal = () => {
    if (!currentUser) {
      showWarning('Debes iniciar sesión para escribir una reseña')
      return
    }
    setShowCreateReviewModal(true)
  }

  if (isLoadingDestinies) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-5">
        <Globe size={64} className="animate-spin text-cyan-400" />
        <h2>Cargando destino...</h2>
        <p className="text-gray-400">
          Estamos obteniendo la información del destino
        </p>
      </div>
    )
  }

  if (!planet) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-5">
        <Globe size={64} className="text-gray-400" />
        <h2>Destino no encontrado</h2>
        <p className="text-gray-400">
          El destino que buscas no existe en nuestra base de datos
        </p>
        <Button onClick={handleBack}>Volver a explorar destinos</Button>
      </div>
    )
  }

  const planetImages =
    planet.images.length > 0
      ? planet.images
      : ['https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800']

  const technicalData: TechnicalData[] = [
    { label: 'Gravedad', value: `${planet.gravity}g`, icon: Activity },
    {
      label: 'Atmósfera',
      value: atmosphereName[planet.atmosphere],
      icon: Globe,
    },
    {
      label: 'Ciclo Día/Noche',
      value: `${planet.dayNightCycle}h estándar`,
      icon: Clock,
    },
    {
      label: 'Población',
      value: planet.population.toLocaleString(),
      icon: Users,
    },
    {
      label: 'Temperatura Media',
      value: `${planet.averageTemperature}°C`,
      icon: Thermometer,
    },
    { label: 'Distancia', value: `${planet.distance} años luz`, icon: MapPin },
  ]

  const formattedReviews = reviews.map(review => ({
    id: review.id,
    authorId: review.author.id,
    user: review.author.name,
    avatar: '/api/placeholder/40/40',
    rating: review.rating,
    date: new Date(review.createdAt).toLocaleDateString('es-ES'),
    comment: review.content,
    likedByUsers: review.likedByUsers,
  }))

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 overflow-auto p-4 md:p-5">
      <Button className="w-max" variant="text" onClick={handleBack}>
        <ArrowLeft className="mr-3" size={16} />
        <span className="hidden sm:inline">Volver a explorar destinos</span>
        <span className="sm:hidden">Volver</span>
      </Button>

      {/* Main Grid - 1 col mobile, 3 cols desktop */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left Column - Planet Details */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <PlanetDetailCard planet={planet} planetImages={planetImages} />
          <PlanetTechnicalSheet technicalData={technicalData} />
          {planet.activities.length > 0 && (
            <PlanetActivities detailedActivities={planet.activities} />
          )}
        </div>

        {/* Right Column - Ratings, Reviews & Actions */}
        <div className="flex flex-col gap-4">
          {/* Quick Actions - Mobile: at top, Desktop: at bottom */}
          <Card className="order-first lg:order-last">
            <div className="flex w-full flex-col gap-3 p-4 md:p-6">
              <Title className="text-base">Acciones rápidas</Title>

              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                <Button
                  variant="text"
                  className={`holo-border flex-1 justify-start ${
                    currentUser && planet.likedByUsers.includes(currentUser.id)
                      ? 'text-red-400'
                      : ''
                  }`}
                  onClick={handleToggleDestinyLike}
                  disabled={isTogglingDestinyLike}
                >
                  <Heart
                    size={18}
                    className={`mr-2 ${
                      currentUser &&
                      planet.likedByUsers.includes(currentUser.id)
                        ? 'fill-current'
                        : ''
                    }`}
                  />
                  {currentUser && planet.likedByUsers.includes(currentUser.id)
                    ? 'Quitar de favoritos'
                    : 'Agregar a favoritos'}
                </Button>
                <Button
                  variant="text"
                  className="holo-border flex-1 justify-start"
                  onClick={handleOpenReviewModal}
                >
                  <MessageCircle size={18} className="mr-2" />
                  Escribir reseña
                </Button>
              </div>
            </div>
          </Card>

          <PlanetRatings planet={planet} />

          <PlanetReviews
            reviews={formattedReviews}
            currentUserId={currentUser?.id}
            onReviewDeleted={handleReviewDeleted}
            onReviewLikesUpdated={handleReviewLikesUpdated}
            isLoading={isLoadingReviews}
          />
        </div>
      </div>

      {showCreateReviewModal && currentUser && (
        <CreateReviewModal
          destinyId={planet.id}
          userId={currentUser.id}
          onClose={() => setShowCreateReviewModal(false)}
          onSubmit={handleCreateReview}
        />
      )}
    </div>
  )
}
