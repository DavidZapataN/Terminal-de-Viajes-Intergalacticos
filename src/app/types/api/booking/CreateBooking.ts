export interface PassengerDto {
  name: string
}

export interface CreateBookingDto {
  userId: number
  destinyId: number
  cabinId: number
  departureDate: string
  returnDate: string
  passengers: PassengerDto[]
}
