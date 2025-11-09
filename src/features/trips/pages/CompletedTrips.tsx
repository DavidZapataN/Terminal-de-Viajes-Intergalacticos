import { filterReservations } from '@/app/router/routes/trips/route'
import { TripInfoCard } from '../components/TripInfoCard'

export const CompletedTrips = () => {
  const reservations = filterReservations('completed')

  return (
    <div className="mt-5 flex w-full flex-1 flex-col gap-3">
      {reservations.map(reservation => (
        <TripInfoCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}
