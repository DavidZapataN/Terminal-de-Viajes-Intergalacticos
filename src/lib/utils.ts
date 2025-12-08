import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { redirect } from '@tanstack/react-router'
import { isAdmin, isAuthenticated } from './axios.config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const requireAdmin = (pathname: string) => {
  if (!isAuthenticated())
    throw redirect({ to: '/login', search: { from: pathname } })
  if (!isAdmin()) throw redirect({ to: '/' })
}

export const requireLogin = (pathname: string) => {
  if (!isAuthenticated())
    throw redirect({ to: '/login', search: { from: pathname } })
}
