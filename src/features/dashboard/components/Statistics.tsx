import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import { getBookingsByUser } from '@/app/services/booking.service'
import { useAuthStore } from '@/app/stores/auth-store'
import { useDestinyStore } from '@/app/stores/destiny-store'
import { useEffect, useState, useMemo } from 'react'
import type { Booking } from '@/app/types/api/booking/Booking'
import { CheckCircle, Globe, Loader2, PlaneTakeoff, Wallet } from 'lucide-react'

export const Statistics = () => {
  const user = useAuthStore(state => state.user)
  const destinies = useDestinyStore(state => state.destinies)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return
      try {
        const data = await getBookingsByUser(user.id)
        setBookings(data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBookings()
  }, [user?.id])

  const stats = useMemo(() => {
    const completedTrips = bookings.filter(b => b.status === 'completed').length
    const activeTrips = bookings.filter(b =>
      ['pending', 'confirmed'].includes(b.status)
    ).length
    const totalSpent = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + Number(b.totalPrice), 0)
    const uniqueDestinations = new Set(bookings.map(b => b.destiny?.id)).size

    return [
      {
        label: 'Viajes Activos',
        value: activeTrips,
        icon: PlaneTakeoff,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
      },
      {
        label: 'Completados',
        value: completedTrips,
        icon: CheckCircle,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
      },
      {
        label: 'Total Gastado',
        value: `${(totalSpent / 1000).toFixed(0)}K GC`,
        icon: Wallet,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
      },
      {
        label: 'Destinos Visitados',
        value: `${uniqueDestinations}/${destinies.length}`,
        icon: Globe,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
      },
    ]
  }, [bookings, destinies.length])

  if (isLoading) {
    return (
      <Card className="w-full!">
        <div className="flex items-center justify-center gap-2 p-8">
          <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
          <span className="text-sm text-gray-400">
            Cargando estadísticas...
          </span>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full!">
      <div className="flex flex-col gap-4 p-5">
        <Title className="text-base">Mis Estadísticas</Title>

        <div className="grid grid-cols-2 gap-3">
          {stats.map(stat => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 rounded-xl ${stat.bgColor} p-4 transition-all hover:scale-[1.02]`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-center text-xs text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
