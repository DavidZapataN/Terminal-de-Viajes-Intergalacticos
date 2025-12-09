import { mockPlanetsNew } from '@/db/mockData'
import type { Planet } from '../types/Destiny'
import { create } from 'zustand'

interface PlanetsStore {
  planets: Planet[]
  getPlanetById: (id: string) => Planet | undefined
  searchPlanets: (query: string) => Planet[]
  filterByClimate: (climate: string) => Planet[]
  updatePlanet: (planet: Planet) => void
  deletePlanet: (planetId: string) => void
}

export const usePlanetsStore = create<PlanetsStore>((set, get) => ({
  planets: mockPlanetsNew,

  getPlanetById: id => {
    return get().planets.find(planet => planet.id === id)
  },

  searchPlanets: query => {
    const lowerQuery = query.toLowerCase()
    return get().planets.filter(
      planet =>
        planet.name.toLowerCase().includes(lowerQuery) ||
        planet.system.toLowerCase().includes(lowerQuery) ||
        planet.description.toLowerCase().includes(lowerQuery) ||
        planet.climate.toLowerCase().includes(lowerQuery)
    )
  },

  filterByClimate: climate => {
    return get().planets.filter(
      planet => planet.climate.toLowerCase() === climate.toLowerCase()
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
