import { create } from 'zustand'
import type { Starship } from '../types/Starship'
import type { Cabin } from '../types/Cabin'

interface StarshipStore {
  starships: Starship[]
  setStarships: (ships: Starship[]) => void
  addStarship: (ship: Starship) => void
  updateStarship: (ship: Starship) => void
  deleteStarship: (shipId: number) => void
  addCabin: (starshipId: number, cabin: Cabin) => void
  updateCabin: (starshipId: number, cabinId: number, cabin: Cabin) => void
  deleteCabin: (starshipId: number, cabinId: number) => void
}

export const useStarshipsStore = create<StarshipStore>(set => ({
  starships: [],

  setStarships: ships => set({ starships: ships }),

  addStarship: ship =>
    set(state => ({
      starships: [...state.starships, ship],
    })),

  updateStarship: ship =>
    set(state => ({
      starships: state.starships.map(t => (t.id === ship.id ? ship : t)),
    })),

  deleteStarship: shipId =>
    set(state => ({
      starships: state.starships.filter(t => t.id !== shipId),
    })),

  addCabin: (starshipId, cabin) =>
    set(state => ({
      starships: state.starships.map(starship =>
        starship.id === starshipId
          ? { ...starship, cabins: [...starship.cabins, cabin] }
          : starship
      ),
    })),

  updateCabin: (starshipId, cabinId, cabin) =>
    set(state => ({
      starships: state.starships.map(starship =>
        starship.id === starshipId
          ? {
              ...starship,
              cabins: starship.cabins.map(c => (c.id === cabinId ? cabin : c)),
            }
          : starship
      ),
    })),

  deleteCabin: (starshipId, cabinId) =>
    set(state => ({
      starships: state.starships.map(starship =>
        starship.id === starshipId
          ? {
              ...starship,
              cabins: starship.cabins.filter(cabin => cabin.id !== cabinId),
            }
          : starship
      ),
    })),
}))
