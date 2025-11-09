import { Button } from '@/shared/components/Button'
import { Plane } from 'lucide-react'
import { ReservationCard } from '../components/ReservationCard'
import { mockReservations } from '@/db/mockData'

export const Trips = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-cyan-400"> Historial de Viajes </h2>

        <Button className="!text-gray-800 active:scale-95">
          <Plane className="mr-3" size={16} />
          Nuevo Viaje
        </Button>
      </header>

      {mockReservations.map(reservation => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}
