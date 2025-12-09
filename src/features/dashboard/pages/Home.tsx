import { Title } from '@/shared/components/Title'
import { Calendar, Map, Rocket } from 'lucide-react'
import { NavigationCard } from '../components/NavigationCard'
import { useNavigate } from '@tanstack/react-router'
import { InteractiveMap } from '../components/InteractiveMap'
import { Card } from '@/shared/components/Card'
import { mockReservationsAdmin } from '@/db/mockData'
import { RecentActivityCard } from '../components/RecentActivityCard'
import { Statistics } from '../components/Statistics'
import { useEffect, useState } from 'react'
import { getDestinies } from '@/app/services/destiny.service'
import { getStarships } from '@/app/services/starship.service'

const quickActions = [
  {
    id: 'booking',
    title: 'Reservar Viaje',
    subtitle: 'Explora nuevos mundos',
    icon: Rocket,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'explore',
    title: 'Explorar Destinos',
    subtitle: 'Descubre planetas',
    icon: Map,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'reservations',
    title: 'Mis Reservas',
    subtitle: 'Gestiona tus viajes',
    icon: Calendar,
    color: 'from-emerald-500 to-teal-500',
  },
]

export const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const planets: any[] = []

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([getDestinies(), getStarships()])
      } catch (error) {
        console.error('Error loading admin data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleCardClick = (id: string) => {
    switch (id) {
      case 'booking':
        navigate({ to: '/reservas' })
        break
      case 'explore':
        navigate({ to: '/destinos' })
        break
      case 'reservations':
        navigate({ to: '/viajes' })
        break
      default:
        break
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="animate-pulse text-lg text-gray-500">...</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2.5 p-5">
      <header className="flex w-full flex-col items-center gap-4">
        <Title className="text-2xl">Terminal de Viajes Intergalácticos</Title>
        <p className="text-gray-400">
          Bienvenido de vuelta, Comandante. Listo para tu próxima aventura
          cósmica?
        </p>
      </header>

      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-5">
            {quickActions.map(item => (
              <NavigationCard
                key={item.title}
                onClick={handleCardClick}
                {...item}
              />
            ))}
          </div>

          <InteractiveMap />
        </div>

        <div className="flex w-full flex-col gap-4">
          <Statistics />

          <Card className="w-full!">
            <div className="flex flex-col gap-5 p-5">
              <Title>Actividad Reciente</Title>

              {mockReservationsAdmin.slice(0, 3).map(reservation => {
                const planet = planets.find(
                  p => p.id === reservation.planetId
                )
                return (
                  <RecentActivityCard
                    title={planet?.name || ''}
                    description={`${reservation.passengers} pasajero(s) - ${reservation.totalCost.toLocaleString()} GC`}
                    status={reservation.status}
                  />
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
