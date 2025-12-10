import { create } from 'zustand'
import type { Booking } from '@/app/types/api/booking/Booking'
import { getBookingsByUser } from '@/app/services/booking.service'

interface TripsStore {
  bookings: Booking[]
  isLoading: boolean
  error: string | null
  fetchBookings: (userId: number) => Promise<void>
  clearBookings: () => void
}

export const useTripsStore = create<TripsStore>(set => ({
  bookings: [],
  isLoading: false,
  error: null,

  fetchBookings: async (userId: number) => {
    set({ isLoading: true, error: null })
    try {
      const data = await getBookingsByUser(userId)
      set({ bookings: data, isLoading: false })
    } catch (error) {
      console.error('Error fetching bookings:', error)
      set({ error: 'Error al cargar los viajes', isLoading: false })
    }
  },

  clearBookings: () => set({ bookings: [], isLoading: false, error: null }),
}))
