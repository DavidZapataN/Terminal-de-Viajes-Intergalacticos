import { Button } from '@/shared/components/Button'
import { Title } from '@/shared/components/Title'
import { ArrowLeft, Rocket } from 'lucide-react'
import { useState } from 'react'
import { Progressbar } from '../compontents/Progressbar'
import { SelectStarship } from '../compontents/SelectStarship'
import { PassengerData } from '../compontents/PassengerData'
import { BookingPayment } from '../compontents/BookingPayment'
import { BookingConfirmation } from '../compontents/BookingConfirmation'

const steps = ['Seleccionar nave', 'Datos pasajero', 'Pago', 'Confirmación']

export const Booking = () => {
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
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
        return <SelectStarship />
      case 2:
        return <PassengerData />
      case 3:
        return <BookingPayment />
      case 4:
        return <BookingConfirmation />
    }
  }

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-5">
      <Button className="w-max" variant="text">
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
