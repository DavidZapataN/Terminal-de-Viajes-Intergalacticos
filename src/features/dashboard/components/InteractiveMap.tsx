import { Card } from '@/shared/components/Card'
import { GalacticMap } from '@/shared/components/GalacticMap'
import { Title } from '@/shared/components/Title'
import { useNavigate } from '@tanstack/react-router'
import { Map } from 'lucide-react'

export const InteractiveMap = () => {
  const navigate = useNavigate()

  const handlePlanetClick = (planetId: number) => {
    navigate({
      to: '/destinos/$destinoId',
      params: { destinoId: planetId.toString() },
    })
  }

  return (
    <Card>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-cyan-400" />
          <Title>Mapa Galáctico Interactivo</Title>
        </div>

        <GalacticMap onPlanetClick={handlePlanetClick} />
      </div>
    </Card>
  )
}
