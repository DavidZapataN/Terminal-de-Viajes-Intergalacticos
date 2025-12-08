import {
  Eye,
  EyeOff,
  Home,
  Lock,
  Rocket,
  Shield,
  User,
  Zap,
} from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { Input } from '@/shared/components/Input'
import { Button } from '@/shared/components/Button'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Title } from '@/shared/components/Title'
import { useState } from 'react'
import { login } from '@/app/services/auth.service'
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from '@/lib/toast.config'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'

export const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const search = useSearch({ from: '/login' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginFormData) => {
    const loadingToast = showLoading('Conectando con la red galáctica...')
    try {
      const user = await login(data)
      dismissToast(loadingToast)

      if (user) {
        showSuccess(`¡Bienvenido de vuelta, ${user?.name || 'Comandante'}!`)
        const redirectTo = (search as { from?: string }).from
        if (redirectTo) {
          navigate({ to: redirectTo })
        } else {
          if (user?.role === 'admin') navigate({ to: '/admin/resumen' })
          else navigate({ to: '/' })
        }
      } else {
        showError('Credenciales incorrectas. Verifica tu email y contraseña.')
      }
    } catch (error) {
      dismissToast(loadingToast)
      showError('Error al conectar con el servidor. Intenta nuevamente.')
      console.error('Login error:', error)
    }
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center overflow-y-auto py-8">
      <div className="flex w-full flex-col items-center gap-4 px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-cyan-400"
        >
          <Home size={16} />
          <span>Volver al inicio</span>
        </Link>
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
              onSubmit={handleSubmit(onSubmit)}
              className="mb-2.5 flex w-full flex-col gap-5"
            >
              <div>
                <Input
                  label="Email Gálactico"
                  placeholder="Ingresa tu email"
                  icon={User}
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label="Contraseña Galáctica"
                  placeholder="Ingresa tu contraseña"
                  icon={Lock}
                  actionIcon={showPassword ? EyeOff : Eye}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  onAction={() => setShowPassword(!showPassword)}
                  {...register('password')}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting}>
                <Rocket className="mr-5 inline-block" size={16} />
                {isSubmitting ? 'Conectando...' : 'Iniciar sesión'}
              </Button>
            </form>

            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">
                ¿Nuevo en la galaxia?
              </span>
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
    </div>
  )
}
