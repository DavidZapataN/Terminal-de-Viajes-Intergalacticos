import { Badge } from '@/shared/components/Bagde'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table'
import { Edit, Trash2, Wrench } from 'lucide-react'

export interface Spaceship {
  id: string
  name: string
  class: string
  capacity: number
  speed: number
  status: 'active' | 'maintenance' | 'unavailable'
  amenities: string[]
}

const mockSpaceships: Spaceship[] = [
  {
    id: 'starweaver',
    name: 'Starweaver',
    class: 'Crucero Galáctico',
    capacity: 500,
    speed: 9.8,
    status: 'active',
    amenities: [
      'Spa cuántico',
      'Holodeck',
      'Casino gravitacional',
      'Restaurante molecular',
    ],
  },
  {
    id: 'void-runner',
    name: 'Void Runner',
    class: 'Explorador Rápido',
    capacity: 150,
    speed: 12.5,
    status: 'active',
    amenities: [
      'Laboratorio de investigación',
      'Gimnasio de gravedad cero',
      'Lounge panorámico',
    ],
  },
  {
    id: 'nebula-dream',
    name: 'Nebula Dream',
    class: 'Lujoso Imperial',
    capacity: 200,
    speed: 8.2,
    status: 'maintenance',
    amenities: [
      'Suites imperiales',
      'Teatro holográfico',
      'Jardines biológicos',
      'Spa de teletransporte',
    ],
  },
  {
    id: 'cosmic-odyssey',
    name: 'Cosmic Odyssey',
    class: 'Transbordador Interplanetario',
    capacity: 300,
    speed: 10.0,
    status: 'unavailable',
    amenities: [
      'Cafetería estelar',
      'Sala de juegos antigravedad',
      'Observatorio espacial',
    ],
  },
]

const status = {
  active: {
    name: 'Activa',
    style: 'text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  maintenance: {
    name: 'Mantenimiento',
    style: 'text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  unavailable: {
    name: 'No disponible',
    style: 'text-xs bg-red-500/20 text-red-400 border-red-500/30',
  },
}

export const StarshipsList = () => {
  return (
    <Card className="holo-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Clase</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Velocidad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSpaceships.map(ship => (
            <TableRow key={ship.id}>
              <TableCell>{ship.name}</TableCell>
              <TableCell>{ship.class}</TableCell>
              <TableCell>{ship.capacity}</TableCell>
              <TableCell>Warp {ship.speed}</TableCell>
              <TableCell>
                <Badge className={status[ship.status].style}>
                  {status[ship.status].name}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    className="border border-transparent [background:linear-gradient(#111120,#111120)_padding-box,linear-gradient(45deg,#06ffa5,#8b5cf6,#06b6d4)_border-box]"
                    variant="secondary"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    className="border border-transparent [background:linear-gradient(#111120,#111120)_padding-box,linear-gradient(45deg,#06ffa5,#8b5cf6,#06b6d4)_border-box]"
                    variant="secondary"
                  >
                    <Wrench size={16} />
                  </Button>
                  <Button
                    className="border border-transparent !text-red-400 [background:linear-gradient(#111120,#111120)_padding-box,linear-gradient(45deg,#06ffa5,#8b5cf6,#06b6d4)_border-box] hover:!text-white"
                    variant="secondary"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
