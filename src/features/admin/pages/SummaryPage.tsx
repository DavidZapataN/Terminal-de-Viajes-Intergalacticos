import { Rocket, Users, Globe, TrendingUp, Loader2 } from 'lucide-react'
import { SummaryCard } from '../components/SummaryCard'
import { Card } from '../../../shared/components/Card'
import { RecentActivityCard } from '../components/RecentActivityCard'
import { useMemo, useEffect, useState } from 'react'
import { useStarshipsStore } from '@/app/stores/starship-store'
import { useDestinyStore } from '@/app/stores/destiny-store'
import { getAllBookings } from '@/app/services/booking.service'
import type { Booking } from '@/app/types/api/booking/Booking'

export const Summary = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const activeShips = useStarshipsStore(
    state => state.starships.filter(ship => ship.status === 'active').length
  )
  const destiniesCount = useDestinyStore(state => state.destinies.length)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings()
        setBookings(data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const totalReservations = bookings.length
  const revenue = useMemo(
    () =>
      bookings
        .filter(b => b.status !== 'cancelled')
        .reduce((sum, b) => sum + Number(b.totalPrice), 0),
    [bookings]
  )

  const data = useMemo(
    () => [
      {
        title: 'Naves Activas',
        count: activeShips,
        icon: Rocket,
        color: '#00d3f3',
      },
      {
        title: 'Reservas totales',
        count: totalReservations,
        icon: Users,
        color: '#c27aff',
      },
      {
        title: 'Ingresos (GC)',
        count: revenue,
        icon: TrendingUp,
        color: '#00d492',
      },
      {
        title: 'Planetas',
        count: destiniesCount,
        icon: Globe,
        color: '#fdc700',
      },
    ],
    [activeShips, totalReservations, revenue, destiniesCount]
  )

  if (isLoading) {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 py-12">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
        <span className="text-gray-400">Cargando datos...</span>
      </div>
    )
  }

  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.map(item => (
          <SummaryCard
            key={item.title}
            title={item.title}
            count={item.count}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-5 p-5">
          <h2 className="text-cyan-400">Actividad Reciente</h2>

          {bookings.length === 0 ? (
            <p className="text-gray-500">No hay reservas registradas</p>
          ) : (
            bookings
              .slice(0, 5)
              .map(booking => (
                <RecentActivityCard
                  key={booking.id}
                  title={`Nueva reserva a ${booking.destiny?.name || 'Destino desconocido'}`}
                  description={`${Number(booking.totalPrice).toLocaleString()} GC`}
                  status={booking.status}
                />
              ))
          )}
        </div>
      </Card>
    </div>
  )
}
