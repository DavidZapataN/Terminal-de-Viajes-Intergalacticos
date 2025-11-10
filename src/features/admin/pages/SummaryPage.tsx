import { Rocket, Users, Globe, TrendingUp } from 'lucide-react'
import { SummaryCard } from '../components/SummaryCard'
import { Card } from '../../../shared/components/Card'
import { RecentActivityCard } from '../components/RecentActivityCard'
import {
  mockPlanets,
  mockReservationsAdmin,
  mockSpaceships,
} from '@/db/mockData'

const activeShips = mockSpaceships.filter(
  ship => ship.status === 'active'
).length
const totalReservations = mockReservationsAdmin.length
const revenue = mockReservationsAdmin.reduce((sum, r) => sum + r.totalCost, 0)
const planets = mockPlanets.length

const data = [
  {
    title: 'Naves Activas',
    count: activeShips,
    icon: Rocket,
    color: '#00d3f3',
  },
  {
    title: 'Reservas totales',
    count: totalReservations,
    icon: Users,
    color: '#c27aff',
  },
  {
    title: 'Ingresos (GC)',
    count: revenue,
    icon: TrendingUp,
    color: '#00d492',
  },
  {
    title: 'Planetas',
    count: planets,
    icon: Globe,
    color: '#fdc700',
  },
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

      <Card>
        <div className="flex flex-col gap-5 p-5">
          <h2 className="text-cyan-400">Actividad Reciente</h2>

          {mockReservationsAdmin.slice(0, 5).map(reservation => {
            const planet = mockPlanets.find(p => p.id === reservation.planetId)
            return (
              <RecentActivityCard
                title={`Nueva reserva a ${planet?.name}`}
                description={`${reservation.passengers} pasajero(s) - ${reservation.totalCost.toLocaleString()} GC`}
                status={reservation.status}
              />
            )
          })}
        </div>
      </Card>
    </div>
  )
}
