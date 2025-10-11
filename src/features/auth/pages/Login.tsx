import { Eye, Lock, Rocket, Shield, User, Zap } from 'lucide-react'
import { Card } from '../../../shared/components/Card'
import { Input } from '../../../shared/components/Input'
import { Button } from '../../../shared/components/Button'

interface Props {
  setActivePage: (page: 'login' | 'register') => void
}

export const Login = ({ setActivePage }: Props) => {
  return (
    <div className="flex h-full w-full flex-col place-items-center justify-center gap-4">
      <Card>
        <div className="flex w-[28rem] flex-col place-items-center gap-2.5 p-4">
          <header className="flex flex-col items-center gap-3.5 pb-18">
            <div className="flex place-items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4">
              <Rocket size={32} />
            </div>

            <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Terminal de Viajes Intergalácticos
            </h2>

            <span className="text-sm text-gray-400">
              Acceso Seguro a la Red Galáctica
            </span>

            <div className="flex gap-5">
              <div className="flex items-center gap-1.5 text-[12px] text-[#41ac7f]">
                <Shield size={12} />
                Encriptado
              </div>

              <div className="flex items-center gap-1.5 text-[12px] text-[#3d8fd3]">
                <Zap size={12} />
                Quantum Auth
              </div>
            </div>
          </header>

          <form className="mb-2.5 flex w-full flex-col gap-5">
            <Input
              label="ID Gálactico"
              placeholder="Ingresa tu ID"
              icon={User}
              type="text"
            />
            <Input
              label="Contraseña Galáctica"
              placeholder="Ingresa tu contraseña"
              icon={Lock}
              actionIcon={Eye}
              type="password"
            />

            <Button>
              <Rocket className="mr-5 inline-block" size={16} />
              Iniciar sesión
            </Button>
          </form>

          <span className="text-sm text-gray-400">
            ¿Nuevo en la galaxia?
            <a
              onClick={() => setActivePage('register')}
              href="#"
              className="ml-1.5 cursor-pointer text-[#06b6d4] hover:text-[#54e5ff]"
            >
              Registrar credenciales
            </a>
          </span>
        </div>
      </Card>
    </div>
  )
}
