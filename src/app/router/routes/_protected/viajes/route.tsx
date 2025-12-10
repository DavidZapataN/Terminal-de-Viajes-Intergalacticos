import { useAuthStore } from '@/app/stores/auth-store'
import { useTripsStore } from '@/app/stores/trips-store'
import { SummaryCard } from '@/features/admin/components/SummaryCard'
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
  Loader2,
  PlaneLanding,
  PlaneTakeoff,
  Wallet,
} from 'lucide-react'
import { useMemo, useEffect } from 'react'

export const Route = createFileRoute('/_protected/viajes')({
  component: TripsLayout,
  beforeLoad: async ({ location }) => {
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
  const user = useAuthStore(state => state.user)
  const { bookings, isLoading, fetchBookings } = useTripsStore()

  useEffect(() => {
    if (user?.id) {
      fetchBookings(user.id)
    }
  }, [user?.id, fetchBookings])

  const activeTab =
    tabs.find(tab => location.pathname.startsWith(tab.path))?.name || 'Activos'

  const activeBookings = useMemo(
    () => bookings.filter(b => ['pending', 'confirmed'].includes(b.status)),
    [bookings]
  )

  const completedBookings = useMemo(
    () => bookings.filter(b => b.status === 'completed'),
    [bookings]
  )

  // Exclude cancelled bookings from total spent
  const nonCancelledBookings = useMemo(
    () => bookings.filter(b => b.status !== 'cancelled'),
    [bookings]
  )

  const totalSpentAll = useMemo(
    () =>
      nonCancelledBookings.reduce((sum, b) => sum + Number(b.totalPrice), 0),
    [nonCancelledBookings]
  )

  const totalSpentCompleted = useMemo(
    () => completedBookings.reduce((sum, b) => sum + Number(b.totalPrice), 0),
    [completedBookings]
  )

  const tripsSummary = useMemo(
    () => [
      {
        title: 'Viajes Activos',
        count: activeBookings.length,
        icon: PlaneTakeoff,
        color: '#00d3f3',
      },
      {
        title: 'Viajes Completados',
        count: completedBookings.length,
        icon: PlaneLanding,
        color: '#00d492',
      },
      {
        title: 'Gastado (Completados)',
        count: totalSpentCompleted,
        icon: BanknoteArrowDown,
        color: '#c27aff',
      },
      {
        title: 'Total Gastado (GC)',
        count: totalSpentAll,
        icon: Wallet,
        color: '#f59e0b',
      },
    ],
    [
      activeBookings.length,
      completedBookings.length,
      totalSpentCompleted,
      totalSpentAll,
    ]
  )

  const handleTabChange = (tabName: string) => {
    const tab = tabs.find(t => t.name === tabName)
    if (tab) {
      navigate({ to: tab.path })
    }
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2.5 overflow-auto p-5">
      <header>
        <div className="flex items-center justify-between">
          <Title>Mis Reservas Galácticas</Title>
        </div>
        <h2 className="text-gray-400">Gestiona todos tus viajes espaciales</h2>
      </header>

      {isLoading ? (
        <div className="my-6 flex w-full items-center justify-center gap-2 py-8">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
          <span className="text-gray-400">Cargando viajes...</span>
        </div>
      ) : (
        <>
          <div className="my-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </>
      )}
    </div>
  )
}
