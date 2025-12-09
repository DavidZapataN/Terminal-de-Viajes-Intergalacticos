import { Card } from '@/shared/components/Card'
import { Input } from '@/shared/components/Input'
import { CalendarIcon, Users } from 'lucide-react'

const cabinClasses = [
  {
    id: 'economy',
    name: 'Económica',
    price: 2000,
    amenities: ['Ventana espacial', 'Comida estándar'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5000,
    amenities: ['Suite privada', 'Comida gourmet', 'Spa access'],
  },
  {
    id: 'luxury',
    name: 'Lujo Imperial',
    price: 15000,
    amenities: ['Suite imperial', 'Mayordomo personal', 'Acceso VIP'],
  },
]

interface Props {
  departureDate: string
  returnDate: string
  passengers: number
  cabinClass: string
  onUpdateData: (data: {
    departureDate?: string
    returnDate?: string
    passengers?: number
    cabinClass?: string
  }) => void
}

export const PassengerData = ({
  departureDate,
  returnDate,
  passengers,
  cabinClass,
  onUpdateData,
}: Props) => {
  return (
    <Card className="h-max w-full!">
      <div className="flex w-full flex-col gap-4 p-6">
        <h3 className="text-cyan-400">Fechas y pasajeros</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Fecha de partida"
            placeholder="Seleccionar fecha"
            icon={CalendarIcon}
            type="date"
            value={departureDate}
            onChange={e => onUpdateData({ departureDate: e.target.value })}
          />
          <Input
            label="Fecha de regreso"
            placeholder="Seleccionar fecha"
            icon={CalendarIcon}
            type="date"
            value={returnDate}
            onChange={e => onUpdateData({ returnDate: e.target.value })}
          />
          <Input
            label="Número de pasajeros"
            placeholder="Seleccionar pasajeros"
            icon={Users}
            type="number"
            min={1}
            value={passengers.toString()}
            onChange={e =>
              onUpdateData({ passengers: parseInt(e.target.value) || 1 })
            }
          />

          <div className="flex flex-col gap-3">
            Clase de cabina
            {cabinClasses.map(cabin => (
              <div
                key={cabin.id}
                onClick={() => onUpdateData({ cabinClass: cabin.id })}
              >
                <Card
                  className={`cursor-pointer ${cabinClass === cabin.id ? 'ring-2 ring-cyan-400' : ''}`}
                >
                  <div className="flex flex-col gap-2 p-4">
                    <header className="flex items-center justify-between">
                      <h3 className="text-white">{cabin.name}</h3>
                      <span className="text-cyan-400">
                        {cabin.price.toLocaleString()} GC
                      </span>
                    </header>

                    <div className="flex flex-wrap gap-1">
                      {cabin.amenities.map(amenity => (
                        <span
                          key={amenity}
                          className="text-xs text-muted-foreground"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
