import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Card } from '@/shared/components/Card'
import { X, Save, Globe } from 'lucide-react'
import {
  destinySchema,
  type DestinyFormData,
  type ActivityFormData,
} from '../schemas/destiny.schema'
import { ActivityManager } from './ActivityManager'
import type { Destiny } from '@/app/types/Destiny'
import {
  createActivity,
  deleteActivity,
  updateActivity,
} from '@/app/services/destiny.service'
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
  onSave: (data: DestinyFormData) => Promise<void>
  destiny?: Destiny | null
  mode: 'create' | 'edit'
}

const atmosphereOptions = [
  { value: 'breathable', label: 'Respirable' },
  { value: 'not breathable', label: 'No respirable' },
  { value: 'toxic', label: 'Tóxica' },
  { value: 'none', label: 'Ninguna' },
] as const

export const DestinyModal = ({
  isOpen,
  onClose,
  onSave,
  destiny,
  mode,
}: Props) => {
  const [activities, setActivities] = useState<ActivityFormData[]>([])
  const [imagesInput, setImagesInput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<DestinyFormData>({
    resolver: zodResolver(destinySchema),
    defaultValues: {
      name: '',
      description: '',
      images: [],
      gravity: 1,
      system: '',
      dayNightCycle: 24,
      atmosphere: 'breathable',
      population: 0,
      averageTemperature: 20,
      distance: 0,
      position: { x: 50, y: 50 },
      price: 0,
      activities: [],
    },
  })

  const images = watch('images')

  useEffect(() => {
    if (destiny && mode === 'edit') {
      reset({
        name: destiny.name,
        description: destiny.description,
        images: destiny.images,
        gravity: destiny.gravity,
        system: destiny.system,
        dayNightCycle: destiny.dayNightCycle,
        atmosphere: destiny.atmosphere,
        population: destiny.population,
        averageTemperature: destiny.averageTemperature,
        distance: destiny.distance,
        position: destiny.position,
        price: destiny.price,
        activities: destiny.activities,
      })
      setActivities(destiny.activities)
      setImagesInput(destiny.images.join('\n'))
    } else {
      reset({
        name: '',
        description: '',
        images: [],
        gravity: 1,
        system: '',
        dayNightCycle: 24,
        atmosphere: 'breathable',
        population: 0,
        averageTemperature: 20,
        distance: 0,
        position: { x: 50, y: 50 },
        price: 0,
        activities: [],
      })
      setActivities([])
      setImagesInput('')
    }
  }, [destiny, mode, reset, isOpen])

  useEffect(() => {
    setValue('activities', activities)
  }, [activities, setValue])

  const handleImagesChange = (value: string) => {
    setImagesInput(value)
    const imagesArray = value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)
    setValue('images', imagesArray, { shouldValidate: true })
  }

  const handleAddActivity = (activity: Omit<ActivityFormData, 'id'>) => {
    setActivities([...activities, activity])
  }

  const handleUpdateActivity = async (
    index: number,
    activity: ActivityFormData
  ) => {
    if (mode === 'edit' && destiny && activity.id) {
      const loadingToast = showLoading('Actualizando actividad...')
      try {
        await updateActivity(destiny.id, activity.id, activity)
        dismissToast(loadingToast)
        showSuccess('Actividad actualizada')
        const newActivities = [...activities]
        newActivities[index] = activity
        setActivities(newActivities)
      } catch (error) {
        dismissToast(loadingToast)
        showError('Error al actualizar actividad')
      }
    } else {
      const newActivities = [...activities]
      newActivities[index] = activity
      setActivities(newActivities)
    }
  }

  const handleDeleteActivity = async (index: number) => {
    const activity = activities[index]

    if (mode === 'edit' && destiny && 'id' in activity && activity.id) {
      const loadingToast = showLoading('Eliminando actividad...')
      try {
        await deleteActivity(destiny.id, activity.id)
        dismissToast(loadingToast)
        showSuccess('Actividad eliminada')
        setActivities(activities.filter((_, i) => i !== index))
      } catch (error) {
        dismissToast(loadingToast)
        showError('Error al eliminar actividad')
      }
    } else {
      setActivities(activities.filter((_, i) => i !== index))
    }
  }

  const handleAddActivityInEdit = async (
    activity: Omit<ActivityFormData, 'id'>
  ) => {
    if (mode === 'edit' && destiny) {
      const loadingToast = showLoading('Creando actividad...')
      try {
        const newActivity = await createActivity(destiny.id, activity)
        dismissToast(loadingToast)
        showSuccess('Actividad creada')
        setActivities([...activities, newActivity])
      } catch (error) {
        dismissToast(loadingToast)
        showError('Error al crear actividad')
      }
    } else {
      handleAddActivity(activity)
    }
  }

  const onSubmit = async (data: DestinyFormData) => {
    if (mode === 'edit' && destiny) {
      await onSave({
        ...data,
        activities: activities.length > 0 ? activities : data.activities,
      })
    } else {
      await onSave({ ...data, activities })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-h-[90vh] w-full max-w-4xl overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-6"
        >
          <div className="flex items-center justify-between border-b border-gray-700/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-cyan-500/20 p-3">
                <Globe className="text-cyan-400" size={24} />
              </div>
              <div>
                <Title className="text-2xl">
                  {mode === 'create' ? 'Nuevo Destino' : 'Editar Destino'}
                </Title>
                <p className="text-sm text-gray-400">
                  {mode === 'create'
                    ? 'Completa la información del nuevo destino'
                    : 'Modifica la información del destino'}
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
              <label className="text-sm text-gray-400">
                Nombre del Destino
              </label>
              <Input
                {...register('name')}
                placeholder="Ej: Marte"
                className="px-4!"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Sistema Estelar </label>
              <Input
                {...register('system')}
                placeholder="Ej: Sistema Solar"
                className="px-4!"
              />
              {errors.system && (
                <p className="text-sm text-red-400">{errors.system.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Descripción </label>
            <textarea
              {...register('description')}
              placeholder="Descripción detallada del destino..."
              className="min-h-24 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Gravedad (g) </label>
              <Input
                type="number"
                step="0.01"
                {...register('gravity', { valueAsNumber: true })}
                placeholder="1.0"
                className="px-4!"
              />
              {errors.gravity && (
                <p className="text-sm text-red-400">{errors.gravity.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Temperatura (°C)</label>
              <Input
                type="number"
                {...register('averageTemperature', { valueAsNumber: true })}
                placeholder="20"
                className="px-4!"
              />
              {errors.averageTemperature && (
                <p className="text-sm text-red-400">
                  {errors.averageTemperature.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Ciclo Día/Noche (h)
              </label>
              <Input
                type="number"
                {...register('dayNightCycle', { valueAsNumber: true })}
                placeholder="24"
                className="px-4!"
              />
              {errors.dayNightCycle && (
                <p className="text-sm text-red-400">
                  {errors.dayNightCycle.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Atmósfera </label>
              <select
                {...register('atmosphere')}
                className="rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
              >
                {atmosphereOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.atmosphere && (
                <p className="text-sm text-red-400">
                  {errors.atmosphere.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Población </label>
              <Input
                type="number"
                {...register('population', { valueAsNumber: true })}
                placeholder="0"
                className="px-4!"
              />
              {errors.population && (
                <p className="text-sm text-red-400">
                  {errors.population.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Distancia (millones de km)
              </label>
              <Input
                type="number"
                {...register('distance', { valueAsNumber: true })}
                placeholder="0"
                className="px-4!"
              />
              {errors.distance && (
                <p className="text-sm text-red-400">
                  {errors.distance.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Precio (créditos)</label>
              <Input
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="0"
                className="px-4!"
              />
              {errors.price && (
                <p className="text-sm text-red-400">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Posición X (0-100)
              </label>
              <Input
                type="number"
                {...register('position.x', { valueAsNumber: true })}
                placeholder="50"
                className="px-4!"
              />
              {errors.position?.x && (
                <p className="text-sm text-red-400">
                  {errors.position.x.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Posición Y (0-100)
              </label>
              <Input
                type="number"
                {...register('position.y', { valueAsNumber: true })}
                placeholder="50"
                className="px-4!"
              />
              {errors.position?.y && (
                <p className="text-sm text-red-400">
                  {errors.position.y.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">
              Imágenes (una URL por línea)
            </label>
            <textarea
              value={imagesInput}
              onChange={e => handleImagesChange(e.target.value)}
              placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg"
              className="min-h-24 rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-sm text-red-400">{errors.images.message}</p>
            )}
          </div>

          <div className="border-t border-gray-700/30 pt-4">
            <ActivityManager
              activities={activities}
              onAdd={
                mode === 'edit' ? handleAddActivityInEdit : handleAddActivity
              }
              onUpdate={handleUpdateActivity}
              onDelete={handleDeleteActivity}
              isEditing={mode === 'edit'}
              destinyId={destiny?.id}
            />
            {errors.activities && (
              <p className="mt-2 text-sm text-red-400">
                {errors.activities.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-700/30 pt-4">
            <Button
              type="button"
              variant="secondary"
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
                  ? 'Crear Destino'
                  : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
