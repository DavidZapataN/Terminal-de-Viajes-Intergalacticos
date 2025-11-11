import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { Input } from '@/shared/components/Input'
import { Calendar, CreditCard, LockKeyhole, Star } from 'lucide-react'
import { useShipsStore } from '@/app/stores/ships-store'
import { usePlanetsStore } from '@/app/stores/planets-store'
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
  onUpdatePayment: (paymentData: {
    cardNumber?: string
    expirationDate?: string
    securityCode?: string
  }) => void
}

const cabinClassNames: Record<string, string> = {
  economy: 'Económica',
  premium: 'Premium',
  luxury: 'Lujo Imperial',
}

export const BookingPayment = ({
  bookingData,
  totalCost,
  onUpdatePayment,
}: Props) => {
  const ships = useShipsStore(state => state.ships)
  const planets = usePlanetsStore(state => state.planets)

  const selectedShip = useMemo(
    () => ships.find(ship => ship.id === bookingData.shipId),
    [ships, bookingData.shipId]
  )

  const selectedPlanet = useMemo(
    () => planets.find(planet => planet.id === bookingData.planetId),
    [planets, bookingData.planetId]
  )

  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <h3 className="text-cyan-400">Confirmación de reserva</h3>

        <Card className="h-max !w-full">
          <div className="flex w-full gap-4 p-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
              <ImageWithFallback
                src={
                  selectedPlanet?.images?.[0] ||
                  'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800'
                }
                alt={selectedPlanet?.name || 'Planet'}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center gap-2">
              <h3>{selectedPlanet?.name || 'Planeta'}</h3>
              <span className="text-sm text-gray-400">
                {selectedPlanet?.system || 'Sistema'}
              </span>
              <span className="flex items-center gap-2 text-sm">
                <Star size={18} className="text-yellow-400" />
                {selectedPlanet?.rating || 0}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex w-full flex-col gap-4 p-4">
            <h3>Resumen de la reserva</h3>
            <div className="flex justify-between">
              Nave:
              <span> {selectedShip?.name || 'No seleccionada'}</span>
            </div>
            <div className="flex justify-between">
              Fechas:
              <span>
                {' '}
                {bookingData.departureDate} - {bookingData.returnDate}
              </span>
            </div>
            <div className="flex justify-between">
              Pasajeros:
              <span> {bookingData.passengers}</span>
            </div>
            <div className="flex justify-between">
              Clase de cabina:
              <span>
                {' '}
                {cabinClassNames[bookingData.cabinClass] ||
                  bookingData.cabinClass}
              </span>
            </div>
            <div className="flex justify-between gap-2 border-t border-border pt-2">
              Total:
              <span className="text-cyan-400">
                {' '}
                {totalCost.toLocaleString()} GC
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex w-full flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              <h3>Información del pago</h3>
            </div>
            <Input
              label="Número de la tarjeta galáctica"
              placeholder="0000 0000 0000 0000"
              icon={CreditCard}
              type="text"
              value={bookingData.cardNumber}
              onChange={e => onUpdatePayment({ cardNumber: e.target.value })}
            />
            <div className="flex gap-2">
              <Input
                label="Fecha de expiración"
                placeholder="MM/AA"
                icon={Calendar}
                type="text"
                value={bookingData.expirationDate}
                onChange={e =>
                  onUpdatePayment({ expirationDate: e.target.value })
                }
              />
              <Input
                label="Código de seguridad"
                placeholder="123"
                icon={LockKeyhole}
                type="text"
                value={bookingData.securityCode}
                onChange={e =>
                  onUpdatePayment({ securityCode: e.target.value })
                }
              />
            </div>
          </div>
        </Card>
      </div>
    </Card>
  )
}
