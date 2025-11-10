import { useState } from 'react'
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
import type { Starship } from '@/app/types/Starship'

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

interface Props {
  ships: Starship[]
  onUpdate?: (ship: Starship) => void
  onDelete?: (shipId: string) => void
  onPutInActive?: (shipId: string) => void
}

export const StarshipsList = ({
  ships,
  onUpdate,
  onDelete,
  onPutInActive,
}: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    class: '',
    capacity: '',
    speed: '',
    amenities: '',
  })

  const startEdit = (ship: Spaceship) => {
    setEditingId(ship.id)
    setForm({
      class: ship.class,
      capacity: String(ship.capacity),
      speed: String(ship.speed),
      amenities: ship.amenities.join(', '),
    })
  }

  const cancelEdit = () => setEditingId(null)

  const save = (ship: Starship) => {
    const updated: Starship = {
      ...ship,
      class: form.class,
      capacity: Number(form.capacity) || 0,
      speed: Number(form.speed) || 0,
    }

    onUpdate?.(updated)
    setEditingId(null)
  }

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
          {ships.map(ship => (
            <TableRow key={ship.id}>
              <TableCell>{ship.name}</TableCell>
              <TableCell>
                {editingId === ship.id ? (
                  <input
                    className="rounded border border-gray-700 bg-transparent p-1"
                    value={form.class}
                    onChange={e =>
                      setForm(f => ({ ...f, class: e.target.value }))
                    }
                  />
                ) : (
                  ship.class
                )}
              </TableCell>
              <TableCell>
                {editingId === ship.id ? (
                  <input
                    className="rounded border border-gray-700 bg-transparent p-1"
                    value={form.capacity}
                    onChange={e =>
                      setForm(f => ({ ...f, capacity: e.target.value }))
                    }
                  />
                ) : (
                  ship.capacity
                )}
              </TableCell>
              <TableCell>
                {editingId === ship.id ? (
                  <input
                    className="rounded border border-gray-700 bg-transparent p-1"
                    value={form.speed}
                    onChange={e =>
                      setForm(f => ({ ...f, speed: e.target.value }))
                    }
                  />
                ) : (
                  `Warp ${ship.speed}`
                )}
              </TableCell>
              <TableCell>
                {/* status is read-only per requirement */}
                <Badge className={status[ship.status].style}>
                  {status[ship.status].name}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {editingId === ship.id ? (
                    <>
                      <Button
                        className="holo-border"
                        variant="secondary"
                        onClick={() => save(ship)}
                      >
                        Guardar
                      </Button>
                      <Button
                        className="holo-border !text-gray-400"
                        variant="secondary"
                        onClick={cancelEdit}
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="holo-border"
                        variant="secondary"
                        onClick={() => startEdit(ship)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        className="holo-border !text-red-400 hover:!text-white"
                        variant="secondary"
                        onClick={() => onDelete?.(ship.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                      {ship.status !== 'active' && (
                        <Button
                          className="holo-border"
                          variant="secondary"
                          onClick={() => onPutInActive?.(ship.id)}
                        >
                          <Wrench size={16} />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
