import { useBookingStore } from '@/app/stores/booking-store'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  Download,
  Plane,
  Ticket,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { showSuccess } from '@/lib/toast.config'

export const BookingConfirmationStep = () => {
  const navigate = useNavigate()
  const {
    destiny,
    departureDate,
    returnDate,
    passengers,
    selectedStarship,
    selectedCabin,
    bookingCode,
    calculateTotalPrice,
    resetBooking,
  } = useBookingStore()

  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    if (bookingCode) {
      await navigator.clipboard.writeText(bookingCode)
      setCopied(true)
      showSuccess('Código copiado al portapapeles')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleGoToDashboard = () => {
    resetBooking()
    navigate({ to: '/' })
  }

  const handleGoToTrips = () => {
    resetBooking()
    navigate({ to: '/viajes' })
  }

  const totalPrice = calculateTotalPrice()

  if (!destiny || !selectedStarship || !selectedCabin || !bookingCode) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-4 p-12">
          <p className="text-gray-400">
            No hay información de reserva disponible
          </p>
          <Button onClick={() => navigate({ to: '/destinos' })}>
            Explorar destinos
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Success Header */}
      <Card>
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          {/* Success Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            <Check size={40} className="text-white" strokeWidth={3} />
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-green-400">
              ¡Reserva Confirmada!
            </h2>
            <p className="text-gray-400">
              Tu viaje a {destiny.name} ha sido reservado exitosamente.
              <br />
              Prepárate para una aventura intergaláctica inolvidable.
            </p>
          </div>

          {/* Booking Code */}
          <div className="w-full max-w-md">
            <p className="mb-2 text-sm text-gray-400">Código de Reserva</p>
            <div className="holo-border flex items-center justify-between rounded-lg bg-gray-900/50 p-4">
              <span className="font-mono text-2xl tracking-wider text-cyan-400">
                {bookingCode}
              </span>
              <Button variant="text" onClick={handleCopyCode} className="ml-4">
                {copied ? (
                  <Check size={20} className="text-green-400" />
                ) : (
                  <Copy size={20} />
                )}
              </Button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Guarda este código para consultar tu reserva
            </p>
          </div>
        </div>
      </Card>

      {/* Booking Details */}
      <Card>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3">
            <Ticket className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl text-cyan-400">Detalles de tu Reserva</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Destination */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Destino</span>
              <span className="text-lg font-semibold text-white">
                {destiny.name}
              </span>
              <span className="text-sm text-gray-500">{destiny.system}</span>
            </div>

            {/* Starship */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Nave Espacial</span>
              <span className="text-lg font-semibold text-white">
                {selectedStarship.name}
              </span>
              <span className="text-sm text-gray-500">
                {selectedStarship.class}
              </span>
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Fechas del Viaje</span>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-cyan-400" />
                <span className="text-white">
                  {departureDate &&
                    format(departureDate, "d 'de' MMMM, yyyy", { locale: es })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-purple-400" />
                <span className="text-white">
                  {returnDate &&
                    format(returnDate, "d 'de' MMMM, yyyy", { locale: es })}
                </span>
              </div>
            </div>

            {/* Cabin */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Cabina</span>
              <span className="text-lg font-semibold text-white">
                {selectedCabin.name}
              </span>
              <span className="text-sm text-gray-500">
                {selectedCabin.description}
              </span>
            </div>
          </div>

          {/* Passengers */}
          <div className="border-t border-gray-700 pt-4">
            <div className="mb-3 flex items-center gap-2">
              <Users size={16} className="text-cyan-400" />
              <span className="text-sm text-gray-400">
                Pasajeros ({passengers.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {passengers.map((passenger, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-800 px-4 py-2 text-sm text-white"
                >
                  {passenger.name}
                </span>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
            <span className="text-lg text-gray-400">Total Pagado</span>
            <span className="text-3xl font-bold text-cyan-400">
              {totalPrice.toLocaleString()} GC
            </span>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <Card>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">
              ¿Qué te gustaría hacer ahora?
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={handleGoToDashboard}
              className="gap-2"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Button>

            <Button
              variant="secondary"
              onClick={handleGoToTrips}
              className="gap-2"
            >
              <Plane size={18} />
              Mis Viajes
            </Button>
          </div>
        </div>
      </Card>

      {/* Download Ticket (placeholder) */}
      <div className="flex justify-center">
        <Button variant="text" className="gap-2 text-gray-400">
          <Download size={16} />
          Descargar Tickets (próximamente)
        </Button>
      </div>
    </div>
  )
}
