import { Badge } from '@/shared/components/Bagde'
import { Card } from '@/shared/components/Card'
import { CircleCheckBig, CircleX, Clock4, Star } from 'lucide-react'

export interface ReservationOld {
  id: string
  destination: string
  departureDate: string
  returnDate: string
  status: 'confirmed' | 'in_transit' | 'completed' | 'cancelled'
  ship: string
  cabin: string
}

interface Props {
  reservation: ReservationOld
}

const status = {
  confirmed: {
    name: 'Confirmado',
    icon: <CircleCheckBig size={16} />,
    style: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  in_transit: {
    name: 'Pendiente',
    icon: <Clock4 size={16} />,
    style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  completed: {
    name: 'Completado',
    icon: <Star size={16} />,
    style: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  cancelled: {
    name: 'Cancelado',
    icon: <CircleX size={16} />,
    style: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
}

export const ReservationCard = ({ reservation }: Props) => {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-5">
        <header className="flex items-center justify-between">
          <h3>{reservation.destination}</h3>
          <Badge className={status[reservation.status].style}>
            {status[reservation.status].icon}
            <span className="ml-1.5">{status[reservation.status].name}</span>
          </Badge>
        </header>

        <p className="mb-2 text-sm text-gray-400">
          {reservation.departureDate} -- {reservation.returnDate}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Nave:</span>
            {reservation.ship}
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Cabaña:</span>
            {reservation.cabin}
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Reserva:</span>
            <span className="font-medium text-cyan-400">{reservation.id}</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
