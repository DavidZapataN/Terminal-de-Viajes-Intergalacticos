import { Button } from '@/shared/components/Button'
import {
  Activity,
  ArrowLeft,
  Clock,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Share,
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
import { useEffect, useState, useMemo } from 'react'
import { getReviewsByDestinyId } from '@/app/services/review.service'
import type { Review as ReviewType } from '@/app/types/Review'

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
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)

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
  }, [planet])

  const handleBack = () => {
    navigate({ to: '/destinos' })
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
    user: review.author.name,
    avatar: '/api/placeholder/40/40',
    rating: review.rating,
    date: new Date(review.createdAt).toLocaleDateString('es-ES'),
    comment: review.content,
    helpful: review.likedByUsers.length,
  }))

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-5">
      <Button className="w-max" variant="text" onClick={handleBack}>
        <ArrowLeft className="mr-3" size={16} />
        Volver a explorar destinos
      </Button>

      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <PlanetDetailCard planet={planet} planetImages={planetImages} />
          <PlanetTechnicalSheet technicalData={technicalData} />
          {planet.activities.length > 0 && (
            <PlanetActivities detailedActivities={planet.activities} />
          )}
        </div>
        <div className="flex w-1/3 flex-col gap-4">
          <PlanetRatings planet={planet} />

          {!isLoadingReviews && <PlanetReviews reviews={formattedReviews} />}

          <Card>
            <div className="flex w-full flex-col gap-4 p-6">
              <Title>Acciones rápidas</Title>

              <Button
                variant="text"
                className="holo-border w-full justify-start"
              >
                <Heart size={18} className="mr-2" />
                Agregar a favoritos
              </Button>
              <Button
                variant="text"
                className="holo-border w-full justify-start"
              >
                <MessageCircle size={18} className="mr-2" />
                Escribir reseña
              </Button>
              <Button
                variant="text"
                className="holo-border w-full justify-start"
              >
                <Share size={18} className="mr-2" />
                Compartir destino
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
