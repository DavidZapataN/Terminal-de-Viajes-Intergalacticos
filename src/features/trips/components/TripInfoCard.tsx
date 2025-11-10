import type { Reservation } from '@/app/types/Reservation'
import { mockPlanets, mockSpaceships } from '@/db/mockData'
import { Badge } from '@/shared/components/Bagde'
import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import {
  Calendar,
  CircleCheckBig,
  CircleX,
  Clock4,
  Rocket,
  Star,
} from 'lucide-react'

interface Props {
  reservation: Reservation
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

export const TripInfoCard = ({ reservation }: Props) => {
  const planet = mockPlanets.find(p => p.id === reservation.planetId)
  const ship = mockSpaceships.find(s => s.id === reservation.shipId)

  return (
    <Card className="h-max !w-full">
      <div className="flex w-full flex-col gap-2.5 p-6">
        <div className="flex gap-4">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={planet?.image || ''}
              alt={planet?.name || ''}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-2">
            <header className="flex items-center justify-between">
              <h3>{planet?.name}</h3>
              <Badge className={status[reservation.status].style}>
                {status[reservation.status].icon}
                <span className="ml-1.5">
                  {status[reservation.status].name}
                </span>
              </Badge>
            </header>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Código:</span>
                <code className="rounded bg-accent px-2 py-1 font-mono text-sm text-cyan-400">
                  {reservation.id.toUpperCase()}
                </code>
              </div>
              <div className="text-lg text-cyan-400">
                {reservation.totalCost.toLocaleString()} GC
              </div>
            </div>

            <p className="mb-2 text-sm text-gray-400">{planet?.system}</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <p className="flex items-center gap-2.5 text-sm">
                <Rocket size={16} className="text-emerald-400" />
                <span>{ship?.name}</span>
              </p>

              {/* <p className="flex items-center gap-2.5 text-sm">
                <Users size={16} className="text-purple-400" />
                <span>
                  {reservation.passengers}
                  {reservation.passengers === 1 ? ' pasajero' : ' pasajeros'}
                </span>
              </p> */}

              <p className="flex items-center gap-2.5 text-sm">
                <Calendar size={16} className="text-cyan-400" />
                <div className="flex gap-2">
                  <div>
                    Salida:{' '}
                    {new Date(reservation.departureDate).toLocaleDateString()}
                  </div>
                  -
                  <div>
                    Regreso:{' '}
                    {new Date(reservation.returnDate).toLocaleDateString()}
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="mt-4 flex gap-2 border-t border-border pt-4">
          <Button className="holo-border text-sm" variant="secondary">
            <Download size={16} className="mr-3" />
            Boleto
          </Button>
          <Button className="holo-border text-sm" variant="secondary">
            <Edit size={16} className="mr-3" />
            Modificar
          </Button>

          <Button
            className="holo-border text-sm !text-red-400 hover:!text-white"
            variant="secondary"
          >
            <Trash2 size={16} className="mr-3" />
            Cancelar
          </Button>
        </div> */}
      </div>
    </Card>
  )
}
