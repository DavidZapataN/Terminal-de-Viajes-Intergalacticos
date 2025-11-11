import { create } from 'zustand'
import { mockReservationsNew } from '@/db/mockData'
import type { Reservation } from '../types/Reservation'

interface ReservationsStore {
  reservations: Reservation[]
  createReservation: (reservation: Reservation) => void
  updateReservation: (reservation: Reservation) => void
  deleteReservation: (reservationId: string) => void
  searchReservationsByUser: (userId: string) => Reservation[]
}

export const useReservationsStore = create<ReservationsStore>((set, get) => ({
  reservations: mockReservationsNew,

  createReservation: reservation =>
    set(state => ({
      reservations: [...state.reservations, reservation],
    })),

  updateReservation: reservation =>
    set(state => ({
      reservations: state.reservations.map(r =>
        r.id === reservation.id ? reservation : r
      ),
    })),

  deleteReservation: reservationId =>
    set(state => ({
      reservations: state.reservations.filter(r => r.id !== reservationId),
    })),

  searchReservationsByUser: userId =>
    get().reservations.filter(r => r.userId === userId),
}))
