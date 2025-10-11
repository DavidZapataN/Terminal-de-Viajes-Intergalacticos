import { Eye, Lock, Mail, Rocket, User } from 'lucide-react'
import { Card } from '../../../shared/components/Card'
import { Input } from '../../../shared/components/Input'
import { Button } from '../../../shared/components/Button'

export const Register = () => {
  return (
    <div className="flex h-full w-full flex-col place-items-center justify-center gap-4">
      <Card>
        <div className="flex w-full flex-col place-items-center gap-2.5 p-4">
          <header className="flex flex-col items-center gap-3.5 pb-7">
            <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Registro de Usuario
            </h2>
          </header>

          <form className="flex w-full flex-col gap-5">
            <Input
              label="Nombre"
              placeholder="Ingresa tu nombre"
              icon={User}
              type="text"
            />
            <Input
              label="Correo Electrónico"
              placeholder="Ingresa tu correo"
              icon={Mail}
              type="email"
            />
            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              icon={Lock}
              actionIcon={Eye}
              type="password"
            />

            <Button>
              <Rocket className="mr-5 inline-block" size={16} />
              Registrarse
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
