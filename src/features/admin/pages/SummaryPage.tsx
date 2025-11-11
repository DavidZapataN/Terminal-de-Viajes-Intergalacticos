import { Rocket, Users, Globe, TrendingUp } from 'lucide-react'
import { SummaryCard } from '../components/SummaryCard'
import { Card } from '../../../shared/components/Card'
import { RecentActivityCard } from '../components/RecentActivityCard'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { useShipsStore } from '@/app/stores/ships-store'
import { usePlanetsStore } from '@/app/stores/planets-store'
import { useMemo } from 'react'

export const Summary = () => {
  const reservations = useReservationsStore(state => state.reservations)
  const planets = usePlanetsStore(state => state.planets)
  const totalReservations = useReservationsStore(
    state => state.reservations.length
  )
  const activeShips = useShipsStore(
    state => state.ships.filter(ship => ship.status === 'active').length
  )
  const revenue = useReservationsStore(state =>
    state.reservations.reduce((sum, r) => sum + r.totalCost, 0)
  )
  const planetsCount = usePlanetsStore(state => state.planets.length)

  const data = useMemo(
    () => [
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
      { title: 'Planetas', count: planetsCount, icon: Globe, color: '#fdc700' },
    ],
    [activeShips, totalReservations, revenue, planetsCount]
  )

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

          {reservations.slice(0, 3).map(reservation => {
            const planet = planets.find(p => p.id === reservation.planetId)
            return (
              <RecentActivityCard
                key={reservation.id}
                title={`Nueva reserva a ${planet?.name}`}
                description={`${reservation.totalCost.toLocaleString()} GC`}
                status={reservation.status}
              />
            )
          })}
        </div>
      </Card>
    </div>
  )
}
