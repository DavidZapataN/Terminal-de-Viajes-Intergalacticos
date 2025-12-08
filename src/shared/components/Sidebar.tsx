import {
  Calendar,
  Home,
  LogOut,
  Map,
  Rocket,
  Settings,
  User,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { logout } from '@/app/services/auth.service'
import { useAuthStore } from '@/app/stores/auth-store'

const items = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Explorar', url: '/destinos', icon: Map },
  { title: 'Reservar', url: '/reservas', icon: Rocket },
  { title: 'Mis Viajes', url: '/viajes', icon: Calendar },
  { title: 'Perfil', url: '/perfil', icon: User },
  { title: 'Admin', url: '/admin', icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isLogged = useAuthStore(state => !!state.user)
  const isAdmin = useAuthStore(state => state.isAdmin)

  const activeItem = (() => {
    const path = location.pathname
    if (path === '/') return items.find(i => i.url === '/')?.title

    let best: { title: string; url: string } | null = null
    for (const it of items) {
      if (it.url === '/') continue
      if (path.startsWith(it.url)) {
        if (!best || it.url.length > best.url.length) best = it
      }
    }
    return best?.title
  })()

  const redirectToLogin = () => {
    navigate({ to: '/login', search: { from: location.pathname } })
  }

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => {
                if (
                  !isLogged &&
                  (item.title === 'Perfil' || item.title === 'Mis Viajes')
                ) {
                  return null
                }

                if (!isAdmin && item.title === 'Admin') {
                  return null
                }

                const isActive = activeItem === item.title
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-150 ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-gray-800 hover:from-cyan-600 hover:to-purple-600 hover:text-gray-800!'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isLogged ? (
              <SidebarMenuButton
                className="w-full cursor-pointer justify-center gap-5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
              >
                <span>Cerrar sesión</span>
                <LogOut />
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                className="cursor-pointer justify-center"
                onClick={redirectToLogin}
              >
                <User />
                <span>Iniciar Sesión</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
