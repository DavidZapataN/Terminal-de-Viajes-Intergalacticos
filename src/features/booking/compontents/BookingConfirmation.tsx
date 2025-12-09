import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ArrowLeft, Check, Plane } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

interface BookingData {
  shipId: string
  planetId: string
  departureDate: string
  returnDate: string
  passengers: number
  cabinClass: string
  cardNumber: string
  expirationDate: string
  securityCode: string
}

interface Props {
  bookingData: BookingData
  totalCost: number
}

const cabinClassNames: Record<string, string> = {
  economy: 'Económica',
  premium: 'Premium',
  luxury: 'Lujo Imperial',
}

export const BookingConfirmation = ({ bookingData, totalCost }: Props) => {
  const navigate = useNavigate()
  // const ships = useStarshipsStore(state => state.starships)
  const planets: any[] = []

  // const selectedShip = useMemo(
  //   () => ships.find(ship => ship.id.toString() === bookingData.shipId),
  //   [ships, bookingData.shipId]
  // )

  const selectedPlanet = useMemo(
    () => planets.find(planet => planet.id === bookingData.planetId),
    [planets, bookingData.planetId]
  )

  const reservationCode = `TVI-${Date.now().toString().slice(-6)}`

  const handleGoToDashboard = () => {
    navigate({ to: '/' })
  }

  const handleGoToReservations = () => {
    navigate({ to: '/perfil' })
  }

  return (
    <Card>
      <div className="flex w-full flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex place-items-center rounded-full bg-green-500 p-4">
          <Check size={32} />
        </div>

        <div>
          <h2 className="mb-2 text-green-400">¡Reserva Confirmada!</h2>
          <p className="text-muted-foreground">
            Tu viaje a {selectedPlanet?.name || 'tu destino'} ha sido reservado
            exitosamente.
          </p>
        </div>

        <Card className="w-full md:w-1/2">
          <div className="p-6">
            <h4 className="mb-3">Código de reserva</h4>
            <div className="rounded-lg bg-accent p-3 text-center">
              <span className="font-mono text-lg text-cyan-400">
                {reservationCode}
              </span>
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <div className="p-6">
            <h4 className="mb-4">Detalles de tu reserva</h4>
            <div className="flex flex-col gap-3 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destino:</span>
                <span>{selectedPlanet?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nave:</span>
                <span>{'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de salida:</span>
                <span>{bookingData.departureDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de regreso:</span>
                <span>{bookingData.returnDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pasajeros:</span>
                <span>{bookingData.passengers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clase de cabina:</span>
                <span>
                  {cabinClassNames[bookingData.cabinClass] ||
                    bookingData.cabinClass}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-muted-foreground">Total pagado:</span>
                <span className="text-cyan-400">
                  {totalCost.toLocaleString()} GC
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-5">
          <Button
            className="holo-border text-sm"
            variant="secondary"
            onClick={handleGoToDashboard}
          >
            <ArrowLeft size={16} className="mr-3" />
            Dashboard
          </Button>
          <Button className="text-sm" onClick={handleGoToReservations}>
            <Plane size={16} className="mr-3" />
            Ver mis reservas
          </Button>
        </div>
      </div>
    </Card>
  )
}
