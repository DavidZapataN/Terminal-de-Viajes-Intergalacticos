import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/User'
import { mockUsers } from '@/db/mockData'

interface AuthStore {
  users: User[]
  currentUser: User | null
  isLoggedIn: boolean
  isAdmin: boolean
  updateUser: (name: string, email: string) => void
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      currentUser: null,
      isLoggedIn: false,
      isAdmin: false,

      updateUser: (name, email) => {
        const currentUser = get().currentUser
        if (!currentUser) return

        const updatedUser = { ...currentUser, name, email }

        set({
          currentUser: updatedUser,
        })
      },

      login: (email, password) => {
        const user = mockUsers.find(
          u => u.email === email && u.password === password
        )

        if (user) {
          // Removemos el password antes de guardarlo en el estado
          const { password: _, ...userWithoutPassword } = user
          set({
            currentUser: userWithoutPassword,
            isLoggedIn: true,
            isAdmin: user.role === 'admin',
          })
          return true
        }
        return false
      },

      logout: () =>
        set({
          currentUser: null,
          isLoggedIn: false,
          isAdmin: false,
        }),
    }),
    {
      name: 'auth-storage', // nombre en localStorage
      partialize: state => ({
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
      }),
    }
  )
)
