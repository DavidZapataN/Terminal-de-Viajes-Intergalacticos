import { create } from 'zustand'
import type { Destiny } from '../types/Destiny'
import type { Activity } from '../types/Activity'

interface DestinyStore {
  destinies: Destiny[]
  setDestinies: (destinies: Destiny[]) => void
  addDestiny: (destiny: Destiny) => void
  updateDestiny: (destiny: Destiny) => void
  deleteDestiny: (destinyId: number) => void
  addActivity: (destinyId: number, activity: Activity) => void
  updateActivity: (
    destinyId: number,
    activityId: number,
    activity: Activity
  ) => void
  deleteActivity: (destinyId: number, activityId: number) => void
}

export const useDestinyStore = create<DestinyStore>(set => ({
  destinies: [],

  setDestinies: destinies => set({ destinies }),

  addDestiny: destiny =>
    set(state => ({
      destinies: [...state.destinies, destiny],
    })),

  updateDestiny: destiny =>
    set(state => ({
      destinies: state.destinies.map(d => (d.id === destiny.id ? destiny : d)),
    })),

  deleteDestiny: destinyId =>
    set(state => ({
      destinies: state.destinies.filter(d => d.id !== destinyId),
    })),

  addActivity: (destinyId, activity) =>
    set(state => ({
      destinies: state.destinies.map(destiny =>
        destiny.id === destinyId
          ? { ...destiny, activities: [...destiny.activities, activity] }
          : destiny
      ),
    })),

  updateActivity: (destinyId, activityId, activity) =>
    set(state => ({
      destinies: state.destinies.map(destiny =>
        destiny.id === destinyId
          ? {
              ...destiny,
              activities: destiny.activities.map(a =>
                a.id === activityId ? activity : a
              ),
            }
          : destiny
      ),
    })),

  deleteActivity: (destinyId, activityId) =>
    set(state => ({
      destinies: state.destinies.map(destiny =>
        destiny.id === destinyId
          ? {
              ...destiny,
              activities: destiny.activities.filter(a => a.id !== activityId),
            }
          : destiny
      ),
    })),
}))
