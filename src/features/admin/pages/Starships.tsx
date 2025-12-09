import { useState } from 'react'
import { StarshipsList } from '../components/StarshipsList'
import { StarshipModal } from '../components/StarshipModal'
import { Title } from '@/shared/components/Title'
import { Button } from '@/shared/components/Button'
import { Plus } from 'lucide-react'
import { useStarshipsStore } from '@/app/stores/starship-store'
import type { Starship } from '@/app/types/Starship'
import type { StarshipFormData } from '../schemas/starship.schema'
import {
  createStarship,
  updateStarship,
  deleteStarship,
} from '@/app/services/starship.service'
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from '@/lib/toast.config'

export const Starships = () => {
  const ships = useStarshipsStore(state => state.starships)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedShip, setSelectedShip] = useState<Starship | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

  const handleCreate = () => {
    setSelectedShip(null)
    setModalMode('create')
    setIsModalOpen(true)
  }

  const handleEdit = (ship: Starship) => {
    setSelectedShip(ship)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleDelete = async (shipId: number) => {
    const loadingToast = showLoading('Eliminando nave...')
    try {
      await deleteStarship(shipId)
      dismissToast(loadingToast)
      showSuccess('Nave eliminada exitosamente')
    } catch (error) {
      dismissToast(loadingToast)
      showError(
        error instanceof Error ? error.message : 'Error al eliminar nave'
      )
    }
  }

  const handleSave = async (data: StarshipFormData) => {
    const loadingToast = showLoading(
      modalMode === 'create' ? 'Creando nave...' : 'Actualizando nave...'
    )
    try {
      if (modalMode === 'create') {
        await createStarship(data)
        dismissToast(loadingToast)
        showSuccess('Nave creada exitosamente')
      } else if (selectedShip) {
        const { cabins, ...updateData } = data
        await updateStarship(selectedShip.id, updateData)
        dismissToast(loadingToast)
        showSuccess('Nave actualizada exitosamente')
      }
      setIsModalOpen(false)
      setSelectedShip(null)
    } catch (error) {
      dismissToast(loadingToast)
      showError(
        error instanceof Error
          ? error.message
          : `Error al ${modalMode === 'create' ? 'crear' : 'actualizar'} nave`
      )
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <Title>Gestión de Naves</Title>

        <Button
          className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 active:scale-95"
          onClick={handleCreate}
        >
          <Plus className="mr-3" size={16} />
          Agregar Nave
        </Button>
      </header>

      <StarshipsList
        ships={ships}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StarshipModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedShip(null)
        }}
        onSave={handleSave}
        starship={selectedShip}
        mode={modalMode}
      />
    </div>
  )
}
