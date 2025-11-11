import { useAuthStore } from '@/app/stores/auth-store'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { redirect } from '@tanstack/react-router'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const requireAdmin = (pathname: string) => {
  const { isLoggedIn, isAdmin } = useAuthStore.getState()

  if (!isLoggedIn) throw redirect({ to: '/login', search: { from: pathname } })

  if (!isAdmin) throw redirect({ to: '/' })
}

export const requireLogin = (pathname: string) => {
  const { isLoggedIn } = useAuthStore.getState()

  if (!isLoggedIn) throw redirect({ to: '/login', search: { from: pathname } })
}
