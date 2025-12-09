import { useState } from 'react'
import { DestinyCard } from '../components/DestinyCard'
import { DestinyModal } from '../components/DestinyModal'
import { Title } from '@/shared/components/Title'
import { Button } from '@/shared/components/Button'
import { Plus } from 'lucide-react'
import { useDestinyStore } from '@/app/stores/destiny-store'
import type { Destiny } from '@/app/types/Destiny'
import type { DestinyFormData } from '../schemas/destiny.schema'
import {
  createDestiny,
  updateDestiny,
  deleteDestiny,
} from '@/app/services/destiny.service'
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from '@/lib/toast.config'

export const Planets = () => {
  const destinies = useDestinyStore(state => state.destinies)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDestiny, setSelectedDestiny] = useState<Destiny | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

  const handleCreate = () => {
    setSelectedDestiny(null)
    setModalMode('create')
    setIsModalOpen(true)
  }

  const handleEdit = (destiny: Destiny) => {
    setSelectedDestiny(destiny)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleDelete = async (destinyId: number) => {
    const loadingToast = showLoading('Eliminando destino...')
    try {
      await deleteDestiny(destinyId)
      dismissToast(loadingToast)
      showSuccess('Destino eliminado exitosamente')
    } catch (error) {
      dismissToast(loadingToast)
      showError(
        error instanceof Error ? error.message : 'Error al eliminar destino'
      )
    }
  }

  const handleSave = async (data: DestinyFormData) => {
    const loadingToast = showLoading(
      modalMode === 'create' ? 'Creando destino...' : 'Actualizando destino...'
    )
    try {
      if (modalMode === 'create') {
        await createDestiny(data)
        dismissToast(loadingToast)
        showSuccess('Destino creado exitosamente')
      } else if (selectedDestiny) {
        const { activities, ...updateData } = data
        await updateDestiny(selectedDestiny.id, updateData)
        dismissToast(loadingToast)
        showSuccess('Destino actualizado exitosamente')
      }
      setIsModalOpen(false)
      setSelectedDestiny(null)
    } catch (error) {
      dismissToast(loadingToast)
      showError(
        error instanceof Error
          ? error.message
          : `Error al ${modalMode === 'create' ? 'crear' : 'actualizar'} destino`
      )
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <Title>Gestión de Destinos</Title>

        <Button
          className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 active:scale-95"
          onClick={handleCreate}
        >
          <Plus className="mr-3" size={16} />
          Agregar Destino
        </Button>
      </header>

      <div className="flex flex-col gap-4">
        {destinies.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            No hay destinos registrados
          </div>
        ) : (
          destinies.map(destiny => (
            <DestinyCard
              key={destiny.id}
              destiny={destiny}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <DestinyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedDestiny(null)
        }}
        onSave={handleSave}
        destiny={selectedDestiny}
        mode={modalMode}
      />
    </div>
  )
}
