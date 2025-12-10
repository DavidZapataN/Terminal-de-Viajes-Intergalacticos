import { useBookingStore } from '@/app/stores/booking-store'
import type { Cabin } from '@/app/types/Cabin'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Check,
  CreditCard,
  Crown,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import { showWarning } from '@/lib/toast.config'

const cabinIcons: Record<string, typeof Star> = {
  economy: Zap,
  standard: Star,
  premium: Sparkles,
  luxury: Crown,
}

export const BookingCabinStep = () => {
  const navigate = useNavigate()
  const {
    selectedStarship,
    selectedCabin,
    selectCabin,
    passengerCount,
    destiny,
    calculateTotalPrice,
  } = useBookingStore()

  if (!selectedStarship) {
    navigate({ to: '/reservas/nave' })
    return null
  }

  const handleSelectCabin = (cabin: Cabin) => {
    selectCabin(cabin)
  }

  const handleBack = () => {
    navigate({ to: '/reservas/nave' })
  }

  const handleContinue = () => {
    if (!selectedCabin) {
      showWarning('Selecciona una cabina para continuar')
      return
    }
    navigate({ to: '/reservas/pago' })
  }

  const totalPrice = calculateTotalPrice()

  return (
    <div className="flex flex-col gap-6">
      {/* Starship Info */}
      <Card>
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="text-sm text-gray-400">Nave seleccionada</span>
            <h4 className="text-lg font-semibold text-white">
              {selectedStarship.name}
            </h4>
            <span className="text-sm text-gray-500">
              {selectedStarship.class}
            </span>
          </div>
          <Button variant="text" onClick={handleBack} className="text-sm">
            Cambiar nave
          </Button>
        </div>
      </Card>

      {/* Cabins Selection */}
      <Card>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl text-cyan-400">Selecciona tu Cabina</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedStarship.cabins.map(cabin => (
              <CabinCard
                key={cabin.id}
                cabin={cabin}
                isSelected={selectedCabin?.id === cabin.id}
                passengerCount={passengerCount}
                onSelect={() => handleSelectCabin(cabin)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Price Summary */}
      <Card>
        <div className="flex flex-col gap-4 p-6">
          <h4 className="text-lg font-semibold text-white">
            Resumen de Precio
          </h4>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Precio base del destino</span>
              <span className="text-white">
                {destiny?.price.toLocaleString() || 0} GC
              </span>
            </div>

            {selectedCabin && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Cabina {selectedCabin.name} × {passengerCount} pasajero
                  {passengerCount > 1 ? 's' : ''}
                </span>
                <span className="text-white">
                  {(selectedCabin.price * passengerCount).toLocaleString()} GC
                </span>
              </div>
            )}

            <div className="mt-2 flex justify-between border-t border-gray-700 pt-3">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-cyan-400">
                {totalPrice.toLocaleString()} GC
              </span>
            </div>
          </div>
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
          disabled={!selectedCabin}
          className="gap-2"
        >
          <CreditCard size={18} />
          Proceder al Pago
        </Button>
      </div>
    </div>
  )
}

interface CabinCardProps {
  cabin: Cabin
  isSelected: boolean
  passengerCount: number
  onSelect: () => void
}

const CabinCard = ({
  cabin,
  isSelected,
  passengerCount,
  onSelect,
}: CabinCardProps) => {
  const IconComponent =
    cabinIcons[cabin.name.toLowerCase()] || cabinIcons.standard || Star

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400'
          : 'hover:ring-1 hover:ring-cyan-400/50'
      }`}
    >
      <div className="relative p-5" onClick={onSelect}>
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500">
            <Check size={16} className="text-gray-900" />
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* Icon and Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-cyan-500/20 to-purple-500/20">
              <IconComponent className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{cabin.name}</h4>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400">{cabin.description}</p>

          {/* Price */}
          <div className="border-t border-gray-700 pt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-cyan-400">
                {cabin.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">GC /pasajero</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Total: {(cabin.price * passengerCount).toLocaleString()} GC
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
