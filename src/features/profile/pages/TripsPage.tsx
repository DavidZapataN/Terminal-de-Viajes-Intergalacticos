import { Button } from '@/shared/components/Button'
import { Plane } from 'lucide-react'
import {
  ReservationCard,
  type ReservationInfo,
} from '../components/ReservationCard'

const mockReservations: ReservationInfo[] = [
  {
    id: 'RES-001',
    destination: 'Kepler-442b',
    departureDate: '2024-12-15',
    returnDate: '2024-12-22',
    status: 'confirmed',
    ship: 'Stellar Voyager',
    cabin: 'Premium',
  },
  {
    id: 'RES-002',
    destination: 'Proxima Centauri b',
    departureDate: '2024-11-28',
    returnDate: '2024-12-05',
    status: 'completed',
    ship: 'Galaxy Explorer',
    cabin: 'Lujo Imperial',
  },
  {
    id: 'RES-003',
    destination: 'TRAPPIST-1e',
    departureDate: '2025-01-10',
    returnDate: '2025-01-17',
    status: 'pending',
    ship: 'Nebula Cruiser',
    cabin: 'Económica',
  },
]

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
