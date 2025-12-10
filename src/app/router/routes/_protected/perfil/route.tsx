import { ProfileNavbar } from '@/features/profile/components/ProfileNavbar'
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
import { ArrowLeft, Shield, Lock } from 'lucide-react'

export const Route = createFileRoute('/_protected/perfil')({
  component: ProfileLayout,
  beforeLoad: async ({ location }) => {
    // / : Bar character (/).
    // $ : End of the string.
    if (location.pathname.replace(/\/$/, '') === '/perfil')
      throw redirect({ to: '/perfil/resumen' })
  },
})

const tabs: Tab[] = [
  { name: 'Resumen', icon: Shield, path: '/perfil/resumen' },
  { name: 'Seguridad', icon: Lock, path: '/perfil/seguridad' },
  // { name: 'Métodos de Pago', icon: CreditCard, path: '/perfil/metodos-pago' } // No se sabe si se implementará,
  // { name: 'Datos Biométricos', icon: Heart, path: '/perfil/biometrics' }, // No se sabe si se implementará
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
