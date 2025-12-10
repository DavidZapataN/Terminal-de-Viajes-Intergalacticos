import type { Booking, BookingStatus } from '@/app/types/api/booking/Booking'
import { cancelBooking } from '@/app/services/booking.service'
import { Badge } from '@/shared/components/Bagde'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Calendar,
  CircleCheckBig,
  CircleX,
  Clock4,
  Loader2,
  Rocket,
  Star,
  Users,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { showSuccess, showError } from '@/lib/toast.config'

interface Props {
  booking: Booking
  onCancelled?: () => void
  showCancelButton?: boolean
}

const statusConfig: Record<
  BookingStatus,
  { name: string; icon: React.ReactNode; style: string }
> = {
  pending: {
    name: 'Pendiente',
    icon: <Clock4 size={14} />,
    style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  confirmed: {
    name: 'Confirmado',
    icon: <CircleCheckBig size={14} />,
    style: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  completed: {
    name: 'Completado',
    icon: <Star size={14} />,
    style: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  cancelled: {
    name: 'Cancelado',
    icon: <CircleX size={14} />,
    style: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
}

export const BookingCard = ({
  booking,
  onCancelled,
  showCancelButton = false,
}: Props) => {
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return

    setIsCancelling(true)
    try {
      await cancelBooking(booking.id)
      showSuccess('Reserva cancelada exitosamente')
      onCancelled?.()
    } catch (error) {
      console.error('Error cancelling booking:', error)
      showError('Error al cancelar la reserva')
    } finally {
      setIsCancelling(false)
    }
  }

  const status = statusConfig[booking.status]
  const bookingCode = `TVI-${booking.id.toString().padStart(6, '0')}`

  return (
    <Card className="h-max w-full">
      <div className="flex w-full flex-col gap-3 p-5">
        <div className="flex gap-4">
          {/* Destiny Image */}
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={booking.destiny?.images?.[0] || ''}
              alt={booking.destiny?.name || 'Destino'}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Booking Info */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {booking.destiny?.name || 'Destino desconocido'}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-gray-400">Código:</span>
                  <code className="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-xs text-cyan-400">
                    {bookingCode}
                  </code>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge className={status.style}>
                  {status.icon}
                  <span className="ml-1">{status.name}</span>
                </Badge>
                <span className="text-lg font-semibold text-cyan-400">
                  {booking.totalPrice.toLocaleString()} GC
                </span>
              </div>
            </div>

            {/* Cabin info */}
            <p className="text-sm text-gray-400">
              {booking.cabin?.name || 'Cabina estándar'}
            </p>

            {/* Details row */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Rocket size={14} className="text-emerald-400" />
                <span className="text-gray-300">
                  {booking.starship?.name || 'Nave'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-purple-400" />
                <span className="text-gray-300">
                  {booking.tickets?.length || 1} pasajero
                  {(booking.tickets?.length || 1) > 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-cyan-400" />
                <span className="text-gray-300">
                  Salida:{' '}
                  {format(new Date(booking.departureDate), 'd/MM/yyyy', {
                    locale: es,
                  })}
                </span>
                <span className="text-gray-500">-</span>
                <span className="text-gray-300">
                  Regreso:{' '}
                  {format(new Date(booking.returnDate), 'd/MM/yyyy', {
                    locale: es,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Passengers list */}
        {booking.tickets && booking.tickets.length > 0 && (
          <div className="border-t border-gray-800 pt-3">
            <span className="text-xs text-gray-500">Pasajeros:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {booking.tickets.map((ticket, index) => (
                <span
                  key={ticket.id || index}
                  className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300"
                >
                  {ticket.passengerName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cancel button */}
        {showCancelButton &&
          ['pending', 'confirmed'].includes(booking.status) && (
            <div className="border-t border-gray-800 pt-3">
              <Button
                variant="secondary"
                className="gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Cancelando...
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    Cancelar Reserva
                  </>
                )}
              </Button>
            </div>
          )}
      </div>
    </Card>
  )
}
