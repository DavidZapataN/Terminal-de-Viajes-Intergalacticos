import { useAuthStore } from '@/app/stores/auth-store'
import { TripInfoCard } from '../components/TripInfoCard'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { useMemo } from 'react'

export const CanceledTrips = () => {
  const user = useAuthStore(state => state.currentUser)
  const allReservations = useReservationsStore(state => state.reservations)

  const canceledReservations = useMemo(
    () =>
      allReservations.filter(
        r => r.status === 'cancelled' && r.userId === user?.id
      ),
    [allReservations, user?.id]
  )

  return (
    <div className="mt-5 flex w-full flex-1 flex-col gap-3">
      {canceledReservations.map(reservation => (
        <TripInfoCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}
