import type { Specialist } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    let errorData: any
    try {
      errorData = await response.json()
    } catch {
      errorData = { error: `HTTP error! status: ${response.status}` }
    }
    const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`
    throw new Error(errorMessage)
  }

  return response.json()
}

export async function getAllSpecialists(): Promise<Specialist[]> {
  try {
    return await apiRequest<Specialist[]>('/specialists')
  } catch (error) {
    console.error('Erro ao buscar especialistas:', error)
    throw error
  }
}

export async function getSpecialistById(id: number): Promise<Specialist | null> {
  try {
    return await apiRequest<Specialist>(`/specialists?id=${id}`)
  } catch (error) {
    console.error('Erro ao buscar especialista:', error)
    return null
  }
}

export async function createSpecialist(
  data: Omit<Specialist, 'id'>,
): Promise<Specialist> {
  try {
    return await apiRequest<Specialist>('/specialists', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Erro ao criar especialista:', error)
    throw error
  }
}

export async function updateSpecialist(
  id: number,
  data: Partial<Omit<Specialist, 'id'>>,
): Promise<Specialist> {
  try {
    return await apiRequest<Specialist>(`/specialists?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Erro ao atualizar especialista:', error)
    throw error
  }
}

export async function deleteSpecialist(id: number): Promise<void> {
  try {
    await apiRequest<{ success: boolean }>(`/specialists?id=${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Erro ao deletar especialista:', error)
    throw error
  }
}
