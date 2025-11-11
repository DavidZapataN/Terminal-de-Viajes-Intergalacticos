export interface Reservation {
  id: string
  userId: string
  planetId: string
  shipId: string
  departureDate: string
  returnDate: string
  cabinClass: string
  status: 'confirmed' | 'cancelled' | 'completed' | 'in_transit'
  totalCost: number
}
