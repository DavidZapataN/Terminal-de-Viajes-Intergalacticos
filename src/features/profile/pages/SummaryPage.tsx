import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Edit3, Save, Shield } from 'lucide-react'
import { ProfileField } from '../components/ProfileField'
import { Badge } from '@/shared/components/Bagde'
import { useState } from 'react'

export const Summary = () => {
  const [editable, setEditable] = useState(false)

  const handleEditClick = () => {
    setEditable(prev => !prev)
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
              onClick={handleEditClick}
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
              value="Comandante Stellar"
              editable={editable}
            />
            <ProfileField
              label="Email Intergaláctico"
              value="stellar@galaxy.com"
              editable={editable}
            />
            <ProfileField label="ID Galáctico" value="GAL-2024-7X9" />
            <ProfileField label="Fecha de registro" value="14/3/2023" />
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
                  24 viajes completados
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
