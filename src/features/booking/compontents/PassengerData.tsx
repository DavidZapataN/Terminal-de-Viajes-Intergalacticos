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

export const PassengerData = () => {
  // const [selected, setSelected] = useState<Date>()

  return (
    <Card className="h-max !w-full">
      <div className="flex w-full flex-col gap-4 p-6">
        <h3 className="text-cyan-400">Fechas y pasajeros</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Fecha de partida"
            placeholder="Seleccionar fecha"
            icon={CalendarIcon}
            type="text"
            disabled
          />
          <Input
            label="Fecha de regreso"
            placeholder="Seleccionar fecha"
            icon={CalendarIcon}
            type="text"
            disabled
          />
          <Input
            label="Número de pasajeros"
            placeholder="Seleccionar pasajeros"
            icon={Users}
            type="text"
            disabled
          />

          <div className="flex flex-col gap-3">
            Clase de cabina
            {cabinClasses.map(cabin => (
              <Card className="cursor-pointer">
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
            ))}
          </div>

          {/* <div className="flex flex-col gap-1">
            <span>Fecha de partida</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="holo-border w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2" />
                  {selected
                    ? selected.toLocaleDateString()
                    : 'Seleccionar fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="holo-border m-1 w-auto rounded-md bg-card p-0">
                <Calendar
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                />
              </PopoverContent>
            </Popover>
          </div> */}
        </div>
      </div>
    </Card>
  )
}
