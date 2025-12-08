import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Edit3, Save, Shield } from 'lucide-react'
import { ProfileField } from '../components/ProfileField'
import { Badge } from '@/shared/components/Bagde'
import { useMemo, useState } from 'react'
import { useAuthStore } from '@/app/stores/auth-store'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { updateProfile } from '@/app/services/auth.service'

export const Summary = () => {
  const user = useAuthStore(state => state.user)
  const allReservations = useReservationsStore(state => state.reservations)

  const completedReservations = useMemo(
    () =>
      allReservations.filter(
        r => r.status === 'completed' && r.userId === user?.id
      ).length,
    [allReservations, user?.id]
  )

  const [editable, setEditable] = useState(false)

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  const handleEditClick = () => {
    setEditable(prev => !prev)
  }

  const handleSaveClick = () => {
    updateProfile({ name: form.name, email: form.email })
    setEditable(false)
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-5 p-5">
          <header className="flex items-center justify-between">
            <h2 className="text-cyan-400"> Información Personal </h2>

            <Button
              className="!text-cyan-400 hover:!text-cyan-300 active:scale-95"
              variant="text"
              onClick={editable ? handleSaveClick : handleEditClick}
            >
              {editable ? (
                <>
                  <Save className="mr-3" size={16} />
                  Guardar
                </>
              ) : (
                <>
                  <Edit3 className="mr-3" size={16} />
                  Editar
                </>
              )}
            </Button>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProfileField
              label="Nombre completo"
              value={form.name}
              editable={editable}
              onChange={value => setForm(prev => ({ ...prev, name: value }))}
            />
            <ProfileField
              label="Email Intergaláctico"
              value={form.email}
              editable={editable}
              onChange={value => setForm(prev => ({ ...prev, email: value }))}
            />
            <ProfileField label="ID Galáctico" value={user?.id || ''} />
            <ProfileField
              label="Fecha de registro"
              value={user?.createdAt || ''}
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 p-5">
          <h2 className="text-cyan-400"> Estado de Membresía </h2>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-5">
              <div className="flex place-items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4">
                <Shield size={32} />
              </div>

              <div className="flex flex-col gap-1">
                <span> Commander </span>
                <span className="text-sm text-gray-400">
                  {completedReservations} viajes completados
                </span>
              </div>
            </div>

            <Badge className="border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400">
              Activo
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
