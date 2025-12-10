import { Title } from '@/shared/components/Title'
import { Calendar, Loader2, Map } from 'lucide-react'
import { NavigationCard } from '../components/NavigationCard'
import { useNavigate } from '@tanstack/react-router'
import { InteractiveMap } from '../components/InteractiveMap'
import { Card } from '@/shared/components/Card'
import { RecentActivityCard } from '../components/RecentActivityCard'
import { Statistics } from '../components/Statistics'
import { useEffect, useState } from 'react'
import { getDestinies } from '@/app/services/destiny.service'
import { getStarships } from '@/app/services/starship.service'
import { getAllBookings } from '@/app/services/booking.service'
import { useAuthStore } from '@/app/stores/auth-store'
import type { Booking } from '@/app/types/api/booking/Booking'

const quickActions = [
  {
    id: 'explore',
    title: 'Explorar Destinos',
    subtitle: 'Descubre planetas',
    icon: Map,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'reservations',
    title: 'Mis Viajes',
    subtitle: 'Gestiona tus reservas',
    icon: Calendar,
    color: 'from-emerald-500 to-teal-500',
  },
]

export const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const user = useAuthStore(state => state.user)
  const isAdmin = useAuthStore(state => state.isAdmin)

  useEffect(() => {
    const loadData = async () => {
      try {
        const promises: Promise<unknown>[] = [getDestinies(), getStarships()]

        // Solo cargar todas las reservas si es admin
        if (isAdmin) {
          promises.push(getAllBookings().then(data => setAllBookings(data)))
        }

        await Promise.all(promises)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [isAdmin])

  const handleCardClick = (id: string) => {
    switch (id) {
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
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <span className="text-gray-400">Cargando terminal...</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 overflow-auto p-4 md:p-6">
      {/* Header */}
      <header className="flex w-full flex-col items-center gap-2 text-center">
        <Title className="text-xl md:text-2xl lg:text-3xl">
          Terminal de Viajes Intergalácticos
        </Title>
        <p className="max-w-md text-sm text-gray-400 md:text-base">
          Bienvenido de vuelta, {user?.name || 'Comandante'}. Listo para tu
          próxima aventura cósmica?
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Quick Actions & Map */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickActions.map(item => (
              <NavigationCard
                key={item.title}
                onClick={handleCardClick}
                {...item}
              />
            ))}
          </div>

          {/* Interactive Map */}
          <InteractiveMap />
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="flex flex-col gap-6">
          {/* Statistics */}
          <Statistics />

          {/* Recent Activity - Solo para Admin */}
          {isAdmin && (
            <Card className="w-full!">
              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <Title className="text-base">Actividad Global</Title>
                  <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
                    Admin
                  </span>
                </div>

                {allBookings.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-500">
                    No hay actividad reciente
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {allBookings.slice(0, 5).map(booking => (
                      <RecentActivityCard
                        key={booking.id}
                        title={booking.destiny?.name || 'Destino desconocido'}
                        description={`${booking.tickets?.length || 1} pasajero(s) - ${Number(booking.totalPrice).toLocaleString()} GC`}
                        status={booking.status}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
