import { api } from '@/lib/axios.config'
import type { Starship } from '../types/Starship'
import { useStarshipsStore } from '../stores/starship-store'
import type { UpdateStarship } from '../types/api/starship/UpdateStarship'
import type { CreateCabin } from '../types/api/starship/CreateCabin'
import type { Cabin } from '../types/Cabin'
import type { CreateStarship } from '../types/api/starship/CreateStarship'

export const getStarships = async (): Promise<Starship[]> => {
  try {
    const setStarships = useStarshipsStore.getState().setStarships
    const response = await api.get<Starship[]>('/starship')
    setStarships(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching starships:', error)
    throw new Error('No se pudieron obtener las naves espaciales')
  }
}

export const getStarshipById = async (id: string): Promise<Starship> => {
  try {
    const response = await api.get<Starship>(`/starship/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching starship with id ${id}:`, error)
    throw new Error('No se pudo obtener la nave espacial')
  }
}

export const createStarship = async (
  starshipData: CreateStarship
): Promise<Starship> => {
  try {
    const addStarship = useStarshipsStore.getState().addStarship
    const response = await api.post<Starship>('/starship', starshipData)
    addStarship(response.data)
    return response.data
  } catch (error) {
    console.error('Error creating starship:', error)
    throw new Error('No se pudo crear la nave espacial')
  }
}

export const updateStarship = async (
  id: number,
  starshipData: UpdateStarship
): Promise<Starship> => {
  try {
    const starships = useStarshipsStore.getState().starships
    const starship = starships.find(s => s.id === id)
    const updateStarshipInStore = useStarshipsStore.getState().updateStarship
    const response = await api.patch<Starship>(`/starship/${id}`, starshipData)
    const updatedStarship = { ...starship, ...response.data } as Starship
    updateStarshipInStore(updatedStarship)
    return updatedStarship
  } catch (error) {
    console.error(`Error updating starship with id ${id}:`, error)
    throw new Error('No se pudo actualizar la nave espacial')
  }
}

export const deleteStarship = async (id: number): Promise<void> => {
  try {
    const deleteStarshipFromStore = useStarshipsStore.getState().deleteStarship
    await api.delete(`/starship/${id}`)
    deleteStarshipFromStore(id)
  } catch (error) {
    console.error(`Error deleting starship with id ${id}:`, error)
    throw new Error('No se pudo eliminar la nave espacial')
  }
}

export const createCabin = async (
  starshipId: number,
  cabinData: CreateCabin
): Promise<Cabin> => {
  try {
    const addCabin = useStarshipsStore.getState().addCabin
    const response = await api.post<Cabin>(`/cabin/${starshipId}`, cabinData)
    addCabin(starshipId, response.data)
    return response.data
  } catch (error) {
    console.error(
      `Error creating cabin for starship with id ${starshipId}:`,
      error
    )
    throw new Error('No se pudo crear la cabina')
  }
}

export const updateCabin = async (
  starshipId: number,
  cabinId: number,
  cabinData: Partial<CreateCabin>
): Promise<Cabin> => {
  try {
    const updateCabinInStore = useStarshipsStore.getState().updateCabin
    const response = await api.patch<Cabin>(`/cabin/${cabinId}`, cabinData)
    updateCabinInStore(starshipId, cabinId, response.data)
    return response.data
  } catch (error) {
    console.error(`Error updating cabin with id ${cabinId}:`, error)
    throw new Error('No se pudo actualizar la cabina')
  }
}

export const deleteCabin = async (
  starshipId: number,
  cabinId: number
): Promise<void> => {
  try {
    const deleteCabinFromStore = useStarshipsStore.getState().deleteCabin
    await api.delete(`/cabin/${cabinId}`)
    deleteCabinFromStore(starshipId, cabinId)
  } catch (error) {
    console.error(`Error deleting cabin with id ${cabinId}:`, error)
    throw new Error('No se pudo eliminar la cabina')
  }
}
