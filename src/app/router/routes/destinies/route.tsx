import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/destinies')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    // / : Bar character (/).
    // $ : End of the string.
    if (location.pathname.replace(/\/$/, '') === '/destinies')
      throw redirect({ to: '/destinies/all' })
  },
})

function RouteComponent() {
  return <Outlet />
}
