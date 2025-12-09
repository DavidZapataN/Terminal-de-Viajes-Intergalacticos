import { ReservationCard } from '../components/ReservationCard'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { useAuthStore } from '@/app/stores/auth-store'
import { useMemo } from 'react'
import { Button } from '@/shared/components/Button'
import { Plane } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export const Trips = () => {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const allReservations = useReservationsStore(state => state.reservations)

  const reservations = useMemo(
    () => allReservations.filter(r => r.userId === user?.id.toString()),
    [allReservations, user?.id]
  )

  const handleNewTrip = () => {
    navigate({ to: '/destinos' })
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-cyan-400"> Historial de Viajes </h2>

        <Button
          className="text-gray-800! active:scale-95"
          onClick={handleNewTrip}
        >
          <Plane className="mr-3" size={16} />
          Nuevo Viaje
        </Button>
      </header>

      {reservations.map(reservation => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}
