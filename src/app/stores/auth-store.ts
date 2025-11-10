import { create } from 'zustand'
import type { User } from '../types/User'

interface UserAuth {
  id: string
  password: string
}

interface AuthStore {
  users: User[]
  currentUser: User | null
  isLoggedIn: boolean
  isAdmin: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const usersAuth: UserAuth[] = [
  { id: 'admin', password: '1234' },
  { id: 'prueba', password: '1234' },
]

export const useAuthStore = create<AuthStore>((set, get) => ({
  users: [
    {
      id: 'GAL-01',
      name: 'Comandante Stellar',
      email: 'admin',
      role: 'admin',
      credits: 999999999,
    },
    {
      id: 'GAL-01',
      name: 'Comandante Viajero',
      email: 'prueba',
      role: 'admin',
      credits: 1000000,
    },
  ],

  currentUser: null,
  isLoggedIn: false,
  isAdmin: false,

  login: (email, password) => {
    const user = get().users.find(u => u.email === email)
    const auth = usersAuth.find(a => a.id === email && a.password === password)
    if (user && auth) {
      set({
        currentUser: user,
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
}))
