import { Rocket, Users, Globe, TrendingUp } from 'lucide-react'
import { SummaryCard } from '../components/SummaryCard'
import { Card } from '../../../shared/components/Card'
import { RecentActivityCard } from '../components/RecentActivityCard'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { useMemo } from 'react'
import { useStarshipsStore } from '@/app/stores/starship-store'
import { useDestinyStore } from '@/app/stores/destiny-store'

export const Summary = () => {
  const reservations = useReservationsStore(state => state.reservations)
  const destinies = useDestinyStore(state => state.destinies)
  const totalReservations = useReservationsStore(
    state => state.reservations.length
  )
  const activeShips = useStarshipsStore(
    state => state.starships.filter(ship => ship.status === 'active').length
  )
  const revenue = useReservationsStore(state =>
    state.reservations.reduce((sum, r) => sum + r.totalCost, 0)
  )
  const destiniesCount = useDestinyStore(state => state.destinies.length)

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
      {
        title: 'Planetas',
        count: destiniesCount,
        icon: Globe,
        color: '#fdc700',
      },
    ],
    [activeShips, totalReservations, revenue, destiniesCount]
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
            const destiny = destinies.find(
              d => d.id === parseInt(reservation.planetId)
            )
            return (
              <RecentActivityCard
                key={reservation.id}
                title={`Nueva reserva a ${destiny?.name}`}
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
