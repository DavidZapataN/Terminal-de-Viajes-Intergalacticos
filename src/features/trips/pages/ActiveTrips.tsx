import { useAuthStore } from '@/app/stores/auth-store'
import { TripInfoCard } from '../components/TripInfoCard'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { useMemo } from 'react'

export const ActiveTrips = () => {
  const user = useAuthStore(state => state.user)
  const allReservations = useReservationsStore(state => state.reservations)

  const activeReservations = useMemo(
    () =>
      allReservations.filter(
        r =>
          ['confirmed', 'in_transit'].includes(r.status) &&
          r.userId === user?.id.toString()
      ),
    [allReservations, user?.id]
  )

  return (
    <div className="mt-5 flex w-full flex-1 flex-col gap-3">
      {activeReservations.map(reservation => (
        <TripInfoCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}
