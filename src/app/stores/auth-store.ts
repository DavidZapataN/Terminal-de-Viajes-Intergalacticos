import { create } from 'zustand'
import type { User } from '../types/User'

interface AuthStore {
  user: User | null
  isAdmin: boolean
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthStore>()(set => ({
  user: null,
  isAdmin: false,
  setUser: (user: User) => set({ user, isAdmin: user.role === 'admin' }),
  clearUser: () => set({ user: null, isAdmin: false }),
}))
