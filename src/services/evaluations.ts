import type { EvaluationData } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export interface EvaluationRecord {
  id: number
  name: string
  email: string
  phone: string
  age?: string
  location?: any
  breathingSigns?: any
  dentalIssues?: any
  oralHabits?: any
  posture?: string
  speechIssues?: string
  sleepQuality?: string
  previousTreatment?: string
  riskLevel?: string
  analysisResult?: any
  recommendedSpecialistId?: number | null
  createdAt: Date
}

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

    const contentType = response.headers.get('content-type') || ''

    if (!response.ok) {
      let errorData: any
      let responseText = ''

      try {
        responseText = await response.text()
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

    if (!contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Resposta não é JSON. Content-Type:', contentType)
      console.error('Primeiros 200 caracteres:', text.substring(0, 200))
      throw new Error(`Resposta inválida da API. Esperado JSON, recebido: ${contentType || 'text/plain'}`)
    }

    try {
      const text = await response.text()
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
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Erro na requisição: ${error?.message || 'Erro desconhecido'}`)
  }
}

export async function getAllEvaluations(): Promise<EvaluationRecord[]> {
  try {
    return await apiRequest<EvaluationRecord[]>('/evaluations')
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
    throw error
  }
}

export async function getEvaluationById(
  id: number,
): Promise<EvaluationRecord | null> {
  try {
    return await apiRequest<EvaluationRecord>(`/evaluations?id=${id}`)
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error)
    return null
  }
}

export async function createEvaluation(
  data: EvaluationData,
  analysisResult?: any,
  riskLevel?: string,
  recommendedSpecialistId?: number,
): Promise<EvaluationRecord> {
  try {
    return await apiRequest<EvaluationRecord>('/evaluations', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        analysisResult,
        riskLevel,
        recommendedSpecialistId,
      }),
    })
  } catch (error) {
    console.error('Erro ao criar avaliação:', error)
    throw error
  }
}

export async function updateEvaluation(
  id: number,
  data: Partial<EvaluationData>,
  analysisResult?: any,
  riskLevel?: string,
  recommendedSpecialistId?: number,
): Promise<EvaluationRecord> {
  try {
    const updatePayload: any = { ...data }
    if (analysisResult !== undefined) updatePayload.analysisResult = analysisResult
    if (riskLevel !== undefined) updatePayload.riskLevel = riskLevel
    if (recommendedSpecialistId !== undefined) updatePayload.recommendedSpecialistId = recommendedSpecialistId

    return await apiRequest<EvaluationRecord>(`/evaluations?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatePayload),
    })
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error)
    throw error
  }
}

export async function deleteEvaluation(id: number): Promise<void> {
  try {
    await apiRequest<{ success: boolean }>(`/evaluations?id=${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error)
    throw error
  }
}
