import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { Input } from '@/shared/components/Input'
import { Calendar, CreditCard, LockKeyhole, Star } from 'lucide-react'

export const BookingPayment = () => {
  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <h3 className="text-cyan-400">Confirmación de reserva</h3>

        <Card className="h-max !w-full">
          <div className="flex w-full gap-4 p-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800"
                alt="Planet"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center gap-2">
              <h3>Kepler-442b</h3>
              <span className="text-sm text-gray-400">Sistema Lyra</span>
              <span className="flex items-center gap-2 text-sm">
                <Star size={18} className="text-yellow-400" />
                4.8 (2847 reseñas)
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex w-full flex-col gap-4 p-4">
            <h3>Resumen de la reserva</h3>
            <div className="flex justify-between">
              Nave:
              <span> Starweaver</span>
            </div>
            <div className="flex justify-between">
              Fechas:
              <span> 12/11/2025 - 13/11/2025</span>
            </div>
            <div className="flex justify-between">
              Pasajeros:
              <span> 2</span>
            </div>
            <div className="flex justify-between">
              Clase de cabina:
              <span> Económica</span>
            </div>
            <div className="flex justify-between gap-2 border-t border-border pt-2">
              Total:
              <span className="text-cyan-400"> 15,000 GC</span>
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
            />
            <div className='flex gap-2'>
            <Input
              label="Fecha de expiración"
              placeholder="MM/AA"
              icon={Calendar}
              type="text"
            />
            <Input
              label="Código de seguridad"
              placeholder="123"
              icon={LockKeyhole}
              type="text"
            />
            </div>
          </div>
        </Card>
      </div>
    </Card>
  )
}
