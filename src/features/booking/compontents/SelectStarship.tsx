import { mockSpaceships } from '@/db/mockData'
import { Card } from '@/shared/components/Card'
import { StarshipInfoCard } from './StarshipInfoCard'

const availableShips = mockSpaceships.filter(ship => ship.status === 'active')

export const SelectStarship = () => {
  return (
    <Card className="h-max !w-full">
      <div className="flex w-full flex-col gap-4 p-6">
        <h3 className="text-cyan-400">Selecciona la nave</h3>

        {availableShips.map(ship => (
          <StarshipInfoCard ship={ship} key={ship.id} />
        ))}
      </div>
    </Card>
  )
}
