import { useState } from 'react'
import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { Card } from '@/shared/components/Card'
import { Edit, Trash2, Plus, Save, X } from 'lucide-react'
import type { CabinFormData } from '../schemas/starship.schema'
import type { Cabin } from '@/app/types/Cabin'
import { Title } from '@/shared/components/Title'

interface Props {
  cabins: (Cabin | CabinFormData)[]
  onAdd: (cabin: Omit<CabinFormData, 'id'>) => void
  onUpdate: (index: number, cabin: CabinFormData) => void
  onDelete: (index: number) => void
  isEditing: boolean
  starshipId?: number
  errors?: Record<
    number,
    { name?: string; description?: string; price?: string }
  >
}

export const CabinManager = ({
  cabins,
  onAdd,
  onUpdate,
  onDelete,
  errors = {},
}: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState<Omit<CabinFormData, 'id'>>({
    name: '',
    description: '',
    price: 0,
  })

  const resetForm = () => {
    setForm({ name: '', description: '', price: 0 })
    setEditingIndex(null)
    setIsAdding(false)
  }

  const handleAdd = () => {
    if (!form.name || !form.description || form.price <= 0) return
    onAdd(form)
    resetForm()
  }

  const handleEdit = (index: number, cabin: Cabin | CabinFormData) => {
    setEditingIndex(index)
    setForm({
      name: cabin.name,
      description: cabin.description,
      price: cabin.price,
    })
  }

  const handleUpdate = (index: number) => {
    if (!form.name || !form.description || form.price <= 0) return
    onUpdate(index, {
      ...form,
      id: 'id' in cabins[index] ? cabins[index].id : undefined,
    })
    resetForm()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Title>Cabinas ({cabins.length})</Title>
        {!isAdding && editingIndex === null && (
          <Button
            type="button"
            variant="text"
            className="text-cyan-400! hover:text-cyan-300!"
            onClick={() => setIsAdding(true)}
          >
            <Plus size={16} className="mr-2" />
            Agregar Cabina
          </Button>
        )}
      </div>

      <div className="flex max-h-60 flex-col gap-2 overflow-y-auto">
        {cabins.map((cabin, index) => (
          <Card key={index} className="p-3!">
            {editingIndex === index ? (
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Nombre de la cabina"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="px-3! py-2!"
                />
                <Input
                  placeholder="Descripción"
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="px-3! py-2!"
                />
                <Input
                  type="number"
                  placeholder="Precio"
                  value={form.price}
                  onChange={e =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
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
                    onClick={() => handleUpdate(index)}
                  >
                    <Save size={14} className="mr-1" />
                    Guardar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h5 className="font-medium text-white">{cabin.name}</h5>
                  <p className="text-sm text-gray-400">{cabin.description}</p>
                  <p className="mt-1 text-sm font-medium text-cyan-400">
                    ${cabin.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="text"
                    className="p-2! text-cyan-400 hover:text-cyan-300!"
                    onClick={() => handleEdit(index, cabin)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="p-2! text-red-400! hover:bg-red-400/20!"
                    onClick={() => onDelete(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
            {errors[index] && (
              <div className="mt-2 flex flex-col gap-1">
                {errors[index].name && (
                  <p className="text-xs text-red-400">{errors[index].name}</p>
                )}
                {errors[index].description && (
                  <p className="text-xs text-red-400">
                    {errors[index].description}
                  </p>
                )}
                {errors[index].price && (
                  <p className="text-xs text-red-400">{errors[index].price}</p>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card className="p-3!">
          <div className="flex flex-col gap-2">
            <h5 className="text-sm font-medium text-white">Nueva Cabina</h5>
            <Input
              placeholder="Nombre de la cabina"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="px-3! py-2!"
            />
            <Input
              placeholder="Descripción"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="px-3! py-2!"
            />
            <Input
              type="number"
              placeholder="Precio"
              value={form.price || ''}
              onChange={e =>
                setForm({ ...form, price: Number(e.target.value) })
              }
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

      {cabins.length === 0 && !isAdding && (
        <p className="py-4 text-center text-sm text-gray-500">
          No hay cabinas agregadas
        </p>
      )}
    </div>
  )
}
