import { useTripsStore } from '@/app/stores/trips-store'
import { BookingCard } from '../components/BookingCard'
import { useMemo } from 'react'
import { CircleX } from 'lucide-react'

export const CanceledTrips = () => {
  const { bookings } = useTripsStore()

  const cancelledBookings = useMemo(
    () => bookings.filter(b => b.status === 'cancelled'),
    [bookings]
  )

  if (cancelledBookings.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CircleX className="h-16 w-16 text-gray-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            No tienes viajes cancelados
          </h3>
          <p className="text-sm text-gray-500">
            Los viajes que canceles aparecerán aquí
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-5 flex w-full flex-1 flex-col gap-4">
      {cancelledBookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  )
}
