import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Edit3, Save, Shield } from 'lucide-react'
import { ProfileField } from '../components/ProfileField'
import { Badge } from '@/shared/components/Bagde'
import { useMemo, useState, useEffect } from 'react'
import { useAuthStore } from '@/app/stores/auth-store'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { updateProfile } from '@/app/services/auth.service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from '../schemas/update-profile.schema'
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from '@/lib/toast.config'
import { formatDate } from '@/lib/utils'

export const Summary = () => {
  const user = useAuthStore(state => state.user)
  const allReservations = useReservationsStore(state => state.reservations)

  const completedReservations = useMemo(
    () =>
      allReservations.filter(
        r => r.status === 'completed' && r.userId === user?.id.toString()
      ).length,
    [allReservations, user?.id]
  )

  const [editable, setEditable] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const watchedName = watch('name')
  const watchedEmail = watch('email')

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
      })
    }
  }, [user, reset])

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEditable(true)
  }

  const handleCancelEdit = () => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
    })
    setEditable(false)
  }

  const onSubmit = async (data: UpdateProfileFormData) => {
    const loadingToast = showLoading('Actualizando perfil...')
    try {
      await updateProfile({ name: data.name, email: data.email })
      dismissToast(loadingToast)
      showSuccess('Perfil actualizado exitosamente')
      setEditable(false)
    } catch (error) {
      dismissToast(loadingToast)
      showError(
        error instanceof Error ? error.message : 'Error al actualizar perfil'
      )
      console.error('Error al actualizar perfil:', error)
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 p-5">
            <header className="flex items-center justify-between">
              <h2 className="text-cyan-400"> Información Personal </h2>

              <div className="flex gap-2">
                {editable && (
                  <Button
                    className="text-gray-400! hover:text-gray-300! active:scale-95"
                    variant="text"
                    type="button"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  className="text-cyan-400! hover:text-cyan-300! active:scale-95"
                  variant="text"
                  type={editable ? 'submit' : 'button'}
                  onClick={!editable ? handleEditClick : undefined}
                  disabled={isSubmitting}
                >
                  {editable ? (
                    <>
                      <Save className="mr-3" size={16} />
                      {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </>
                  ) : (
                    <>
                      <Edit3 className="mr-3" size={16} />
                      Editar
                    </>
                  )}
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                {editable ? (
                  <>
                    <ProfileField
                      label="Nombre completo"
                      editable={true}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </>
                ) : (
                  <ProfileField
                    label="Nombre completo"
                    value={watchedName}
                    editable={false}
                  />
                )}
              </div>

              <div>
                {editable ? (
                  <>
                    <ProfileField
                      label="Email Intergaláctico"
                      editable={true}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </>
                ) : (
                  <ProfileField
                    label="Email Intergaláctico"
                    value={watchedEmail}
                    editable={false}
                  />
                )}
              </div>

              <ProfileField label="ID Galáctico" value={user?.id || ''} />
              <ProfileField
                label="Fecha de registro"
                value={formatDate(user?.createdAt, { format: 'medium' })}
              />
            </div>
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 p-5">
          <h2 className="text-cyan-400"> Estado de Membresía </h2>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-5">
              <div className="flex place-items-center rounded-full bg-linear-to-r from-cyan-500 to-purple-500 p-4">
                <Shield size={32} />
              </div>

              <div className="flex flex-col gap-1">
                <span> Commander </span>
                <span className="text-sm text-gray-400">
                  {completedReservations} viajes completados
                </span>
              </div>
            </div>

            <Badge className="border-cyan-400/30 bg-linear-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400">
              Activo
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
