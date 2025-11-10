import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'

export const Statistics = () => {
  return (
    <Card className="!w-full">
      <div className="flex flex-col gap-5 p-5">
        <Title>Estadísticas</Title>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="mb-1 text-2xl text-cyan-400">12</div>
            <div className="text-xs text-muted-foreground">
              Viajes Completados
            </div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-2xl text-purple-400">4.8</div>
            <div className="text-xs text-muted-foreground">Rating Promedio</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-2xl text-emerald-400">156K</div>
            <div className="text-xs text-muted-foreground">
              Años Luz Viajados
            </div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-2xl text-yellow-400">23</div>
            <div className="text-xs text-muted-foreground">
              Planetas Visitados
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
