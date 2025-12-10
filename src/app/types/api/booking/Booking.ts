import type { Cabin } from '../../Cabin'
import type { Destiny } from '../../Destiny'
import type { Starship } from '../../Starship'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Ticket {
  id: number
  passengerName: string
  seatNumber: string
}

export interface Booking {
  id: number
  departureDate: string
  returnDate: string
  status: BookingStatus
  totalPrice: number
  createdAt: string
  destiny: Destiny
  cabin: Cabin
  starship: Starship
  tickets: Ticket[]
}
