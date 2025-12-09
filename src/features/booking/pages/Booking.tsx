import { Button } from '@/shared/components/Button'
import { Title } from '@/shared/components/Title'
import { ArrowLeft, Rocket } from 'lucide-react'
import { useState } from 'react'
import { Progressbar } from '../compontents/Progressbar'
import { SelectStarship } from '../compontents/SelectStarship'
import { PassengerData } from '../compontents/PassengerData'
import { BookingPayment } from '../compontents/BookingPayment'
import { BookingConfirmation } from '../compontents/BookingConfirmation'
import { useNavigate } from '@tanstack/react-router'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { useAuthStore } from '@/app/stores/auth-store'
import type { Reservation } from '@/app/types/Reservation'
import { showWarning, showSuccess } from '@/lib/toast.config'

const steps = ['Seleccionar nave', 'Datos pasajero', 'Pago', 'Confirmación']

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

export const Booking = () => {
  const navigate = useNavigate()
  const createReservation = useReservationsStore(
    state => state.createReservation
  )
  const currentUser = useAuthStore(state => state.user)

  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    shipId: '',
    planetId: 'kepler-442b', // Valor por defecto del título
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  })

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }))
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return bookingData.shipId !== ''
      case 2:
        return (
          bookingData.departureDate !== '' &&
          bookingData.returnDate !== '' &&
          bookingData.passengers > 0 &&
          bookingData.cabinClass !== ''
        )
      case 3:
        return (
          bookingData.cardNumber !== '' &&
          bookingData.expirationDate !== '' &&
          bookingData.securityCode !== ''
        )
      default:
        return true
    }
  }

  const calculateTotalCost = (): number => {
    const cabinPrices: Record<string, number> = {
      economy: 2000,
      premium: 5000,
      luxury: 15000,
    }
    const basePrice = cabinPrices[bookingData.cabinClass] || 0
    return basePrice * bookingData.passengers
  }

  const handleCreateReservation = () => {
    if (!currentUser) return

    const newReservation: Reservation = {
      id: `RSV-${Date.now()}`,
      userId: currentUser.id,
      planetId: bookingData.planetId,
      shipId: bookingData.shipId,
      departureDate: bookingData.departureDate,
      returnDate: bookingData.returnDate,
      cabinClass: bookingData.cabinClass,
      status: 'confirmed',
      totalCost: calculateTotalCost(),
    }

    createReservation(newReservation)
    showSuccess('Reserva creada exitosamente')
  }

  const handleExplorePlanets = () => {
    navigate({ to: '/destinos' })
  }

  const handleNextStep = () => {
    if (!validateStep(step)) {
      showWarning('Por favor completa todos los campos requeridos')
      return
    }

    if (step === 3) {
      handleCreateReservation()
    }

    setStep(prevStep => {
      if (prevStep < 4) {
        return prevStep + 1
      }
      return prevStep
    })
  }

  const handleBackStep = () => {
    setStep(prevStep => {
      if (prevStep > 1) {
        return prevStep - 1
      }
      return prevStep
    })
  }

  const handleForm = () => {
    switch (step) {
      case 1:
        return (
          <SelectStarship
            selectedShipId={bookingData.shipId}
            onSelectShip={(shipId: string) => updateBookingData({ shipId })}
          />
        )
      case 2:
        return (
          <PassengerData
            departureDate={bookingData.departureDate}
            returnDate={bookingData.returnDate}
            passengers={bookingData.passengers}
            cabinClass={bookingData.cabinClass}
            onUpdateData={updateBookingData}
          />
        )
      case 3:
        return (
          <BookingPayment
            bookingData={bookingData}
            totalCost={calculateTotalCost()}
            onUpdatePayment={(paymentData: Partial<BookingData>) =>
              updateBookingData(paymentData)
            }
          />
        )
      case 4:
        return (
          <BookingConfirmation
            bookingData={bookingData}
            totalCost={calculateTotalCost()}
          />
        )
    }
  }

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-5">
      <Button className="w-max" variant="text" onClick={handleExplorePlanets}>
        <ArrowLeft className="mr-3" size={16} />
        Explorar planetas
      </Button>
      <div className="flex w-full justify-center">
        <Title>Reservar Viaje a Kepler-442b</Title>
      </div>

      <Progressbar
        steps={steps}
        activeStep={step}
        className="w-full justify-center"
      />

      {handleForm()}

      <div className="flex items-center justify-center gap-5">
        {step > 1 && step < 4 && (
          <Button
            className="holo-border rounded-md text-center"
            variant="secondary"
            type="button"
            onClick={handleBackStep}
          >
            Anterior
          </Button>
        )}

        {step < 4 && (
          <Button
            className="flex items-center justify-center gap-2 p-0.5 text-black!"
            type="button"
            onClick={handleNextStep}
          >
            <Rocket size={16} />
            <span>{step === 3 ? 'Confirmar reserva' : 'Siguiente'}</span>
          </Button>
        )}
      </div>
    </div>
  )
}
