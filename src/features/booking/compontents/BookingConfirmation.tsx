import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ArrowLeft, Check, Plane } from 'lucide-react'

export const BookingConfirmation = () => {
  return (
    <Card>
      <div className="flex w-full flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex place-items-center rounded-full bg-green-500 p-4">
          <Check size={32} />
        </div>

        <div>
          <h2 className="mb-2 text-green-400">¡Reserva Confirmada!</h2>
          <p className="text-muted-foreground">
            Tu viaje a Kepler-442b ha sido reservado exitosamente.
          </p>
        </div>

        <Card className="w-1/2">
          <div className="p-6">
            <h4 className="mb-3">Código de reserva</h4>
            <div className="rounded-lg bg-accent p-3 text-center">
              <span className="font-mono text-lg text-cyan-400">
                TVI-{Date.now().toString().slice(-6)}
              </span>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-5">
          <Button className="holo-border text-sm" variant="secondary">
            <ArrowLeft size={16} className="mr-3" />
            Dashboard
          </Button>
          <Button className="text-sm">
            <Plane size={16} className="mr-3" />
            Ver mis reservas
          </Button>
        </div>
      </div>
    </Card>
  )
}
