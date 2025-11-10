import { mockPlanetsNew } from '@/db/mockData'
import type { Planet } from '../types/Planet'
import { create } from 'zustand'

interface PlanetsStore {
  planets: Planet[]
  searchPlanets: (query: string) => Planet[]
  updatePlanet: (planet: Planet) => void
  deletePlanet: (planetId: string) => void
}

export const usePlanetsStore = create<PlanetsStore>((set, get) => ({
  planets: mockPlanetsNew,

  searchPlanets: query => {
    const lowerQuery = query.toLowerCase()
    return get().planets.filter(
      planet =>
        planet.name.toLowerCase().includes(lowerQuery) ||
        planet.system.toLowerCase().includes(lowerQuery) ||
        planet.description.toLowerCase().includes(lowerQuery)
    )
  },

  updatePlanet: planet =>
    set(state => ({
      planets: state.planets.map(p => (p.id === planet.id ? planet : p)),
    })),

  deletePlanet: planetId =>
    set(state => ({
      planets: state.planets.filter(p => p.id !== planetId),
    })),
}))
