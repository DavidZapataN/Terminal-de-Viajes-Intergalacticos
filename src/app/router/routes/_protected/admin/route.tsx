import { requireAdmin } from '@/lib/utils'
import { Navbar, type Tab } from '@/shared/components/Navbar'
import { Title } from '@/shared/components/Title'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { Activity, MapPin, Rocket, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getDestinies } from '@/app/services/destiny.service'
import { getStarships } from '@/app/services/starship.service'

export const Route = createFileRoute('/_protected/admin')({
  component: Layout,
  beforeLoad: async ({ location }) => {
    requireAdmin(location.pathname)
    // / : Bar character (/).
    // $ : End of the string.
    if (location.pathname.replace(/\/$/, '') === '/admin')
      throw redirect({ to: '/admin/resumen' })
  },
})

const tabs: Tab[] = [
  { name: 'Resumen', icon: Activity, path: '/admin/resumen' },
  { name: 'Naves', icon: Rocket, path: '/admin/naves' },
  { name: 'Planetas', icon: MapPin, path: '/admin/planetas' },
  { name: 'Pasajeros', icon: Users, path: '/admin/pasajeros' },
]
function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const activeTab =
    tabs.find(tab => location.pathname.startsWith(tab.path))?.name || 'Resumen'

  const handleTabChange = (tabName: string) => {
    const tab = tabs.find(t => t.name === tabName)
    if (tab) {
      navigate({ to: tab.path })
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([getDestinies(), getStarships()])
      } catch (error) {
        console.error('Error loading admin data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="animate-pulse text-lg text-gray-500">...</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2.5 p-5">
      <Title>Portal Administrativo TVI</Title>
      <h2 className="text-white">
        Centro de control para operaciones galácticas
      </h2>
      <Navbar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <Outlet />
    </div>
  )
}
