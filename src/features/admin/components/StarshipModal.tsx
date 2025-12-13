import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Card } from '@/shared/components/Card'
import { X, Save, Rocket } from 'lucide-react'
import {
  starshipSchema,
  type StarshipFormData,
  type CabinFormData,
} from '../schemas/starship.schema'
import { CabinManager } from './CabinManager'
import type { Starship } from '@/app/types/Starship'
import {
  createCabin,
  deleteCabin,
  updateCabin,
} from '@/app/services/starship.service'
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from '@/lib/toast.config'
import { Title } from '@/shared/components/Title'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: (data: StarshipFormData) => Promise<void>
  starship?: Starship | null
  mode: 'create' | 'edit'
}

const statusOptions = [
  { value: 'active', label: 'Activa' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'unavailable', label: 'No disponible' },
] as const

export const StarshipModal = ({
  isOpen,
  onClose,
  onSave,
  starship,
  mode,
}: Props) => {
  const [cabins, setCabins] = useState<CabinFormData[]>([])
  const [amenitiesInput, setAmenitiesInput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<StarshipFormData>({
    resolver: zodResolver(starshipSchema),
    defaultValues: {
      name: '',
      class: '',
      capacity: 0,
      status: 'active',
      amenities: [],
      cabins: [],
    },
  })

  const amenities = watch('amenities')

  useEffect(() => {
    if (starship && mode === 'edit') {
      reset({
        name: starship.name,
        class: starship.class,
        capacity: starship.capacity,
        status: starship.status,
        amenities: starship.amenities,
        cabins: starship.cabins,
      })
      setCabins(starship.cabins)
      setAmenitiesInput(starship.amenities.join(', '))
    } else {
      reset({
        name: '',
        class: '',
        capacity: 0,
        status: 'active',
        amenities: [],
        cabins: [],
      })
      setCabins([])
      setAmenitiesInput('')
    }
  }, [starship, mode, reset, isOpen])

  useEffect(() => {
    setValue('cabins', cabins)
  }, [cabins, setValue])

  const handleAmenitiesChange = (value: string) => {
    setAmenitiesInput(value)
    const amenitiesArray = value
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0)
    setValue('amenities', amenitiesArray, { shouldValidate: true })
  }

  const handleAddCabin = (cabin: Omit<CabinFormData, 'id'>) => {
    setCabins([...cabins, cabin])
  }

  const handleUpdateCabin = async (index: number, cabin: CabinFormData) => {
    if (mode === 'edit' && starship && cabin.id) {
      const loadingToast = showLoading('Actualizando cabina...')
      try {
        await updateCabin(starship.id, cabin.id, cabin)
        dismissToast(loadingToast)
        showSuccess('Cabina actualizada')
        const newCabins = [...cabins]
        newCabins[index] = cabin
        setCabins(newCabins)
      } catch (error) {
        dismissToast(loadingToast)
        showError('Error al actualizar cabina')
      }
    } else {
      const newCabins = [...cabins]
      newCabins[index] = cabin
      setCabins(newCabins)
    }
  }

  const handleDeleteCabin = async (index: number) => {
    const cabin = cabins[index]

    if (mode === 'edit' && starship && 'id' in cabin && cabin.id) {
      const loadingToast = showLoading('Eliminando cabina...')
      try {
        await deleteCabin(starship.id, cabin.id)
        dismissToast(loadingToast)
        showSuccess('Cabina eliminada')
        setCabins(cabins.filter((_, i) => i !== index))
      } catch (error) {
        dismissToast(loadingToast)
        showError('Error al eliminar cabina')
      }
    } else {
      setCabins(cabins.filter((_, i) => i !== index))
    }
  }

  const onSubmit = async (data: StarshipFormData) => {
    if (mode === 'edit' && starship) {
      await onSave({ ...data, cabins: [] })
    } else {
      await onSave({ ...data, cabins })
    }
  }

  const handleAddCabinInEdit = async (cabin: Omit<CabinFormData, 'id'>) => {
    if (mode === 'edit' && starship) {
      const loadingToast = showLoading('Creando cabina...')
      try {
        const newCabin = await createCabin(starship.id, cabin)
        dismissToast(loadingToast)
        showSuccess('Cabina creada')
        setCabins([...cabins, newCabin])
      } catch (error) {
        dismissToast(loadingToast)
        showError('Error al crear cabina')
      }
    } else {
      handleAddCabin(cabin)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-h-[90vh] w-full max-w-3xl overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-6"
        >
          <div className="flex items-center justify-between border-b border-gray-700/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-cyan-500/20 p-3">
                <Rocket className="text-cyan-400" size={24} />
              </div>
              <div>
                <Title className="text-2xl">
                  {mode === 'create' ? 'Nueva Nave Estelar' : 'Editar Nave'}
                </Title>
                <p className="text-sm text-gray-400">
                  {mode === 'create'
                    ? 'Completa la información de la nueva nave'
                    : 'Modifica la información de la nave'}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="text"
              onClick={onClose}
              className="p-2! text-gray-400! hover:text-white!"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Nombre de la Nave</label>
              <Input
                {...register('name')}
                placeholder="Ej: USS Enterprise"
                className="px-4!"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Clase </label>
              <Input
                {...register('class')}
                placeholder="Ej: Crucero Galaxy"
                className="px-4!"
              />
              {errors.class && (
                <p className="text-sm text-red-400">{errors.class.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Capacidad </label>
              <Input
                type="number"
                {...register('capacity', { valueAsNumber: true })}
                placeholder="1000"
                className="px-4!"
              />
              {errors.capacity && (
                <p className="text-sm text-red-400">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Estado </label>
              <select
                {...register('status')}
                className="rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-sm text-red-400">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">
              Comodidades (separadas por comas)
            </label>
            <Input
              value={amenitiesInput}
              onChange={e => handleAmenitiesChange(e.target.value)}
              placeholder="Ej: WiFi Intergaláctico, Gravedad Artificial, Cinema 4D"
              className="px-4!"
            />
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            )}
            {errors.amenities && (
              <p className="text-sm text-red-400">{errors.amenities.message}</p>
            )}
          </div>

          <div className="border-t border-gray-700/30 pt-4">
            <CabinManager
              cabins={cabins}
              onAdd={mode === 'edit' ? handleAddCabinInEdit : handleAddCabin}
              onUpdate={handleUpdateCabin}
              onDelete={handleDeleteCabin}
              isEditing={mode === 'edit'}
              starshipId={starship?.id}
            />
            {errors.cabins && (
              <p className="mt-2 text-sm text-red-400">
                {errors.cabins.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-700/30 pt-4">
            <Button
              type="button"
              variant="text"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
            >
              <Save className="mr-2" size={16} />
              {isSubmitting
                ? 'Guardando...'
                : mode === 'create'
                  ? 'Crear Nave'
                  : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
