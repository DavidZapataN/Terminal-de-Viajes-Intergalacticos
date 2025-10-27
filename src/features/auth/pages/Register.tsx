import { Shield, User, Rocket, X, Zap, Globe } from 'lucide-react'
import { Card } from '../../../shared/components/Card'
import { Input } from '../../../shared/components/Input'
import { Button } from '../../../shared/components/Button'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Title } from '@/shared/components/Title'

type Step = 1 | 2 | 3

const steps: Step[] = [1, 2, 3]

const stepInfo: Record<Step, string> = {
  1: 'Paso 1 de 3: Información Personal',
  2: 'Paso 2 de 3: Contacto Galáctico',
  3: 'Paso 3 de 3: Seguridad Cuántica',
}

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNextStep = () => {
    setCurrentStep(prevStep => {
      if (prevStep < 3) {
        return prevStep + 1
      }
      return prevStep
    })
  }

  const handleBackStep = () => {
    setCurrentStep(prevStep => {
      if (prevStep > 1) {
        return prevStep - 1
      }
      return prevStep
    })
  }

  const handleForm = () => {
    if (currentStep === 1) {
      return (
        <div className="flex flex-col gap-1.5">
          <Input
            label="ID Galáctico deseado"
            placeholder="Ingresa ID galáctico"
            icon={User}
            type="text"
          />
          <Input
            label="Nombre completo Deseado"
            placeholder="Ingresa tu nombre completo"
            icon={Shield}
            type="text"
          />
        </div>
      )
    }

    if (currentStep === 2) {
      return (
        <div className="flex flex-col gap-3">
          <Input
            label="Email Intergaláctico *"
            placeholder="Ingresa ID galáctico"
            icon={User}
            type="email"
          />
          <span className="text-xs leading-tight text-gray-400">
            Para notificaciones de viajes y comunicaciones <br /> oficiales
          </span>
          <div className="flex flex-col gap-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
            <p className="flex items-center gap-2 text-sm text-white">
              <Globe className="text-cyan-300" size={16} /> Verificación
              Intergaláctica
            </p>
            <p className="text-xs text-gray-400">
              Su email será verificado a través de la red <br />
              cuántica para garantizar la seguridad de sus <br /> viajes.
            </p>
          </div>
        </div>
      )
    }

    if (currentStep === 3) {
      return (
        <div className="flex flex-col gap-1.5">
          <Input
            label="Email Intergaláctico *"
            placeholder="Ingresa ID galáctico"
            icon={User}
            type="email"
          />
          <div className="flex flex-col gap-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
            <p className="flex items-center gap-2 text-sm text-white">
              <Zap className="text-cyan-300" size={16} /> Requisitos de
              Seguridad Cuántica
            </p>

            <ul className="flex flex-col gap-1 text-xs text-gray-400">
              <li className="flex gap-2">
                <X className="text-red-400" size={14} /> Mínimo 8 caracteres
              </li>
              <li className="flex gap-2">
                <X className="text-red-400" size={14} /> Al menos una mayúscula
              </li>
              <li className="flex gap-2">
                <X className="text-red-400" size={14} /> Al menos una minúscula
              </li>
              <li className="flex gap-2">
                <X className="text-red-400" size={14} /> Al menos un número
              </li>
              <li className="flex gap-2">
                <X className="text-red-400" size={14} /> Al menos un carácter
                especial
              </li>
              <li className="flex gap-2">
                <X className="text-red-400" size={14} /> Las contraseñas
                coinciden
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }
  return (
    <div className="flex h-full w-full flex-col place-items-center justify-center gap-4">
      <Card>
        <div className="flex w-[28rem] flex-col place-items-center gap-2.5 p-4 opacity-95">
          <header className="flex flex-col items-center gap-3.5 pb-7">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4">
              <Shield size={32} />
            </div>

            <Title>Registro Galáctico</Title>

            <span className="text-sm text-gray-400">
              Únase a la Red de Viajeros Intergalácticos
            </span>

            <div className="flex gap-2.5">
              {steps.map(step => (
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#2e3569] p-2.5 text-gray-400 ${currentStep === step ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' : ''}`}
                  key={step}
                >
                  {step}
                </div>
              ))}
            </div>

            <span className="text-sm text-gray-400">
              {stepInfo[currentStep as Step]}
            </span>
          </header>

          <form className="flex w-full flex-col gap-5">
            {handleForm()}

            <div className="flex flex-row justify-center gap-2">
              {currentStep > 1 && (
                <Button
                  className="grow-1 rounded-md border border-transparent text-center [background:linear-gradient(#111120,#111120)_padding-box,linear-gradient(45deg,#06ffa5,#8b5cf6,#06b6d4)_border-box]"
                  variant="secondary"
                  type="button"
                  onClick={handleBackStep}
                >
                  Anterior
                </Button>
              )}

              <Button
                className="flex shrink-0 grow-1 items-center justify-center gap-2 p-0.5"
                type="button"
                onClick={handleNextStep}
              >
                {currentStep === 3 && <Rocket size={16} />}
                <span className="">
                  {currentStep === 3 ? 'Completar registro' : 'Siguiente'}
                </span>
              </Button>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">
                ¿Ya tienes credenciales galácticas?
              </span>
              <Link
                to="/login"
                className="ml-1.5 cursor-pointer text-[#06b6d4] hover:text-[#54e5ff]"
              >
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
