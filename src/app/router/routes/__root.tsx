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

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const location = useLocation()

    const fullPagePaths = ['/login', '/registro']
    const isFullPage = fullPagePaths.includes(location.pathname)

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
      </>
    )
  },
})
