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

/**
 * Formatea una fecha de PostgreSQL a un formato legible
 * @param date - Fecha en formato ISO string o Date
 * @param options - Opciones de formateo
 * @returns Fecha formateada como string
 */
export const formatDate = (
  date: string | Date | null | undefined,
  options: {
    format?: 'short' | 'long' | 'medium' | 'time' | 'datetime'
    locale?: string
  } = {}
): string => {
  if (!date) return 'N/A'

  const { format = 'medium', locale = 'es-ES' } = options
  const dateObj = typeof date === 'string' ? new Date(date) : date

  // Validar que sea una fecha válida
  if (isNaN(dateObj.getTime())) return 'Fecha inválida'

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
    medium: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
    long: {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
    datetime: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  }

  return new Intl.DateTimeFormat(locale, formatOptions[format]).format(dateObj)
}

/**
 * Obtiene el tiempo relativo desde una fecha (ej: "hace 2 días")
 * @param date - Fecha en formato ISO string o Date
 * @returns Tiempo relativo como string
 */
export const formatRelativeTime = (
  date: string | Date | null | undefined
): string => {
  if (!date) return 'N/A'

  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) return 'Fecha inválida'

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const intervals = [
    { label: 'año', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'semana', seconds: 604800 },
    { label: 'día', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      return `hace ${count} ${interval.label}${count !== 1 ? (interval.label === 'mes' ? 'es' : 's') : ''}`
    }
  }

  return 'hace unos segundos'
}
