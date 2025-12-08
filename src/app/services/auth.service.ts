import { api, clearAuthTokens, setAuthTokens } from '@/lib/axios.config'
import type { User } from '../types/User'
import type { RegisterUser } from '../types/api/auth/RegisterUser'
import type { AuthResponse } from '../types/api/auth/AuthResponse'
import type { UpdateProfile } from '../types/api/auth/UpdateProfile'
import { useAuthStore } from '../stores/auth-store'

const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
}

export const login = async (loginData: {
  email: string
  password: string
}): Promise<User | null> => {
  try {
    const setUser = useAuthStore.getState().setUser
    const response = await api.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGIN,
      loginData
    )

    const { accessToken, refreshToken, user } = response.data
    setAuthTokens(accessToken, refreshToken)
    setUser(user)
    return user
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const msg = error.response.data?.message || 'Error desconocido'
      if (status === 401) return null
      throw new Error(msg)
    }
    throw new Error('No se pudo conectar al servidor')
  }
}

export const logout = (): void => {
  const clearUser = useAuthStore.getState().clearUser
  clearAuthTokens()
  clearUser()
}

export const registerUser = async (userData: RegisterUser): Promise<User> => {
  try {
    const setUser = useAuthStore.getState().setUser
    const response = await api.post<AuthResponse>(
      AUTH_ENDPOINTS.REGISTER,
      userData
    )
    const { accessToken, refreshToken, user } = response.data
    setAuthTokens(accessToken, refreshToken)
    setUser(user)
    return user
  } catch (error) {
    throw new Error('No se pudo registrar el usuario')
  }
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    const setUser = useAuthStore.getState().setUser
    const response = await api.get<User>(AUTH_ENDPOINTS.PROFILE)
    setUser(response.data)
    return response.data
  } catch (error) {
    throw new Error('No se pudo obtener el usuario actual')
  }
}

export const updateProfile = async (
  profileData: UpdateProfile
): Promise<User> => {
  try {
    const setUser = useAuthStore.getState().setUser
    const response = await api.patch<User>(AUTH_ENDPOINTS.PROFILE, profileData)
    setUser(response.data)
    return response.data
  } catch (error: any) {
    if (error.response) {
      const msg = error.response.data?.message || 'Error desconocido'
      throw new Error(msg)
    }
    throw new Error('No se pudo conectar al servidor')
  }
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    await api.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    })
  } catch (error: any) {
    if (error.response) {
      const msg =
        error.response.data?.message || 'Error al cambiar la contraseña'
      throw new Error(msg)
    }
    throw new Error('No se pudo conectar al servidor')
  }
}
