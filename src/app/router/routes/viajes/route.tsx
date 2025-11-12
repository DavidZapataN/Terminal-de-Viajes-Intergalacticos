import { useAuthStore } from '@/app/stores/auth-store'
import { useReservationsStore } from '@/app/stores/reservations-store'
import { SummaryCard } from '@/features/admin/components/SummaryCard'
import { requireLogin } from '@/lib/utils'
import { Navbar, type Tab } from '@/shared/components/Navbar'
import { Title } from '@/shared/components/Title'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import {
  BanknoteArrowDown,
  CalendarCheck,
  CircleCheckBig,
  CircleX,
  PlaneLanding,
  PlaneTakeoff,
} from 'lucide-react'
import { useMemo } from 'react'

export const Route = createFileRoute('/viajes')({
  component: TripsLayout,
  beforeLoad: async ({ location }) => {
    requireLogin(location.pathname)
    // / : Bar character (/).
    // $ : End of the string.
    if (location.pathname.replace(/\/$/, '') === '/viajes')
      throw redirect({ to: '/viajes/activos' })
  },
})

const tabs: Tab[] = [
  { name: 'Activos', icon: CalendarCheck, path: '/viajes/activos' },
  { name: 'Completados', icon: CircleCheckBig, path: '/viajes/completados' },
  { name: 'Cancelados', icon: CircleX, path: '/viajes/cancelados' },
]

function TripsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore(state => state.currentUser)
  const allReservations = useReservationsStore(state => state.reservations)

  const activeTab =
    tabs.find(tab => location.pathname.startsWith(tab.path))?.name || 'Activos'

  const userReservations = useMemo(
    () => allReservations.filter(r => r.userId === user?.id),
    [allReservations, user?.id]
  )

  const activeReservations = useMemo(
    () =>
      userReservations.filter(r =>
        ['confirmed', 'in_transit'].includes(r.status)
      ).length,
    [userReservations]
  )

  const completedReservations = useMemo(
    () => userReservations.filter(r => r.status === 'completed').length,
    [userReservations]
  )

  const totalSpent = useMemo(
    () => userReservations.reduce((sum, r) => sum + r.totalCost, 0),
    [userReservations]
  )

  const tripsSummary = useMemo(
    () => [
      {
        title: 'Viajes Activos',
        count: activeReservations,
        icon: PlaneTakeoff,
        color: '#00d3f3',
      },
      {
        title: 'Viajes Completados',
        count: completedReservations,
        icon: PlaneLanding,
        color: '#00d492',
      },
      {
        title: 'Total Gastado (GC)',
        count: totalSpent,
        icon: BanknoteArrowDown,
        color: '#c27aff',
      },
    ],
    [activeReservations, completedReservations, totalSpent]
  )

  const handleTabChange = (tabName: string) => {
    const tab = tabs.find(t => t.name === tabName)
    if (tab) {
      navigate({ to: tab.path })
    }
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2.5 p-5">
      <header>
        <div className="flex items-center justify-between">
          <Title>Mis Reservas Galácticas</Title>
          {/* <Button className="!text-gray-800 active:scale-95">
            <Rocket className="mr-3" size={16} />
            Reservar nuevo Viaje
          </Button> */}
        </div>
        <h2 className="text-gray-400">Gestiona todos tus viajes espaciales</h2>
      </header>
      <div className="my-6 flex w-full gap-5">
        {tripsSummary.map(item => (
          <SummaryCard
            key={item.title}
            title={item.title}
            count={item.count}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      <Navbar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <Outlet />
    </div>
  )
}
