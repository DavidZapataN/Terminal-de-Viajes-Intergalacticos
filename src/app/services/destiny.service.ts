import { api } from '@/lib/axios.config'
import type { Destiny } from '../types/Destiny'
import { useDestinyStore } from '../stores/destiny-store'
import type { CreateDestiny } from '../types/api/destiny/CreateDestiny'
import type { UpdateDestiny } from '../types/api/destiny/UpdateDestiny'
import type { CreateActivity } from '../types/api/destiny/CreateActivity'
import type { Activity } from '../types/Activity'
import type { FilterDestiny } from '../types/api/destiny/FilterDestiny'
import type { ReviewSummary } from '../types/ReviewSummary'

export const getDestinyReviewSummary = async (
  destinyId: number
): Promise<ReviewSummary> => {
  try {
    const response = await api.get<ReviewSummary>(
      `/destiny/reviews-summary/${destinyId}`
    )
    return response.data
  } catch (error) {
    console.error(
      `Error fetching review summary for destiny with id ${destinyId}:`,
      error
    )
    throw new Error('No se pudo obtener el resumen de reseñas del destino')
  }
}

export const getDestinies = async (
  filters?: FilterDestiny
): Promise<Destiny[]> => {
  try {
    const setDestinies = useDestinyStore.getState().setDestinies

    const params = new URLSearchParams()

    if (filters) {
      if (filters.name) params.append('name', filters.name)
      if (filters.system) params.append('system', filters.system)

      if (filters.atmosphere) params.append('atmosphere', filters.atmosphere)

      if (filters.minPrice !== undefined)
        params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice !== undefined)
        params.append('maxPrice', filters.maxPrice.toString())

      if (filters.minDistance !== undefined)
        params.append('minDistance', filters.minDistance.toString())
      if (filters.maxDistance !== undefined)
        params.append('maxDistance', filters.maxDistance.toString())

      if (filters.minTemperature !== undefined)
        params.append('minTemperature', filters.minTemperature.toString())
      if (filters.maxTemperature !== undefined)
        params.append('maxTemperature', filters.maxTemperature.toString())

      params.append('page', (filters.page || 1).toString())
      params.append('limit', (filters.limit || 50).toString())

      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.order) params.append('order', filters.order)
    } else {
      params.append('page', '1')
      params.append('limit', '50')
    }

    const queryString = params.toString()
    const url = queryString ? `/destiny?${queryString}` : '/destiny'

    const response = await api.get<any>(url)
    setDestinies(response.data.result)
    return response.data.result
  } catch (error) {
    console.error('Error fetching destinies:', error)
    throw new Error('No se pudieron obtener los destinos')
  }
}

export const getDestinyById = async (id: number): Promise<Destiny> => {
  try {
    const response = await api.get<Destiny>(`/destiny/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching destiny with id ${id}:`, error)
    throw new Error('No se pudo obtener el destino')
  }
}

export const createDestiny = async (
  destinyData: CreateDestiny
): Promise<Destiny> => {
  try {
    const addDestiny = useDestinyStore.getState().addDestiny
    const response = await api.post<Destiny>('/destiny', destinyData)
    addDestiny(response.data)
    return response.data
  } catch (error) {
    console.error('Error creating destiny:', error)
    throw new Error('No se pudo crear el destino')
  }
}

export const updateDestiny = async (
  id: number,
  destinyData: UpdateDestiny
): Promise<Destiny> => {
  try {
    const destinies = useDestinyStore.getState().destinies
    const destiny = destinies.find(d => d.id === id)
    const updateDestinyInStore = useDestinyStore.getState().updateDestiny
    const response = await api.patch<Destiny>(`/destiny/${id}`, destinyData)
    const updatedDestiny = { ...destiny, ...response.data } as Destiny
    updateDestinyInStore(updatedDestiny)
    return updatedDestiny
  } catch (error) {
    console.error(`Error updating destiny with id ${id}:`, error)
    throw new Error('No se pudo actualizar el destino')
  }
}

export const deleteDestiny = async (id: number): Promise<void> => {
  try {
    const deleteDestiny = useDestinyStore.getState().deleteDestiny
    await api.delete(`/destiny/${id}`)
    deleteDestiny(id)
  } catch (error) {
    console.error(`Error deleting destiny with id ${id}:`, error)
    throw new Error('No se pudo eliminar el destino')
  }
}

export const createActivity = async (
  destinyId: number,
  activityData: CreateActivity
): Promise<Activity> => {
  try {
    const addActivity = useDestinyStore.getState().addActivity
    const response = await api.post<Activity>(
      `/activity/${destinyId}`,
      activityData
    )
    addActivity(destinyId, response.data)
    return response.data
  } catch (error) {
    console.error('Error creating activity:', error)
    throw new Error('No se pudo crear la actividad')
  }
}

export const updateActivity = async (
  destinyId: number,
  activityId: number,
  activityData: Partial<CreateActivity>
): Promise<Activity> => {
  try {
    const updateActivityInStore = useDestinyStore.getState().updateActivity
    const response = await api.patch<Activity>(
      `/activity/${activityId}`,
      activityData
    )
    updateActivityInStore(destinyId, activityId, response.data)
    return response.data
  } catch (error) {
    console.error(`Error updating activity with id ${activityId}:`, error)
    throw new Error('No se pudo actualizar la actividad')
  }
}

export const deleteActivity = async (
  destinyId: number,
  activityId: number
): Promise<void> => {
  try {
    const deleteActivityFromStore = useDestinyStore.getState().deleteActivity
    await api.delete(`/activity/${activityId}`)
    deleteActivityFromStore(destinyId, activityId)
  } catch (error) {
    console.error(`Error deleting activity with id ${activityId}:`, error)
    throw new Error('No se pudo eliminar la actividad')
  }
}
