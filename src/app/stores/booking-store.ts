import { create } from 'zustand'
import type { AvailableStarship } from '../types/api/booking/AvailableStarship'
import type { Cabin } from '../types/Cabin'
import type { Destiny } from '../types/Destiny'

export interface Passenger {
  name: string
}

export interface PaymentData {
  cardNumber: string
  expirationDate: string
  securityCode: string
  cardholderName: string
}

export type BookingStep =
  | 'dates'
  | 'starship'
  | 'cabin'
  | 'payment'
  | 'confirmation'

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed'

interface BookingState {
  // Destiny info
  destinyId: number | null
  destiny: Destiny | null

  // Step 1: Dates and passengers
  departureDate: Date | null
  returnDate: Date | null
  passengerCount: number
  passengers: Passenger[]

  // Step 2: Starship selection
  availableStarships: AvailableStarship[]
  selectedStarship: AvailableStarship | null

  // Step 3: Cabin selection
  selectedCabin: Cabin | null

  // Step 4: Payment
  paymentData: PaymentData
  paymentStatus: PaymentStatus
  paymentError: string | null

  // Step 5: Confirmation
  bookingId: number | null
  bookingCode: string | null

  // Current step
  currentStep: BookingStep

  // Actions
  setDestiny: (destiny: Destiny) => void
  setDates: (departure: Date | null, returnDate: Date | null) => void
  setPassengerCount: (count: number) => void
  updatePassenger: (index: number, name: string) => void
  setAvailableStarships: (starships: AvailableStarship[]) => void
  selectStarship: (starship: AvailableStarship) => void
  selectCabin: (cabin: Cabin) => void
  setPaymentData: (data: Partial<PaymentData>) => void
  setPaymentStatus: (status: PaymentStatus, error?: string) => void
  setBookingConfirmation: (bookingId: number, bookingCode: string) => void
  setCurrentStep: (step: BookingStep) => void
  calculateTotalPrice: () => number
  resetBooking: () => void
  canProceedToStep: (step: BookingStep) => boolean
}

const initialPaymentData: PaymentData = {
  cardNumber: '',
  expirationDate: '',
  securityCode: '',
  cardholderName: '',
}

const initialState = {
  destinyId: null,
  destiny: null,
  departureDate: null,
  returnDate: null,
  passengerCount: 1,
  passengers: [{ name: '' }],
  availableStarships: [],
  selectedStarship: null,
  selectedCabin: null,
  paymentData: initialPaymentData,
  paymentStatus: 'idle' as PaymentStatus,
  paymentError: null,
  bookingId: null,
  bookingCode: null,
  currentStep: 'dates' as BookingStep,
}

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,

  setDestiny: destiny =>
    set({
      destinyId: destiny.id,
      destiny,
    }),

  setDates: (departure, returnDate) =>
    set({
      departureDate: departure,
      returnDate: returnDate,
    }),

  setPassengerCount: count => {
    const currentPassengers = get().passengers
    let newPassengers: Passenger[]

    if (count > currentPassengers.length) {
      newPassengers = [
        ...currentPassengers,
        ...Array(count - currentPassengers.length)
          .fill(null)
          .map(() => ({ name: '' })),
      ]
    } else {
      newPassengers = currentPassengers.slice(0, count)
    }

    set({
      passengerCount: count,
      passengers: newPassengers,
    })
  },

  updatePassenger: (index, name) => {
    const passengers = [...get().passengers]
    if (passengers[index]) {
      passengers[index] = { name }
    }
    set({ passengers })
  },

  setAvailableStarships: starships =>
    set({
      availableStarships: starships,
      selectedStarship: null,
      selectedCabin: null,
    }),

  selectStarship: starship =>
    set({
      selectedStarship: starship,
      selectedCabin: null,
    }),

  selectCabin: cabin =>
    set({
      selectedCabin: cabin,
    }),

  setPaymentData: data =>
    set(state => ({
      paymentData: { ...state.paymentData, ...data },
    })),

  setPaymentStatus: (status, error) =>
    set({
      paymentStatus: status,
      paymentError: error || null,
    }),

  setBookingConfirmation: (bookingId, bookingCode) =>
    set({
      bookingId,
      bookingCode,
      paymentStatus: 'success',
    }),

  setCurrentStep: step =>
    set({
      currentStep: step,
    }),

  calculateTotalPrice: () => {
    const { destiny, selectedCabin, passengerCount } = get()
    if (!destiny || !selectedCabin) return 0

    const destinyPrice = destiny.price || 0
    const cabinPrice = selectedCabin.price || 0

    return destinyPrice + cabinPrice * passengerCount
  },

  resetBooking: () => set(initialState),

  canProceedToStep: step => {
    const state = get()

    switch (step) {
      case 'dates':
        return state.destinyId !== null
      case 'starship':
        return (
          state.departureDate !== null &&
          state.returnDate !== null &&
          state.passengers.every(p => p.name.trim() !== '')
        )
      case 'cabin':
        return state.selectedStarship !== null
      case 'payment':
        return state.selectedCabin !== null
      case 'confirmation':
        return state.paymentStatus === 'success'
      default:
        return false
    }
  },
}))
