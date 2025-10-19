import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/destinos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/destinos/"!</div>
}
