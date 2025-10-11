import { Shield, User } from 'lucide-react'
import { Card } from '../../../shared/components/Card'
import { Input } from '../../../shared/components/Input'
import { Button } from '../../../shared/components/Button'
import { useState } from 'react'

interface Props {
  setActivePage: (page: 'login' | 'register') => void
}

type Step = 1 | 2 | 3

const steps: Step[] = [1, 2, 3]

const stepInfo: Record<Step, string> = {
  1: 'Paso 1 de 3: Información Personal',
  2: 'Paso 2 de 3: Contacto Galáctico',
  3: 'Paso 3 de 3: Seguridad Cuántica',
}

export const Register = ({ setActivePage }: Props) => {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="flex h-full w-full flex-col place-items-center justify-center gap-4">
      <Card>
        <div className="flex w-[28rem] flex-col place-items-center gap-2.5 p-4 opacity-95">
          <header className="flex flex-col items-center gap-3.5 pb-7">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4">
              <Shield size={32} />
            </div>

            <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Registro Galáctico
            </h2>

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
              type="email"
            />

            <Button type="button" onClick={() => setCurrentStep(2)}>
              Siguiente
            </Button>

            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">
                ¿Ya tienes credenciales galácticas?
              </span>
              <a
                onClick={() => setActivePage('login')}
                href="#"
                className="ml-1.5 cursor-pointer text-[#06b6d4] hover:text-[#54e5ff]"
              >
                Iniciar sesión
              </a>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
