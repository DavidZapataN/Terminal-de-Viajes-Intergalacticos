import { useBookingStore } from '@/app/stores/booking-store'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Input } from '@/shared/components/Input'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, Minus, Plus, Rocket, User, Users } from 'lucide-react'
import { useState } from 'react'
import { showWarning } from '@/lib/toast.config'

export const BookingDatesStep = () => {
  const navigate = useNavigate()
  const {
    destiny,
    departureDate,
    returnDate,
    passengerCount,
    passengers,
    setDates,
    setPassengerCount,
    updatePassenger,
  } = useBookingStore()

  const [departureDateOpen, setDepartureDateOpen] = useState(false)
  const [returnDateOpen, setReturnDateOpen] = useState(false)

  const handleDepartureDateSelect = (date: Date | undefined) => {
    if (date) {
      setDates(date, returnDate)
      setDepartureDateOpen(false)
    }
  }

  const handleReturnDateSelect = (date: Date | undefined) => {
    if (date) {
      setDates(departureDate, date)
      setReturnDateOpen(false)
    }
  }

  const handlePassengerCountChange = (delta: number) => {
    const newCount = Math.max(1, Math.min(10, passengerCount + delta))
    setPassengerCount(newCount)
  }

  const validateAndProceed = () => {
    if (!departureDate) {
      showWarning('Selecciona una fecha de partida')
      return
    }
    if (!returnDate) {
      showWarning('Selecciona una fecha de regreso')
      return
    }
    if (returnDate <= departureDate) {
      showWarning('La fecha de regreso debe ser posterior a la de partida')
      return
    }
    if (passengers.some(p => !p.name.trim())) {
      showWarning('Ingresa el nombre de todos los pasajeros')
      return
    }

    navigate({ to: '/reservas/nave' })
  }

  const today = new Date()
  const minDepartureDate = new Date(today)
  minDepartureDate.setDate(today.getDate() + 7) // Mínimo 7 días de anticipación

  return (
    <div className="flex flex-col gap-6">
      {/* Dates Section */}
      <Card>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl text-cyan-400">Fechas del Viaje</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Departure Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Fecha de partida</label>
              <Popover
                open={departureDateOpen}
                onOpenChange={setDepartureDateOpen}
              >
                <PopoverTrigger asChild>
                  <button className="holo-border flex w-full items-center gap-3 rounded-md bg-transparent px-4 py-3 text-left transition-all hover:bg-white/5">
                    <CalendarIcon className="h-5 w-5 text-cyan-400" />
                    <span
                      className={departureDate ? 'text-white' : 'text-gray-500'}
                    >
                      {departureDate
                        ? format(departureDate, "d 'de' MMMM, yyyy", {
                            locale: es,
                          })
                        : 'Seleccionar fecha'}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto border-cyan-500/30 bg-gray-900 p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={departureDate || undefined}
                    onSelect={handleDepartureDateSelect}
                    disabled={date => date < minDepartureDate}
                    locale={es}
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Fecha de regreso</label>
              <Popover open={returnDateOpen} onOpenChange={setReturnDateOpen}>
                <PopoverTrigger asChild>
                  <button className="holo-border flex w-full items-center gap-3 rounded-md bg-transparent px-4 py-3 text-left transition-all hover:bg-white/5">
                    <CalendarIcon className="h-5 w-5 text-purple-400" />
                    <span
                      className={returnDate ? 'text-white' : 'text-gray-500'}
                    >
                      {returnDate
                        ? format(returnDate, "d 'de' MMMM, yyyy", {
                            locale: es,
                          })
                        : 'Seleccionar fecha'}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto border-cyan-500/30 bg-gray-900 p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={returnDate || undefined}
                    onSelect={handleReturnDateSelect}
                    disabled={date =>
                      date < (departureDate || minDepartureDate) ||
                      (departureDate ? date <= departureDate : false)
                    }
                    locale={es}
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Trip Duration Info */}
          {departureDate && returnDate && (
            <div className="rounded-lg bg-cyan-500/10 p-4 text-center">
              <span className="text-cyan-400">
                Duración del viaje:{' '}
                {Math.ceil(
                  (returnDate.getTime() - departureDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                días
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Passengers Section */}
      <Card>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-cyan-400" />
              <h3 className="text-xl text-cyan-400">Pasajeros</h3>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                className="h-10 w-10 rounded-full p-0"
                onClick={() => handlePassengerCountChange(-1)}
                disabled={passengerCount <= 1}
              >
                <Minus size={18} />
              </Button>
              <span className="min-w-12 text-center text-xl font-medium">
                {passengerCount}
              </span>
              <Button
                variant="secondary"
                className="h-10 w-10 rounded-full p-0"
                onClick={() => handlePassengerCountChange(1)}
                disabled={passengerCount >= 10}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {passengers.map((passenger, index) => (
              <Input
                key={index}
                label={`Pasajero ${index + 1}`}
                placeholder="Nombre completo"
                icon={User}
                value={passenger.name}
                onChange={e => updatePassenger(index, e.target.value)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Summary and Navigation */}
      <Card>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">
              Precio base del destino
            </span>
            <span className="text-2xl font-bold text-cyan-400">
              {destiny?.price.toLocaleString() || 0} GC
            </span>
            <span className="text-xs text-gray-500">
              + precio de cabina por pasajero
            </span>
          </div>

          <Button onClick={validateAndProceed} className="gap-2">
            <Rocket size={18} />
            Seleccionar Nave
          </Button>
        </div>
      </Card>
    </div>
  )
}
