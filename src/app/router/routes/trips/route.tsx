import { mockReservationsAdmin } from '@/db/mockData'
import { SummaryCard } from '@/features/admin/components/SummaryCard'
import { Button } from '@/shared/components/Button'
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
  Rocket,
} from 'lucide-react'

export const Route = createFileRoute('/trips')({
  component: TripsLayout,
  beforeLoad: async ({ location }) => {
    // / : Bar character (/).
    // $ : End of the string.
    if (location.pathname.replace(/\/$/, '') === '/trips')
      throw redirect({ to: '/trips/activos' })
  },
})

const tabs: Tab[] = [
  { name: 'Activos', icon: CalendarCheck, path: '/trips/activos' },
  { name: 'Completados', icon: CircleCheckBig, path: '/trips/completados' },
  { name: 'Cancelados', icon: CircleX, path: '/trips/cancelados' },
]

export const filterReservations = (status: string) => {
  switch (status) {
    case 'active':
      return mockReservationsAdmin.filter(r =>
        ['confirmed', 'in_transit'].includes(r.status)
      )
    case 'completed':
      return mockReservationsAdmin.filter(r => r.status === 'completed')
    case 'cancelled':
      return mockReservationsAdmin.filter(r => r.status === 'cancelled')
    default:
      return mockReservationsAdmin
  }
}

const tripsSummary = [
  {
    title: 'Viajes Activos',
    count: filterReservations('active').length,
    icon: PlaneTakeoff,
    color: '#00d3f3',
  },
  {
    title: 'Viajes Completados',
    count: filterReservations('completed').length,
    icon: PlaneLanding,
    color: '#00d492',
  },
  {
    title: 'Total Gastado (GC)',
    count: 55000,
    icon: BanknoteArrowDown,
    color: '#c27aff',
  },
]

function TripsLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const activeTab =
    tabs.find(tab => location.pathname.startsWith(tab.path))?.name || 'Activos'

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
          <Button className="!text-gray-800 active:scale-95">
            <Rocket className="mr-3" size={16} />
            Reservar nuevo Viaje
          </Button>
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
