import { useBookingStore } from '@/app/stores/booking-store'
import { getAvailableStarships } from '@/app/services/booking.service'
import type { AvailableStarship } from '@/app/types/api/booking/AvailableStarship'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  ArrowLeft,
  Check,
  Loader2,
  Rocket,
  Shield,
  Users,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { showWarning, showError } from '@/lib/toast.config'

export const BookingStarshipStep = () => {
  const navigate = useNavigate()
  const {
    destinyId,
    departureDate,
    returnDate,
    passengerCount,
    availableStarships,
    selectedStarship,
    setAvailableStarships,
    selectStarship,
  } = useBookingStore()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchStarships = async () => {
      if (!destinyId || !departureDate || !returnDate) {
        navigate({ to: '/reservas/fechas' })
        return
      }

      setIsLoading(true)
      try {
        const starships = await getAvailableStarships({
          destinyId,
          departureDate: format(departureDate, 'yyyy-MM-dd'),
          returnDate: format(returnDate, 'yyyy-MM-dd'),
        })
        setAvailableStarships(starships)
      } catch (error) {
        showError('Error al cargar las naves disponibles')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (availableStarships.length === 0) {
      fetchStarships()
    }
  }, [
    destinyId,
    departureDate,
    returnDate,
    setAvailableStarships,
    navigate,
    availableStarships.length,
  ])

  const handleSelectStarship = (starship: AvailableStarship) => {
    if (starship.availableCapacity < passengerCount) {
      showWarning('Esta nave no tiene suficiente capacidad para tus pasajeros')
      return
    }
    selectStarship(starship)
  }

  const handleBack = () => {
    navigate({ to: '/reservas/fechas' })
  }

  const handleContinue = () => {
    if (!selectedStarship) {
      showWarning('Selecciona una nave para continuar')
      return
    }
    navigate({ to: '/reservas/cabina' })
  }

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-4 p-12">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
          <p className="text-gray-400">Buscando naves disponibles...</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3">
            <Rocket className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl text-cyan-400">Selecciona tu Nave</h3>
          </div>

          {availableStarships.length === 0 ? (
            <div className="rounded-lg bg-yellow-500/10 p-6 text-center">
              <p className="text-yellow-400">
                No hay naves disponibles para las fechas seleccionadas.
              </p>
              <Button variant="secondary" className="mt-4" onClick={handleBack}>
                Cambiar fechas
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {availableStarships.map(starship => (
                <StarshipCard
                  key={starship.id}
                  starship={starship}
                  isSelected={selectedStarship?.id === starship.id}
                  passengerCount={passengerCount}
                  onSelect={() => handleSelectStarship(starship)}
                />
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={handleBack} className="gap-2">
          <ArrowLeft size={18} />
          Anterior
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!selectedStarship}
          className="gap-2"
        >
          Seleccionar Cabina
          <Rocket size={18} />
        </Button>
      </div>
    </div>
  )
}

interface StarshipCardProps {
  starship: AvailableStarship
  isSelected: boolean
  passengerCount: number
  onSelect: () => void
}

const StarshipCard = ({
  starship,
  isSelected,
  passengerCount,
  onSelect,
}: StarshipCardProps) => {
  const hasCapacity = starship.availableCapacity >= passengerCount
  const minCabinPrice = Math.min(...starship.cabins.map(c => c.price))

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400'
          : hasCapacity
            ? 'hover:ring-1 hover:ring-cyan-400/50'
            : 'opacity-50'
      }`}
    >
      <div className="relative p-5" onClick={onSelect}>
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500">
            <Check size={18} className="text-gray-900" />
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white">
                {starship.name}
              </h4>
              <p className="text-sm text-gray-400">{starship.class}</p>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-cyan-400" />
              <span className="text-sm">
                <span
                  className={hasCapacity ? 'text-green-400' : 'text-red-400'}
                >
                  {starship.availableCapacity}
                </span>
                <span className="text-gray-500">
                  /{starship.capacity} disponibles
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Shield size={16} className="text-purple-400" />
              <span className="text-sm text-gray-400">
                {starship.cabins.length} cabinas
              </span>
            </div>
          </div>

          {/* Amenities */}
          {starship.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {starship.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300"
                >
                  <Sparkles size={10} className="text-cyan-400" />
                  {amenity}
                </span>
              ))}
              {starship.amenities.length > 4 && (
                <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-500">
                  +{starship.amenities.length - 4} más
                </span>
              )}
            </div>
          )}

          {/* Price indicator */}
          <div className="border-t border-gray-700 pt-3">
            <span className="text-sm text-gray-400">Desde </span>
            <span className="text-lg font-semibold text-cyan-400">
              {minCabinPrice.toLocaleString()} GC
            </span>
            <span className="text-sm text-gray-500"> /cabina</span>
          </div>

          {!hasCapacity && (
            <div className="rounded bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
              Capacidad insuficiente para {passengerCount} pasajeros
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
