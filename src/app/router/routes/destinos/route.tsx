import { createFileRoute, Outlet } from '@tanstack/react-router'
import { getDestinies } from '@/app/services/destiny.service'
import { useDestinyStore } from '@/app/stores/destiny-store'
import { useEffect } from 'react'

export const Route = createFileRoute('/destinos')({
  component: RouteComponent,
})

function RouteComponent() {
  const { destinies, isLoading, setIsLoading } = useDestinyStore()

  useEffect(() => {
    const loadDestinies = async () => {
      if (destinies.length === 0 && !isLoading) {
        setIsLoading(true)
        try {
          await getDestinies()
        } catch (error) {
          console.error('Error al cargar destinos:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadDestinies()
  }, [destinies.length, isLoading, setIsLoading])

  return <Outlet />
}
