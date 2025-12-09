import { useReservationsStore } from '@/app/stores/reservations-store'
import { mockPlanets } from '@/db/mockData'
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
import { Trash2 } from 'lucide-react'

export interface ReservationAdmin {
  id: string
  planetId: string
  shipId: string
  departureDate: string
  returnDate: string
  passengers: number
  cabinClass: string
  status: 'confirmed' | 'in_transit' | 'completed' | 'cancelled'
  totalCost: number
}

const status = {
  confirmed: {
    name: 'Confirmada',
    style: 'text-xs bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  in_transit: {
    name: 'En tránsito',
    style: 'text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  completed: {
    name: 'Completada',
    style: 'text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  cancelled: {
    name: 'Cancelada',
    style: 'text-xs bg-red-500/20 text-red-400 border-red-500/30',
  },
}

export const PassengersList = () => {
  const reservations = useReservationsStore(state => state.reservations)
  const deleteReservation = useReservationsStore(
    state => state.deleteReservation
  )

  const handleDelete = (reservationId: string) => {
    deleteReservation(reservationId)
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Destino</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Pasajeros</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map(reservation => {
            const planet = mockPlanets.find(p => p.id === reservation.planetId)
            return (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id.toUpperCase()}</TableCell>
                <TableCell>{planet?.name}</TableCell>
                <TableCell>
                  {new Date(reservation.departureDate).toLocaleDateString()}
                </TableCell>
                <TableCell> - </TableCell>
                <TableCell>
                  <Badge className={status[reservation.status].style}>
                    {status[reservation.status].name}
                  </Badge>
                </TableCell>
                <TableCell className="text-cyan-400">
                  {reservation.totalCost.toLocaleString()} GC
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {/* <Button className="holo-border" variant="secondary">
                      <Edit size={16} />
                    </Button> */}
                    <Button
                      className="holo-border text-red-400! hover:text-white!"
                      variant="secondary"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
