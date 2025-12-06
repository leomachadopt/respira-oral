export interface Setting {
  id: number
  key: string
  value: string
  description?: string
  updatedAt: Date
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function getSetting(key: string): Promise<Setting | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/settings?key=${key}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar configuração:', error)
    return null
  }
}

export async function getAllSettings(): Promise<Setting[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar configurações:', error)
    return []
  }
}

export async function saveSetting(
  key: string,
  value: string,
  description?: string
): Promise<Setting> {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, value, description }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao salvar configuração:', error)
    throw error
  }
}
