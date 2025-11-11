import { create } from 'zustand'
import type { Starship } from '../types/Starship'
import { mockStarships } from '@/db/mockData'

interface ShipsStore {
  ships: Starship[]
  updateShip: (ship: Starship) => void
  deleteShip: (shipId: string) => void
  putInActive: (shipId: string) => void
}

export const useShipsStore = create<ShipsStore>(set => ({
  ships: mockStarships,

  updateShip: ship =>
    set(state => ({
      ships: state.ships.map(t => (t.id === ship.id ? ship : t)),
    })),

  deleteShip: shipId =>
    set(state => ({
      ships: state.ships.filter(t => t.id !== shipId),
    })),

  putInActive: shipId =>
    set(state => ({
      ships: state.ships.map(t =>
        t.id === shipId ? { ...t, status: 'active' } : t
      ),
    })),
}))
