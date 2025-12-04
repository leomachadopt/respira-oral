import type { Testimonial } from '@/types'

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
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }))
    throw new Error(error.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    return await apiRequest<Testimonial[]>('/testimonials')
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error)
    throw error
  }
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  try {
    return await apiRequest<Testimonial>(`/testimonials?id=${id}`)
  } catch (error) {
    console.error('Erro ao buscar depoimento:', error)
    return null
  }
}

export async function createTestimonial(
  data: Omit<Testimonial, 'id'>,
): Promise<Testimonial> {
  try {
    return await apiRequest<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Erro ao criar depoimento:', error)
    throw error
  }
}

export async function updateTestimonial(
  id: number,
  data: Partial<Omit<Testimonial, 'id'>>,
): Promise<Testimonial> {
  try {
    return await apiRequest<Testimonial>(`/testimonials?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error)
    throw error
  }
}

export async function deleteTestimonial(id: number): Promise<void> {
  try {
    await apiRequest<{ success: boolean }>(`/testimonials?id=${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Erro ao deletar depoimento:', error)
    throw error
  }
}
