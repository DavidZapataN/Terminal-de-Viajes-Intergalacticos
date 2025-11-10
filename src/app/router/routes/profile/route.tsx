import { ProfileNavbar } from '@/features/profile/components/ProfileNavbar'
import { requireLogin } from '@/lib/utils'
import { Button } from '@/shared/components/Button'
import type { Tab } from '@/shared/components/Navbar'
import { Title } from '@/shared/components/Title'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { ArrowLeft, Plane, Shield } from 'lucide-react'

export const Route = createFileRoute('/profile')({
  component: ProfileLayout,
  beforeLoad: async ({ location }) => {
    requireLogin(location.pathname)
    // / : Bar character (/).
    // $ : End of the string.
    if (location.pathname.replace(/\/$/, '') === '/profile')
      throw redirect({ to: '/profile/resumen' })
  },
})

const tabs: Tab[] = [
  { name: 'Resumen', icon: Shield, path: '/profile/resumen' },
  { name: 'Mis Viajes', icon: Plane, path: '/profile/viajes' },
  // { name: 'Métodos de Pago', icon: CreditCard, path: '/profile/metodos-pago' } // No se sabe si se implementará,
  // { name: 'Datos Biométricos', icon: Heart, path: '/profile/biometrics' }, // No se sabe si se implementará
]
function ProfileLayout() {
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

  const handleDashboardClick = () => {
    navigate({ to: '/' })
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2.5 p-5">
      <header className="flex items-center gap-3">
        <Button className="w-max" variant="text" onClick={handleDashboardClick}>
          <ArrowLeft className="mr-3" size={16} />
          Dashboard
        </Button>
        <Title>Perfil Galáctico</Title>
      </header>

      <div className="flex w-full flex-1 gap-8">
        <ProfileNavbar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
        <Outlet />
      </div>
    </div>
  )
}
