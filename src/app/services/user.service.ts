import { api } from '@/lib/axios.config'

export interface User {
  id: number
  email: string
  name: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/user')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/user/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw new Error('No se pudo obtener el usuario')
  }
}

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/user/${id}`)
  } catch (error) {
    console.error('Error deleting user:', error)
    throw new Error('No se pudo eliminar el usuario')
  }
}
