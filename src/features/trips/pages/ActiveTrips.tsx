import { useTripsStore } from '@/app/stores/trips-store'
import { useAuthStore } from '@/app/stores/auth-store'
import { BookingCard } from '../components/BookingCard'
import { useMemo } from 'react'
import { Rocket } from 'lucide-react'

export const ActiveTrips = () => {
  const { bookings, fetchBookings } = useTripsStore()
  const user = useAuthStore(state => state.user)

  const refetch = () => {
    if (user?.id) fetchBookings(user.id)
  }

  const activeBookings = useMemo(
    () => bookings.filter(b => ['pending', 'confirmed'].includes(b.status)),
    [bookings]
  )

  if (activeBookings.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4 py-12 text-center">
        <Rocket className="h-16 w-16 text-gray-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            No tienes viajes activos
          </h3>
          <p className="text-sm text-gray-500">
            ¡Explora destinos y reserva tu próxima aventura intergaláctica!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-5 flex w-full flex-1 flex-col gap-4">
      {activeBookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          showCancelButton
          onCancelled={refetch}
        />
      ))}
    </div>
  )
}
