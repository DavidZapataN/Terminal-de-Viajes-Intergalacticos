import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/destinos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
