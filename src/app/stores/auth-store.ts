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
  updateUser: (name: string, email: string) => void
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
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 'GAL-02',
      name: 'Comandante Viajero',
      email: 'prueba',
      role: 'admin',
      credits: 1000000,
      createdAt: new Date().toLocaleDateString(),
    },
  ],

  currentUser: {
    id: 'GAL-02',
    name: 'Comandante Viajero',
    email: 'prueba',
    role: 'admin',
    credits: 1000000,
    createdAt: new Date().toLocaleDateString(),
  },
  isLoggedIn: true,
  isAdmin: true,

  updateUser: (name, email) => {
    const users = get().users
    const currentUser = get().currentUser
    if (!currentUser) return

    const updatedAuthUser = usersAuth.find(a => a.id === currentUser.email)
    if (updatedAuthUser) {
      updatedAuthUser.id = email
    }
    const updatedUser = { ...currentUser, name, email }
    const updatedUsers = users.map(u =>
      u.id === currentUser.id ? updatedUser : u
    )

    set({
      users: updatedUsers,
      currentUser: updatedUser,
    })
  },

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
