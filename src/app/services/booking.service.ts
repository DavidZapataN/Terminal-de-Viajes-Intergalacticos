import { api } from '@/lib/axios.config'
import type {
  AvailableStarship,
  GetAvailableStarshipsParams,
} from '../types/api/booking/AvailableStarship'
import type { Booking } from '../types/api/booking/Booking'
import type { CreateBookingDto } from '../types/api/booking/CreateBooking'

export const getAvailableStarships = async (
  params: GetAvailableStarshipsParams
): Promise<AvailableStarship[]> => {
  try {
    const response = await api.get<AvailableStarship[]>(
      '/booking/available-starships',
      {
        params: {
          destinyId: params.destinyId,
          departureDate: params.departureDate,
          returnDate: params.returnDate,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching available starships:', error)
    throw new Error('No se pudieron obtener las naves disponibles')
  }
}

export const createBooking = async (
  bookingData: CreateBookingDto
): Promise<Booking> => {
  try {
    const response = await api.post<Booking>('/booking', bookingData)
    return response.data
  } catch (error) {
    console.error('Error creating booking:', error)
    throw new Error('No se pudo crear la reserva')
  }
}

export const getBookingsByUser = async (userId: number): Promise<Booking[]> => {
  try {
    const response = await api.get<Booking[]>(`/booking/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    throw new Error('No se pudieron obtener las reservas del usuario')
  }
}

export const getBookingById = async (id: number): Promise<Booking> => {
  try {
    const response = await api.get<Booking>(`/booking/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching booking:', error)
    throw new Error('No se pudo obtener la reserva')
  }
}

export const cancelBooking = async (id: number): Promise<Booking> => {
  try {
    const response = await api.patch<Booking>(`/booking/${id}/cancel`)
    return response.data
  } catch (error) {
    console.error('Error cancelling booking:', error)
    throw new Error('No se pudo cancelar la reserva')
  }
}
