import { ReservationCard } from '../components/ReservationCard'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { useAuthStore } from '@/app/stores/auth-store'
import { useMemo } from 'react'

export const Trips = () => {
  const user = useAuthStore(state => state.currentUser)
  const allReservations = useReservationsStore(state => state.reservations)

  const reservations = useMemo(
    () => allReservations.filter(r => r.userId === user?.id),
    [allReservations, user?.id]
  )

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-cyan-400"> Historial de Viajes </h2>

        {/* <Button className="!text-gray-800 active:scale-95">
          <Plane className="mr-3" size={16} />
          Nuevo Viaje
        </Button> */}
      </header>

      {reservations.map(reservation => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}
