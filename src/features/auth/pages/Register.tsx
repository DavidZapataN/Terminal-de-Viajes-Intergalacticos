import { Shield, User, Rocket, X, Zap, Mail, Check, Home } from 'lucide-react'
import { Card } from '../../../shared/components/Card'
import { Input } from '../../../shared/components/Input'
import { Button } from '../../../shared/components/Button'
import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Title } from '@/shared/components/Title'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.schema'
import {
  dismissToast,
  showError,
  showLoading,
  showSuccess,
} from '@/lib/toast.config'
import { registerUser } from '@/app/services/auth.service'

type Step = 1 | 2

export const Register = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<Step>(1)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    watch,
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const password = watch('password', '')

  const passwordValidations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
    passwordsMatch:
      password.length > 0 && watch('confirmPassword', '') === password,
  }

  const handleNextStep = async () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = await trigger(['fullName', 'email'])
    }

    if (isValid && currentStep < 2) {
      setCurrentStep(prev => (prev + 1) as Step)
    }
  }

  const handleBackStep = () => {
    setCurrentStep(prev => {
      if (prev > 1) {
        return (prev - 1) as Step
      }
      return prev
    })
  }

  const onSubmit = async (data: RegisterFormData) => {
    const loadingToast = showLoading('Registrando en la red galáctica...')
    try {
      const user = await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
      })
      dismissToast(loadingToast)
      showSuccess(
        `¡Bienvenido a la red galáctica, ${user.name || 'Comandante'}!`
      )
      navigate({ to: '/' })
    } catch (error) {
      dismissToast(loadingToast)
      showError('Error al registrar en la red galáctica. Intenta nuevamente.')
      console.error('Error de registro:', error)
    }
  }

  const handleForm = () => {
    if (currentStep === 1) {
      return (
        <div className="flex flex-col gap-5" key="step-1">
          <div>
            <Input
              key="fullName-input"
              label="Nombre completo"
              placeholder="Ingresa tu nombre completo"
              icon={User}
              type="text"
              autoComplete="name"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <Input
              key="email-input"
              label="Email Intergaláctico"
              placeholder="Ingresa tu email galáctico"
              icon={Mail}
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
        </div>
      )
    }

    if (currentStep === 2) {
      return (
        <div className="flex flex-col gap-5" key="step-2">
          <div>
            <Input
              key="password-input"
              label="Contraseña Cuántica"
              placeholder="Ingresa tu contraseña cuántica"
              icon={Shield}
              type="password"
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && touchedFields.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Input
              key="confirmPassword-input"
              label="Confirmar Contraseña"
              placeholder="Confirma tu contraseña"
              icon={Shield}
              type="password"
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && touchedFields.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
            <p className="flex items-center gap-2 text-sm text-white">
              <Zap className="text-cyan-300" size={16} /> Requisitos de
              Seguridad Cuántica
            </p>

            <ul className="flex flex-col gap-1 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                {passwordValidations.minLength ? (
                  <Check className="text-green-400" size={14} />
                ) : (
                  <X className="text-red-400" size={14} />
                )}
                <span
                  className={
                    passwordValidations.minLength ? 'text-green-400' : ''
                  }
                >
                  Mínimo 8 caracteres
                </span>
              </li>
              <li className="flex items-center gap-2">
                {passwordValidations.hasUppercase ? (
                  <Check className="text-green-400" size={14} />
                ) : (
                  <X className="text-red-400" size={14} />
                )}
                <span
                  className={
                    passwordValidations.hasUppercase ? 'text-green-400' : ''
                  }
                >
                  Al menos una mayúscula
                </span>
              </li>
              <li className="flex items-center gap-2">
                {passwordValidations.hasLowercase ? (
                  <Check className="text-green-400" size={14} />
                ) : (
                  <X className="text-red-400" size={14} />
                )}
                <span
                  className={
                    passwordValidations.hasLowercase ? 'text-green-400' : ''
                  }
                >
                  Al menos una minúscula
                </span>
              </li>
              <li className="flex items-center gap-2">
                {passwordValidations.hasNumber ? (
                  <Check className="text-green-400" size={14} />
                ) : (
                  <X className="text-red-400" size={14} />
                )}
                <span
                  className={
                    passwordValidations.hasNumber ? 'text-green-400' : ''
                  }
                >
                  Al menos un número
                </span>
              </li>
              <li className="flex items-center gap-2">
                {passwordValidations.hasSpecial ? (
                  <Check className="text-green-400" size={14} />
                ) : (
                  <X className="text-red-400" size={14} />
                )}
                <span
                  className={
                    passwordValidations.hasSpecial ? 'text-green-400' : ''
                  }
                >
                  Al menos un carácter especial
                </span>
              </li>
              <li className="flex items-center gap-2">
                {passwordValidations.passwordsMatch ? (
                  <Check className="text-green-400" size={14} />
                ) : (
                  <X className="text-red-400" size={14} />
                )}
                <span
                  className={
                    passwordValidations.passwordsMatch ? 'text-green-400' : ''
                  }
                >
                  Las contraseñas coinciden
                </span>
              </li>
            </ul>
          </div>
        </div>
      )
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
          <div className="flex w-md flex-col place-items-center gap-2.5 p-4 opacity-95">
            <header className="flex flex-col items-center gap-3.5">
              <div className="rounded-full bg-linear-to-r from-cyan-500 to-purple-500 p-4">
                <Shield size={32} />
              </div>

              <Title>Registro Galáctico</Title>

              <span className="text-sm text-gray-400">
                Únase a la Red de Viajeros Intergalácticos
              </span>
            </header>

            <form
              className="flex w-full flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              {handleForm()}

              <div className="flex flex-row justify-center gap-2">
                {currentStep > 1 && (
                  <Button
                    className="holo-border grow rounded-md text-center"
                    variant="secondary"
                    type="button"
                    onClick={handleBackStep}
                  >
                    Anterior
                  </Button>
                )}

                {currentStep < 2 ? (
                  <Button
                    className="flex shrink-0 grow items-center justify-center gap-2 p-0.5"
                    type="button"
                    onClick={handleNextStep}
                  >
                    <span>Siguiente</span>
                  </Button>
                ) : (
                  <Button
                    className="flex shrink-0 grow items-center justify-center gap-2 p-0.5"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <Rocket size={16} />
                    <span>
                      {isSubmitting ? 'Registrando...' : 'Completar registro'}
                    </span>
                  </Button>
                )}
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">
                  ¿Ya tienes credenciales galácticas?
                </span>
                <Link
                  to="/login"
                  search={{ from: '' }}
                  className="ml-1.5 cursor-pointer text-[#06b6d4] hover:text-[#54e5ff]"
                >
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
