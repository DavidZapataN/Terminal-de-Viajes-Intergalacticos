import { TripInfoCard } from '../components/TripInfoCard'
import { filterReservations } from '@/app/router/routes/trips/route'

export const ActiveTrips = () => {
  const reservations = filterReservations('active')

  return (
    <div className="mt-5 flex w-full flex-1 flex-col gap-3">
      {reservations.map(reservation => (
        <TripInfoCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}
