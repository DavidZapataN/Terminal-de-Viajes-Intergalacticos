import { Button } from '@/shared/components/Button'
import { Title } from '@/shared/components/Title'
import { ArrowLeft } from 'lucide-react'
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearch,
} from '@tanstack/react-router'
import { BookingProgressbar } from '../components/BookingProgressbar'
import { useBookingStore } from '@/app/stores/booking-store'
import { useEffect } from 'react'
import { getDestinyById } from '@/app/services/destiny.service'

const steps = [
  { id: 'dates', label: 'Fechas y Pasajeros', path: '/reservas/fechas' },
  { id: 'starship', label: 'Seleccionar Nave', path: '/reservas/nave' },
  { id: 'cabin', label: 'Seleccionar Cabina', path: '/reservas/cabina' },
  { id: 'payment', label: 'Pago', path: '/reservas/pago' },
  { id: 'confirmation', label: 'Confirmación', path: '/reservas/confirmacion' },
]

export const BookingLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const search = useSearch({ from: '/_protected/reservas' }) as {
    destinyId?: string
  }
  const { destiny, setDestiny, resetBooking, paymentStatus } = useBookingStore()

  const currentStepIndex = steps.findIndex(step =>
    location.pathname.includes(step.path.split('/').pop()!)
  )
  const activeStep = currentStepIndex >= 0 ? currentStepIndex + 1 : 1

  // Reset booking state when entering /reservas/fechas if previous booking was completed
  useEffect(() => {
    const isOnDatesStep = location.pathname.includes('/reservas/fechas')
    if (isOnDatesStep && paymentStatus === 'success') {
      resetBooking()
    }
  }, [location.pathname, paymentStatus, resetBooking])

  useEffect(() => {
    const loadDestiny = async () => {
      if (search.destinyId && !destiny) {
        try {
          const destinyData = await getDestinyById(parseInt(search.destinyId))
          setDestiny(destinyData)
        } catch (error) {
          console.error('Error loading destiny:', error)
          navigate({ to: '/destinos' })
        }
      }
    }
    loadDestiny()
  }, [search.destinyId, destiny, setDestiny, navigate])

  const handleBackToDestinations = () => {
    resetBooking()
    navigate({ to: '/destinos' })
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 p-5">
      <header className="flex flex-col gap-4">
        <Button
          className="w-max"
          variant="text"
          onClick={handleBackToDestinations}
        >
          <ArrowLeft className="mr-3" size={16} />
          Explorar destinos
        </Button>

        <div className="flex w-full flex-col items-center gap-2">
          <Title>
            {destiny
              ? `Reservar Viaje a ${destiny.name}`
              : 'Reservar Viaje Intergaláctico'}
          </Title>
          {destiny && (
            <p className="text-sm text-muted-foreground">
              {destiny.system} • {destiny.price.toLocaleString()} GC base
            </p>
          )}
        </div>

        <BookingProgressbar
          steps={steps.map(s => s.label)}
          activeStep={activeStep}
        />
      </header>

      <main className="flex flex-1 justify-center">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
