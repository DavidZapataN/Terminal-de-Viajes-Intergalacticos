import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Input } from '@/shared/components/Input'
import { Lock, Eye, EyeOff, Shield, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from '../schemas/change-password.schema'
import { changePassword } from '@/app/services/auth.service'
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from '@/lib/toast.config'

export const SecurityPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const newPassword = watch('newPassword')

  const passwordRequirements = [
    {
      met: newPassword.length >= 6,
      text: 'Al menos 6 caracteres',
    },
    {
      met: /[A-Z]/.test(newPassword),
      text: 'Una letra mayúscula',
    },
    {
      met: /[a-z]/.test(newPassword),
      text: 'Una letra minúscula',
    },
    {
      met: /[0-9]/.test(newPassword),
      text: 'Un número',
    },
    {
      met: /[^A-Za-z0-9]/.test(newPassword),
      text: 'Un carácter especial',
    },
  ]

  const onSubmit = async (data: ChangePasswordFormData) => {
    const loadingToast = showLoading('Cambiando contraseña...')
    try {
      await changePassword(data.currentPassword, data.newPassword)
      dismissToast(loadingToast)
      showSuccess('Contraseña actualizada exitosamente')
      reset()
    } catch (error) {
      dismissToast(loadingToast)
      showError(
        error instanceof Error
          ? error.message
          : 'Error al cambiar la contraseña'
      )
      console.error('Error al cambiar contraseña:', error)
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <Card>
        <div className="flex flex-col gap-2 p-4">
          <header className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-cyan-500/20 p-3">
              <Shield className="text-cyan-400" size={24} />
            </div>
            <div>
              <h2 className="text-cyan-400">Seguridad de la Cuenta</h2>
              <p className="text-sm text-gray-400">
                Actualiza tu contraseña regularmente para mantener tu cuenta
                segura
              </p>
            </div>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Contraseña Actual</label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <Lock className="text-gray-500" size={18} />
                </div>
                <Input
                  icon={Lock}
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña actual"
                  className="pr-12! pl-12!"
                  {...register('currentPassword')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-cyan-400"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-400">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Nueva Contraseña</label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <Lock className="text-gray-500" size={18} />
                </div>
                <Input
                  icon={Lock}
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu nueva contraseña"
                  className="pr-12! pl-12!"
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-cyan-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-400">
                  {errors.newPassword.message}
                </p>
              )}

              {newPassword && (
                <div className="mt-2 flex flex-col gap-1 rounded-lg border border-gray-700/50 bg-gray-800/30 p-4">
                  <p className="text-sm font-medium text-gray-300">
                    Requisitos de contraseña:
                  </p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2
                          size={16}
                          className={
                            req.met ? 'text-green-400' : 'text-gray-600'
                          }
                        />
                        <span
                          className={`text-sm ${req.met ? 'text-green-400' : 'text-gray-500'}`}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <Lock className="text-gray-500" size={18} />
                </div>
                <Input
                  icon={Lock}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirma tu nueva contraseña"
                  className="pr-12! pl-12!"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-cyan-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-700/30 pt-4">
              <Button
                type="button"
                variant="text"
                onClick={() => reset()}
                disabled={isSubmitting}
                className="hover:border-gray-500"
              >
                Limpiar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                {isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
