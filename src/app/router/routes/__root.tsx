import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import type { QueryClient } from '@tanstack/react-query'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar'
import { AppSidebar } from '@/shared/components/Sidebar'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/app/services/auth.service'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    const fullPagePaths = ['/login', '/registro']
    const isFullPage = fullPagePaths.includes(location.pathname)

    useEffect(() => {
      const init = async () => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
          setLoading(false)
          return
        }

        try {
          await getCurrentUser()
        } catch (err) {
          console.error('Error cargando perfil:', err)
        } finally {
          setLoading(false)
        }
      }

      init()
    }, [])

    if (loading) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <span className="animate-pulse text-lg text-gray-500">
            Cargando...
          </span>
        </div>
      )
    }

    return (
      <>
        {isFullPage ? (
          <Outlet />
        ) : (
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SidebarTrigger className="absolute top-1 left-1" />
              <div className="pt-3.5">
                <Outlet />
              </div>
            </SidebarInset>
          </SidebarProvider>
        )}

        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
      </>
    )
  },
})
