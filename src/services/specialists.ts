import type { Specialist } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    // Verificar Content-Type antes de fazer parse
    const contentType = response.headers.get('content-type') || ''
    
    if (!response.ok) {
      let errorData: any
      let responseText = ''
      
      try {
        responseText = await response.text()
        // Tentar fazer parse apenas se for JSON
        if (contentType.includes('application/json')) {
          errorData = JSON.parse(responseText)
        } else {
          errorData = { error: `HTTP error! status: ${response.status}` }
        }
      } catch (parseError) {
        console.error('Erro ao fazer parse do erro. Resposta:', responseText.substring(0, 200))
        errorData = { error: `HTTP error! status: ${response.status}` }
      }
      
      const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`
      throw new Error(errorMessage)
    }

    // Verificar se é JSON antes de fazer parse
    if (!contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Resposta não é JSON. Content-Type:', contentType)
      console.error('Primeiros 200 caracteres:', text.substring(0, 200))
      throw new Error(`Resposta inválida da API. Esperado JSON, recebido: ${contentType || 'text/plain'}`)
    }

    try {
      const text = await response.text()
      // Verificar se o texto começa com código TypeScript/JavaScript
      if (text.trim().startsWith('import') || text.trim().startsWith('export')) {
        console.error('API retornou código TypeScript em vez de JSON!')
        console.error('Primeiros 500 caracteres:', text.substring(0, 500))
        throw new Error('API retornou código fonte em vez de dados JSON. Verifique se a função serverless está configurada corretamente.')
      }
      
      return JSON.parse(text) as T
    } catch (parseError: any) {
      const text = await response.text()
      console.error('Erro ao fazer parse da resposta JSON')
      console.error('Content-Type:', contentType)
      console.error('Status:', response.status)
      console.error('Primeiros 500 caracteres da resposta:', text.substring(0, 500))
      throw new Error(`Erro ao processar resposta JSON: ${parseError?.message || 'Erro desconhecido'}`)
    }
  } catch (error: any) {
    // Se já é um Error, apenas relançar
    if (error instanceof Error) {
      throw error
    }
    // Caso contrário, criar um novo Error
    throw new Error(`Erro na requisição: ${error?.message || 'Erro desconhecido'}`)
  }
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
