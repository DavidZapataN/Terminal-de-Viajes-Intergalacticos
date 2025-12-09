import { useState } from 'react'
import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Card } from '@/shared/components/Card'
import { Badge } from '@/shared/components/Bagde'
import {
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Mountain,
  Droplets,
  Wind,
  Trees,
  Sun,
} from 'lucide-react'
import type { ActivityFormData } from '../schemas/destiny.schema'
import type { Activity } from '@/app/types/Activity'
import { Title } from '@/shared/components/Title'

interface Props {
  activities: (Activity | ActivityFormData)[]
  onAdd: (activity: Omit<ActivityFormData, 'id'>) => void
  onUpdate: (index: number, activity: ActivityFormData) => void
  onDelete: (index: number) => void
  isEditing: boolean
  destinyId?: number
}

const difficultyConfig = {
  easy: {
    label: 'Fácil',
    style: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  medium: {
    label: 'Medio',
    style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  hard: {
    label: 'Difícil',
    style: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
}

const categoryIcons = {
  mountain: Mountain,
  water: Droplets,
  air: Wind,
  forest: Trees,
  desert: Sun,
}

export const ActivityManager = ({
  activities,
  onAdd,
  onUpdate,
  onDelete,
}: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState<Omit<ActivityFormData, 'id'>>({
    name: '',
    description: '',
    difficulty: 'easy',
    duration: '',
    category: 'mountain',
    image: '',
  })

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      difficulty: 'easy',
      duration: '',
      category: 'mountain',
      image: '',
    })
    setEditingIndex(null)
    setIsAdding(false)
  }

  const handleAdd = () => {
    if (!form.name || !form.description || !form.duration || !form.image) return
    onAdd(form)
    resetForm()
  }

  const handleEdit = (index: number, activity: Activity | ActivityFormData) => {
    setEditingIndex(index)
    setForm({
      name: activity.name,
      description: activity.description,
      difficulty: activity.difficulty,
      duration: activity.duration,
      category: activity.category,
      image: activity.image,
    })
  }

  const handleUpdate = (index: number) => {
    if (!form.name || !form.description || !form.duration || !form.image) return
    onUpdate(index, {
      ...form,
      id: 'id' in activities[index] ? activities[index].id : undefined,
    })
    resetForm()
  }

  const CategoryIcon = (category: keyof typeof categoryIcons) => {
    const Icon = categoryIcons[category]
    return <Icon size={16} />
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Title>Actividades ({activities.length})</Title>
        {!isAdding && editingIndex === null && (
          <Button
            type="button"
            variant="text"
            className="text-cyan-400! hover:text-cyan-300!"
            onClick={() => setIsAdding(true)}
          >
            <Plus size={16} className="mr-2" />
            Agregar Actividad
          </Button>
        )}
      </div>

      <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
        {activities.map((activity, index) => (
          <Card key={index} className="p-3!">
            {editingIndex === index ? (
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Nombre de la actividad"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="px-3! py-2!"
                />
                <textarea
                  placeholder="Descripción"
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="min-h-20 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={form.difficulty}
                    onChange={e =>
                      setForm({ ...form, difficulty: e.target.value as any })
                    }
                    className="rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white"
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Medio</option>
                    <option value="hard">Difícil</option>
                  </select>
                  <select
                    value={form.category}
                    onChange={e =>
                      setForm({ ...form, category: e.target.value as any })
                    }
                    className="rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white"
                  >
                    <option value="mountain">Montaña</option>
                    <option value="water">Agua</option>
                    <option value="air">Aire</option>
                    <option value="forest">Bosque</option>
                    <option value="desert">Desierto</option>
                  </select>
                </div>
                <Input
                  placeholder="Duración (ej: 2 horas)"
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  className="px-3! py-2!"
                />
                <Input
                  placeholder="URL de la imagen"
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  className="px-3! py-2!"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={resetForm}
                  >
                    <X size={14} className="mr-1" />
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600"
                    onClick={() => handleUpdate(index)}
                  >
                    <Save size={14} className="mr-1" />
                    Guardar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-1 gap-3">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-white">
                        {activity.name}
                      </h5>
                      {CategoryIcon(activity.category)}
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-400">
                      {activity.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        className={difficultyConfig[activity.difficulty].style}
                      >
                        {difficultyConfig[activity.difficulty].label}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {activity.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="text"
                    className="p-2! text-cyan-400! hover:text-cyan-300!"
                    onClick={() => handleEdit(index, activity)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    className="p-2! text-red-400! hover:bg-red-400/20!"
                    onClick={() => onDelete(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card className="p-3!">
          <div className="flex flex-col gap-2">
            <h5 className="text-sm font-medium text-white">Nueva Actividad</h5>
            <Input
              placeholder="Nombre de la actividad"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="px-3! py-2!"
            />
            <textarea
              placeholder="Descripción"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="min-h-20 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.difficulty}
                onChange={e =>
                  setForm({ ...form, difficulty: e.target.value as any })
                }
                className="rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white"
              >
                <option value="easy">Fácil</option>
                <option value="medium">Medio</option>
                <option value="hard">Difícil</option>
              </select>
              <select
                value={form.category}
                onChange={e =>
                  setForm({ ...form, category: e.target.value as any })
                }
                className="rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white"
              >
                <option value="mountain">Montaña</option>
                <option value="water">Agua</option>
                <option value="air">Aire</option>
                <option value="forest">Bosque</option>
                <option value="desert">Desierto</option>
              </select>
            </div>
            <Input
              placeholder="Duración (ej: 2 horas)"
              value={form.duration}
              onChange={e => setForm({ ...form, duration: e.target.value })}
              className="px-3! py-2!"
            />
            <Input
              placeholder="URL de la imagen"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="px-3! py-2!"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="text"
                className="flex-1"
                onClick={resetForm}
              >
                <X size={14} className="mr-1" />
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1 bg-cyan-500 hover:bg-cyan-600"
                onClick={handleAdd}
              >
                <Plus size={14} className="mr-1" />
                Agregar
              </Button>
            </div>
          </div>
        </Card>
      )}

      {activities.length === 0 && !isAdding && (
        <p className="py-4 text-center text-sm text-gray-500">
          No hay actividades agregadas
        </p>
      )}
    </div>
  )
}
