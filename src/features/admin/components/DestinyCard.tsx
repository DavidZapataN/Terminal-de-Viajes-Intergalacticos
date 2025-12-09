import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Badge } from '@/shared/components/Bagde'
import {
  Edit,
  Trash2,
  MapPin,
  Users,
  DollarSign,
  Thermometer,
} from 'lucide-react'
import type { Destiny } from '@/app/types/Destiny'

interface Props {
  destiny: Destiny
  onEdit: (destiny: Destiny) => void
  onDelete: (destinyId: number) => void
}

const atmosphereConfig = {
  breathable: {
    label: 'Respirable',
    style: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  'not breathable': {
    label: 'No respirable',
    style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  toxic: {
    label: 'Tóxica',
    style: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  none: {
    label: 'Sin atmósfera',
    style: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  },
}

export const DestinyCard = ({ destiny, onEdit, onDelete }: Props) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="h-48 w-full md:h-auto md:w-64">
          <img
            src={destiny.images[0]}
            alt={destiny.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {destiny.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} />
                <span>{destiny.system}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="text"
                onClick={() => onEdit(destiny)}
                className="p-2! text-cyan-400! hover:text-cyan-300!"
              >
                <Edit size={18} />
              </Button>
              <Button
                variant="text"
                onClick={() => onDelete(destiny.id)}
                className="p-2! text-red-400! hover:bg-red-400/20!"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-gray-400">
            {destiny.description}
          </p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Temperatura</p>
                <p className="text-sm font-medium">
                  {destiny.averageTemperature}°C
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Población</p>
                <p className="text-sm font-medium">
                  {destiny.population.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Distancia</p>
                <p className="text-sm font-medium">
                  {destiny.distance.toLocaleString()} M km
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Precio</p>
                <p className="text-sm font-medium">
                  ${destiny.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={atmosphereConfig[destiny.atmosphere].style}>
              {atmosphereConfig[destiny.atmosphere].label}
            </Badge>
            <Badge className="border-cyan-400/30 bg-cyan-500/20 text-cyan-400">
              {destiny.activities.length} actividades
            </Badge>
            <Badge className="border-purple-400/30 bg-purple-500/20 text-purple-400">
              Gravedad: {destiny.gravity}g
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}
