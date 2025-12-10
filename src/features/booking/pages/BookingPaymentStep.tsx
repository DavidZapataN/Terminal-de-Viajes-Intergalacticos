import { useBookingStore } from '@/app/stores/booking-store'
import { useAuthStore } from '@/app/stores/auth-store'
import { createBooking } from '@/app/services/booking.service'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CreditCard,
  Loader2,
  Lock,
  Rocket,
  User,
  Users,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { showError } from '@/lib/toast.config'
import {
  formatCardNumber,
  formatExpirationDate,
  validatePayment,
  simulatePaymentProcessing,
  detectCardType,
  type CardType,
} from '@/lib/card-validation'

export const BookingPaymentStep = () => {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const {
    destiny,
    departureDate,
    returnDate,
    passengers,
    selectedStarship,
    selectedCabin,
    paymentData,
    paymentStatus,
    setPaymentData,
    setPaymentStatus,
    setBookingConfirmation,
    calculateTotalPrice,
  } = useBookingStore()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cardType, setCardType] = useState<CardType>('unknown')

  useEffect(() => {
    if (!selectedCabin || !selectedStarship) {
      navigate({ to: '/reservas/cabina' })
    }
  }, [selectedCabin, selectedStarship, navigate])

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    if (formatted.replace(/\s/g, '').length <= 16) {
      setPaymentData({ cardNumber: formatted })
      setCardType(detectCardType(formatted))
      setErrors(prev => ({ ...prev, cardNumber: '' }))
    }
  }

  const handleExpirationChange = (value: string) => {
    const formatted = formatExpirationDate(value)
    if (formatted.length <= 5) {
      setPaymentData({ expirationDate: formatted })
      setErrors(prev => ({ ...prev, expirationDate: '' }))
    }
  }

  const handleSecurityCodeChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const maxLength = cardType === 'amex' ? 4 : 3
    if (cleaned.length <= maxLength) {
      setPaymentData({ securityCode: cleaned })
      setErrors(prev => ({ ...prev, securityCode: '' }))
    }
  }

  const handleCardholderChange = (value: string) => {
    setPaymentData({ cardholderName: value.toUpperCase() })
    setErrors(prev => ({ ...prev, cardholderName: '' }))
  }

  const handleBack = () => {
    navigate({ to: '/reservas/cabina' })
  }

  const handleSubmitPayment = async () => {
    // Validate payment data
    const validation = validatePayment(
      paymentData.cardNumber,
      paymentData.expirationDate,
      paymentData.securityCode,
      paymentData.cardholderName
    )

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setPaymentStatus('processing')

    try {
      // Simulate payment processing
      const paymentResult = await simulatePaymentProcessing(
        paymentData.cardNumber
      )

      if (!paymentResult.success) {
        setPaymentStatus('failed', paymentResult.error)
        return
      }

      // Create booking via API
      if (
        !user ||
        !destiny ||
        !selectedCabin ||
        !departureDate ||
        !returnDate
      ) {
        throw new Error('Datos de reserva incompletos')
      }

      const booking = await createBooking({
        userId: user.id,
        destinyId: destiny.id,
        cabinId: selectedCabin.id,
        departureDate: format(departureDate, 'yyyy-MM-dd'),
        returnDate: format(returnDate, 'yyyy-MM-dd'),
        passengers: passengers.map(p => ({ name: p.name })),
      })

      const bookingCode = `TVI-${booking.id.toString().padStart(6, '0')}`
      setBookingConfirmation(booking.id, bookingCode)
      navigate({ to: '/reservas/confirmacion' })
    } catch (error) {
      console.error('Error creating booking:', error)
      setPaymentStatus('failed', 'Error al procesar la reserva')
      showError('Error al procesar la reserva')
    }
  }

  const totalPrice = calculateTotalPrice()

  if (!destiny || !selectedStarship || !selectedCabin) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Booking Summary */}
      <Card>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
          {/* Destiny Image */}
          <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg md:w-40">
            <ImageWithFallback
              src={destiny.images?.[0] || ''}
              alt={destiny.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Booking Details */}
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <h4 className="text-lg font-semibold text-white">
                {destiny.name}
              </h4>
              <p className="text-sm text-gray-400">{destiny.system}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Rocket size={14} className="text-cyan-400" />
                <span className="text-gray-400">{selectedStarship.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-purple-400" />
                <span className="text-gray-400">
                  {passengers.length} pasajero{passengers.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-cyan-400" />
                <span className="text-gray-400">
                  {departureDate &&
                    format(departureDate, 'd MMM', { locale: es })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-purple-400" />
                <span className="text-gray-400">
                  {returnDate && format(returnDate, 'd MMM', { locale: es })}
                </span>
              </div>
            </div>

            <div className="mt-auto border-t border-gray-700 pt-3">
              <span className="text-sm text-gray-400">Cabina: </span>
              <span className="font-medium text-white">
                {selectedCabin.name}
              </span>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex flex-col items-end justify-center border-t border-gray-700 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <span className="text-sm text-gray-400">Total a pagar</span>
            <span className="text-3xl font-bold text-cyan-400">
              {totalPrice.toLocaleString()} GC
            </span>
          </div>
        </div>
      </Card>

      {/* Payment Form */}
      <Card>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl text-cyan-400">Información de Pago</h3>
          </div>

          {/* Payment Error */}
          {paymentStatus === 'failed' && (
            <div className="flex items-center gap-3 rounded-lg bg-red-500/10 p-4">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-400">
                {useBookingStore.getState().paymentError || 'Error en el pago'}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card Number */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm text-gray-400">
                Número de Tarjeta Galáctica
              </label>
              <div className="relative">
                <div className="holo-border rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="ml-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={paymentData.cardNumber}
                      onChange={e => handleCardNumberChange(e.target.value)}
                      className="w-full bg-transparent px-3 py-3 text-white placeholder-gray-500 focus:outline-none"
                      disabled={paymentStatus === 'processing'}
                    />
                    {cardType !== 'unknown' && (
                      <span className="mr-3 rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 uppercase">
                        {cardType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {errors.cardNumber && (
                <span className="text-sm text-red-400">
                  {errors.cardNumber}
                </span>
              )}
            </div>

            {/* Cardholder Name */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm text-gray-400">
                Nombre del Titular
              </label>
              <div className="holo-border rounded-md">
                <div className="flex items-center">
                  <User className="ml-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="NOMBRE COMO APARECE EN LA TARJETA"
                    value={paymentData.cardholderName}
                    onChange={e => handleCardholderChange(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-white uppercase placeholder-gray-500 focus:outline-none"
                    disabled={paymentStatus === 'processing'}
                  />
                </div>
              </div>
              {errors.cardholderName && (
                <span className="text-sm text-red-400">
                  {errors.cardholderName}
                </span>
              )}
            </div>

            {/* Expiration Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Fecha de Expiración
              </label>
              <div className="holo-border rounded-md">
                <div className="flex items-center">
                  <Calendar className="ml-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={paymentData.expirationDate}
                    onChange={e => handleExpirationChange(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-white placeholder-gray-500 focus:outline-none"
                    disabled={paymentStatus === 'processing'}
                  />
                </div>
              </div>
              {errors.expirationDate && (
                <span className="text-sm text-red-400">
                  {errors.expirationDate}
                </span>
              )}
            </div>

            {/* Security Code */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Código de Seguridad (CVV)
              </label>
              <div className="holo-border rounded-md">
                <div className="flex items-center">
                  <Lock className="ml-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder={cardType === 'amex' ? '0000' : '000'}
                    value={paymentData.securityCode}
                    onChange={e => handleSecurityCodeChange(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-white placeholder-gray-500 focus:outline-none"
                    disabled={paymentStatus === 'processing'}
                  />
                </div>
              </div>
              {errors.securityCode && (
                <span className="text-sm text-red-400">
                  {errors.securityCode}
                </span>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 p-3">
            <Lock className="h-4 w-4 text-cyan-400" />
            <span className="text-xs text-cyan-400">
              Tu información está protegida con encriptación cuántica de nivel
              galáctico
            </span>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={handleBack}
          className="gap-2"
          disabled={paymentStatus === 'processing'}
        >
          <ArrowLeft size={18} />
          Anterior
        </Button>

        <Button
          onClick={handleSubmitPayment}
          disabled={paymentStatus === 'processing'}
          className="gap-2"
        >
          {paymentStatus === 'processing' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Rocket size={18} />
              Confirmar Reserva - {totalPrice.toLocaleString()} GC
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
