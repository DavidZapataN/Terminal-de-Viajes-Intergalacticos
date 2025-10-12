import { Rocket, Users, Globe, TrendingUp } from 'lucide-react'
import { SummaryCard } from '../components/SummaryCard'
import { Card } from '../../../shared/components/Card'
import { RecentActivityCard } from '../components/RecentActivityCard'

const data = [
  { title: 'Naves Activas', count: 2, icon: Rocket, color: '#00d3f3' },
  { title: 'Reservas totales', count: 2, icon: Users, color: '#c27aff' },
  { title: 'Ingresos (GC)', count: 55000, icon: TrendingUp, color: '#00d492' },
  { title: 'Planetas', count: 2, icon: Globe, color: '#fdc700' },
]

export const Summary = () => {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="flex w-full gap-5">
        {data.map(item => (
          <SummaryCard
            key={item.title}
            title={item.title}
            count={item.count}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      <Card width="100%" height="100%">
        <div className="flex flex-col gap-5 p-5">
          <h2 className="text-cyan-400">Actividad Reciente</h2>
          <RecentActivityCard
            title="Nueva reserva a Kepler-442b"
            desciption="2 pasajero(s) - 30,000 GC"
            status="confirmed"
          />
          <RecentActivityCard
            title="Nueva reserva a TRAPPIST-1e"
            desciption="1 pasajero(s) - 25,000 GC"
            status="completed"
          />
        </div>
      </Card>
    </div>
  )
}
