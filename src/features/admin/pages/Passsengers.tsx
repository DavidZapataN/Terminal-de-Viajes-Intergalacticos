import { Button } from '@/shared/components/Button'
import { Plus } from 'lucide-react'
import { PassengersList } from '../components/PassengersList'
import { Title } from '@/shared/components/Title'

export const Passengers = () => {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <Title>Gestión de Pasajeros</Title>

        <Button className="!text-gray-800 active:scale-95">
          <Plus className="mr-3" size={16} />
          Agregar Pasajero
        </Button>
      </header>

      <PassengersList />
    </div>
  )
}
