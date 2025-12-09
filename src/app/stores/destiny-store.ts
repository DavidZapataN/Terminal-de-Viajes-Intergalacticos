import { create } from 'zustand'
import type { Destiny } from '../types/Destiny'
import type { Activity } from '../types/Activity'
import type { ReviewSummary } from '../types/ReviewSummary'

interface DestinyStore {
  destinies: Destiny[]
  isLoading: boolean
  setDestinies: (destinies: Destiny[]) => void
  setIsLoading: (isLoading: boolean) => void
  addDestiny: (destiny: Destiny) => void
  updateDestiny: (destiny: Destiny) => void
  deleteDestiny: (destinyId: number) => void
  updateDestinyReviewSummary: (
    destinyId: number,
    reviewSummary: ReviewSummary
  ) => void
  updateDestinyLikes: (destinyId: number, likedByUsers: number[]) => void
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
  isLoading: false,

  setDestinies: destinies => set({ destinies }),
  setIsLoading: isLoading => set({ isLoading }),

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

  updateDestinyReviewSummary: (destinyId, reviewSummary) =>
    set(state => ({
      destinies: state.destinies.map(d =>
        d.id === destinyId ? { ...d, reviewSummary } : d
      ),
    })),

  updateDestinyLikes: (destinyId, likedByUsers) =>
    set(state => ({
      destinies: state.destinies.map(d =>
        d.id === destinyId ? { ...d, likedByUsers } : d
      ),
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
