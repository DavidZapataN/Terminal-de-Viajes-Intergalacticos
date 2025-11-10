import { useState } from 'react'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Edit, Trash2 } from 'lucide-react'
import type { Planet } from '@/app/types/Planet'

export interface PlanetOld {
  id: string
  name: string
  system: string
  description: string
  climate: string
  activities: string[]
  rating: number
  reviews: number
  image: string
  distance: number // in light years
  price: number // in galactic credits
  position: { x: number; y: number } // for map positioning
}

interface Props {
  planet: Planet
  onUpdate?: (updated: Planet) => void
  onDelete?: (planetId: string) => void
}

export const PlanetCard = ({ planet, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    system: planet.system,
    description: planet.description,
    climate: planet.climate,
    distance: String(planet.distance),
    price: String(planet.price),
  })

  const startEdit = () => {
    setForm({
      system: planet.system,
      description: planet.description,
      climate: planet.climate,
      distance: String(planet.distance),
      price: String(planet.price),
    })
    setEditing(true)
  }

  const cancel = () => setEditing(false)

  const save = () => {
    const updated: Planet = {
      ...planet,
      system: form.system,
      description: form.description,
      climate: form.climate,
      distance: Number(form.distance) || 0,
      price: Number(form.price) || 0,
      rating: planet.rating,
      name: planet.name,
    }

    onUpdate?.(updated)
    setEditing(false)
  }

  return (
    <Card>
      <div className="flex flex-col gap-2 p-5">
        <header className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{planet.name}</h3>
            <p className="text-sm text-gray-400">ID: {planet.id}</p>
          </div>

          <div className="flex gap-2">
            {!editing ? (
              <>
                <Button
                  className="holo-border"
                  variant="secondary"
                  onClick={startEdit}
                >
                  <Edit size={16} />
                </Button>

                <Button
                  className="holo-border !text-red-400 hover:!text-white"
                  variant="secondary"
                  onClick={() => onDelete?.(planet.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button
                  className="holo-border"
                  variant="secondary"
                  onClick={save}
                >
                  Guardar
                </Button>
                <Button
                  className="holo-border !text-gray-400"
                  variant="secondary"
                  onClick={cancel}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </header>

        <p className="mb-2 text-sm text-gray-400">
          {!editing ? (
            planet.system
          ) : (
            <input
              className="w-full rounded border border-gray-700 bg-transparent p-1"
              value={form.system}
              onChange={e => setForm(s => ({ ...s, system: e.target.value }))}
            />
          )}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Clima:</span>
            {!editing ? (
              planet.climate
            ) : (
              <input
                className="rounded border border-gray-700 bg-transparent p-1"
                value={form.climate}
                onChange={e =>
                  setForm(s => ({ ...s, climate: e.target.value }))
                }
              />
            )}
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Distancia:</span>
            {!editing ? (
              `${planet.distance} años luz`
            ) : (
              <input
                className="rounded border border-gray-700 bg-transparent p-1"
                value={form.distance}
                onChange={e =>
                  setForm(s => ({ ...s, distance: e.target.value }))
                }
              />
            )}
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Precio:</span>
            {!editing ? (
              <span className="text-cyan-400">
                {planet.price.toLocaleString()} GC
              </span>
            ) : (
              <input
                className="rounded border border-gray-700 bg-transparent p-1"
                value={form.price}
                onChange={e => setForm(s => ({ ...s, price: e.target.value }))}
              />
            )}
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Rating:</span>
            {planet.rating} ⭐ (- reseñas)
          </p>
        </div>

        <div className="mt-3">
          <span className="text-sm text-gray-400">Descripción:</span>
          {!editing ? (
            <p className="mt-1 text-sm text-gray-200">{planet.description}</p>
          ) : (
            <textarea
              className="mt-1 w-full rounded border border-gray-700 bg-transparent p-2"
              rows={3}
              value={form.description}
              onChange={e =>
                setForm(s => ({ ...s, description: e.target.value }))
              }
            />
          )}
        </div>
      </div>
    </Card>
  )
}
