import { Eye, Lock, Rocket, Shield, User, Zap } from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { Input } from '@/shared/components/Input'
import { Button } from '@/shared/components/Button'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Title } from '@/shared/components/Title'
import { useState } from 'react'
import { useAuthStore } from '@/app/stores/auth-store'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const search = useSearch({ from: '/login' })

  const login = useAuthStore(state => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(email.trim(), password.trim())

    if (success) {
      const user = useAuthStore.getState().currentUser
      const redirectTo = (search as { from?: string }).from

      if (redirectTo) {
        navigate({ to: redirectTo })
      } else {
        if (user?.role === 'admin') navigate({ to: '/admin/resumen' })
        else navigate({ to: '/' })
      }
    } else {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <div className="flex h-full w-full flex-col place-items-center justify-center gap-4">
      <Card>
        <div className="flex w-[28rem] flex-col place-items-center gap-2.5 p-4">
          <header className="flex flex-col items-center gap-3.5 pb-18">
            <div className="flex place-items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4">
              <Rocket size={32} />
            </div>

            <Title>Terminal de Viajes Intergalácticos</Title>

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

          <form
            onSubmit={handleSubmit}
            className="mb-2.5 flex w-full flex-col gap-5"
          >
            <Input
              label="ID Gálactico"
              placeholder="Ingresa tu ID"
              icon={User}
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña Galáctica"
              placeholder="Ingresa tu contraseña"
              icon={Lock}
              actionIcon={Eye}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onAction={() => setShowPassword(!showPassword)}
              required
            />

            <Button type="submit">
              <Rocket className="mr-5 inline-block" size={16} />
              Iniciar sesión
            </Button>
          </form>

          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400">¿Nuevo en la galaxia?</span>
            <Link
              to="/registro"
              className="ml-1.5 cursor-pointer text-[#06b6d4] hover:text-[#54e5ff]"
            >
              Registrar Credenciales
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
