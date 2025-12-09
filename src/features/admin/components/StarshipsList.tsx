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
import { Edit, Trash2 } from 'lucide-react'
import type { Starship } from '@/app/types/Starship'

const statusConfig = {
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

interface Props {
  ships: Starship[]
  onEdit: (ship: Starship) => void
  onDelete: (shipId: number) => void
}

export const StarshipsList = ({ ships, onEdit, onDelete }: Props) => {
  const handleDelete = (ship: Starship) => {
    onDelete(ship.id)
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Clase</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Cabinas</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ships.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No hay naves registradas
              </TableCell>
            </TableRow>
          ) : (
            ships.map(ship => (
              <TableRow key={ship.id}>
                <TableCell className="font-medium">{ship.name}</TableCell>
                <TableCell>{ship.class}</TableCell>
                <TableCell>
                  {ship.capacity.toLocaleString()} pasajeros
                </TableCell>
                <TableCell>{ship.cabins.length} cabinas</TableCell>
                <TableCell>
                  <Badge className={statusConfig[ship.status].style}>
                    {statusConfig[ship.status].name}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      className="holo-border"
                      variant="secondary"
                      onClick={() => onEdit(ship)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      className="holo-border text-red-400! hover:text-red-300!"
                      variant="secondary"
                      onClick={() => handleDelete(ship)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
