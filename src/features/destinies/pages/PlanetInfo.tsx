import { mockPlanets } from '@/db/mockData'
import { Button } from '@/shared/components/Button'
import {
  Activity,
  ArrowLeft,
  Clock,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Mountain,
  Share,
  Thermometer,
  Trees,
  Users,
  Waves,
} from 'lucide-react'
import { PlanetDetailCard } from '../components/PlanetDetailCard'
import {
  PlanetTechnicalSheet,
  type TechnicalData,
} from '../components/PlanetTechnicalSheet'
import { PlanetActivities } from '../components/PlanetActivities'
import { PlanetRatings } from '../components/PlanetRatings'
import { PlanetReviews, type Review } from '../components/PlanetReviews'
import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'

export const PlanetInfo = () => {
  const planet = mockPlanets.find(p => p.id === 'kepler-442b') || mockPlanets[0]

  // Mock additional images for carousel
  const planetImages = [
    planet.image,
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    'https://images.unsplash.com/photo-1518066000-4b1b4adefcb4?w=800',
  ]

  // Mock technical data
  const technicalData: TechnicalData[] = [
    { label: 'Gravedad', value: '0.8g', icon: Activity },
    { label: 'Atmósfera', value: 'Respirable', icon: Globe },
    { label: 'Ciclo Día/Noche', value: '28h estándar', icon: Clock },
    { label: 'Población', value: '2.4 billones', icon: Users },
    { label: 'Temperatura Media', value: '22°C', icon: Thermometer },
    { label: 'Distancia', value: `${planet.distance} años luz`, icon: MapPin },
  ]

  // Mock activities with more detail
  const detailedActivities = [
    {
      name: planet.activities[0] || 'Exploración',
      description:
        'Descubre paisajes únicos y formaciones geológicas inexploradas',
      difficulty: 'Moderado',
      duration: '4-6 horas',
      price: 2500,
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      icon: Mountain,
    },
    {
      name: planet.activities[1] || 'Aventura Acuática',
      description:
        'Sumérgete en océanos alienígenas con vida marina bioluminiscente',
      difficulty: 'Fácil',
      duration: '2-3 horas',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      icon: Waves,
    },
    {
      name: planet.activities[2] || 'Safari Alienígena',
      description:
        'Observa la fauna local en su hábitat natural con guías especializados',
      difficulty: 'Fácil',
      duration: '5-7 horas',
      price: 3200,
      image:
        'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400',
      icon: Trees,
    },
  ]

  // Mock reviews
  const reviews: Review[] = [
    {
      id: 1,
      user: 'Comandante Stellar',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      date: '2025-09-15',
      comment:
        '¡Increíble experiencia! Los paisajes son realmente de otro mundo. La bioluminiscencia nocturna es algo que nunca olvidaré.',
      helpful: 24,
    },
    {
      id: 2,
      user: 'Exploradora Nova',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      date: '2025-09-10',
      comment:
        'Excelente destino para relajarse. Las actividades acuáticas son perfectas para familias. Recomiendo quedarse al menos 5 días.',
      helpful: 18,
    },
    {
      id: 3,
      user: 'Piloto Cosmic',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      date: '2025-09-05',
      comment:
        'La mejor experiencia gastronómica galáctica que he tenido. Los guías locales conocen lugares secretos increíbles.',
      helpful: 31,
    },
  ]

  const ratingDistribution = [
    { stars: 5, count: 1847, percentage: 65 },
    { stars: 4, count: 724, percentage: 25 },
    { stars: 3, count: 203, percentage: 7 },
    { stars: 2, count: 58, percentage: 2 },
    { stars: 1, count: 29, percentage: 1 },
  ]

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-5">
      <Button className="w-max" variant="text">
        <ArrowLeft className="mr-3" size={16} />
        Volver a explorar planetas
      </Button>

      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <PlanetDetailCard planet={planet} planetImages={planetImages} />
          <PlanetTechnicalSheet technicalData={technicalData} />
          <PlanetActivities detailedActivities={detailedActivities} />
        </div>
        <div className="flex w-1/3 flex-col gap-4">
          <PlanetRatings
            planet={planet}
            ratingDistribution={ratingDistribution}
          />
          <PlanetReviews reviews={reviews} />

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
