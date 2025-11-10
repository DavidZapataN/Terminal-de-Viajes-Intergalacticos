import { mockSpaceships } from '@/db/mockData'
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
    <Card>
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
                  <Button className="holo-border" variant="secondary">
                    <Edit size={16} />
                  </Button>
                  <Button className="holo-border" variant="secondary">
                    <Wrench size={16} />
                  </Button>
                  <Button
                    className="holo-border !text-red-400 hover:!text-white"
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
