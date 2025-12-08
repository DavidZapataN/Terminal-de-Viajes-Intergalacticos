import axios, { type InternalAxiosRequestConfig } from 'axios'
import { jwtDecode } from 'jwt-decode'

interface TokenPayload {
  sub: string
  email: string
  role: 'admin' | 'user'
  exp: number
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const FIXED_DELAY = 300

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  async response => {
    await new Promise(resolve => setTimeout(resolve, FIXED_DELAY))
    return response
  },
  async error => {
    await new Promise(resolve => setTimeout(resolve, FIXED_DELAY))

    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) return Promise.reject(error)

      try {
        const { data } = await axios.post(
          'http://localhost:3000/auth/refresh',
          { refreshToken }
        )
        localStorage.setItem('accessToken', data.accessToken)

        error.config.headers.Authorization = `Bearer ${data.accessToken}`
        return api.request(error.config)
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    }
    return Promise.reject(error)
  }
)

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken')
}

export const isAdmin = (): boolean => {
  const payload = getTokenPayload()
  return payload?.role === 'admin'
}

export const getTokenPayload = (): TokenPayload | null => {
  const token = localStorage.getItem('accessToken')
  if (!token) return null

  try {
    return jwtDecode<TokenPayload>(token)
  } catch {
    return null
  }
}
