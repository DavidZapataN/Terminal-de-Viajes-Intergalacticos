import { Navbar, type Tab } from '@/shared/components/Navbar'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { Activity, MapPin, Rocket, Users } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: Layout,
  beforeLoad: async ({ location }) => {
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

  const activeTab =
    tabs.find(tab => location.pathname.startsWith(tab.path))?.name || 'Resumen'

  const handleTabChange = (tabName: string) => {
    const tab = tabs.find(t => t.name === tabName)
    if (tab) {
      navigate({ to: tab.path })
    }
  }
  return (
    <div className="flex h-screen w-full flex-col gap-2.5 p-5">
      <h2 className="text-cyan-400">Portal Administrativo TVI</h2>
      <h2 className="text-white">
        Centro de control para operaciones galácticas
      </h2>
      <Navbar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <Outlet />
      <p>Contenido del panel de administración</p>
    </div>
  )
}
