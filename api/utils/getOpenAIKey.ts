import { db } from '../db/client.js'
import { settings } from '../db/schema.js'
import { eq } from 'drizzle-orm'

/**
 * FUNÇÃO INTERNA DO BACKEND
 * Busca a chave OpenAI do banco de dados de forma segura
 * NUNCA expor esta função ou retornar a chave ao frontend
 */
export async function getOpenAIKey(): Promise<string | null> {
  try {
    const database = db()
    const result = await database
      .select()
      .from(settings)
      .where(eq(settings.key, 'openai_api_key'))
      .limit(1)

    if (result.length === 0) {
      console.error('Chave OpenAI não configurada no banco de dados')
      return null
    }

    return result[0].value
  } catch (error) {
    console.error('Erro ao buscar chave OpenAI:', error)
    return null
  }
}
