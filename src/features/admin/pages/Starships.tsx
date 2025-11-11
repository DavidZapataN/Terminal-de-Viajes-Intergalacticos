import { StarshipsList } from '../components/StarshipsList'
import { Title } from '@/shared/components/Title'
import type { Starship } from '@/app/types/Starship'
import { useShipsStore } from '@/app/stores/ships-store'

export const Starships = () => {
  const ships = useShipsStore(state => state.ships)
  const updateShip = useShipsStore(state => state.updateShip)
  const deleteShip = useShipsStore(state => state.deleteShip)
  const putInActive = useShipsStore(state => state.putInActive)

  const handleUpdate = (ship: Starship) => {
    updateShip(ship)
  }

  const handleDelete = (shipId: string) => {
    deleteShip(shipId)
  }

  const handlePutActive = (shipId: string) => {
    putInActive(shipId)
  }

  return (
    <div className="mt-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <Title>Gestión de Naves</Title>

        {/* <Button className="!text-gray-800 active:scale-95">
          <Plus className="mr-3" size={16} />
          Agregar Nave
        </Button> */}
      </header>

      <StarshipsList
        ships={ships}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onPutInActive={handlePutActive}
      />
    </div>
  )
}
