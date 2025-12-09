import { Card } from '@/shared/components/Card'
import { StarshipInfoCard } from './StarshipInfoCard'
import { useMemo } from 'react'

interface Props {
  selectedShipId: string
  onSelectShip: (shipId: string) => void
}

export const SelectStarship = ({ selectedShipId, onSelectShip }: Props) => {
  const ships: any[] = []

  const availableShips = useMemo(
    () => ships.filter(ship => ship.status === 'active'),
    [ships]
  )

  return (
    <Card className="h-max w-full!">
      <div className="flex w-full flex-col gap-4 p-6">
        <h3 className="text-cyan-400">Selecciona la nave</h3>

        {availableShips.map(ship => (
          <div key={ship.id} onClick={() => onSelectShip(ship.id)}>
            <StarshipInfoCard
              ship={ship}
              checked={selectedShipId === ship.id}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
