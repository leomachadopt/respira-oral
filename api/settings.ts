import { db } from './db/client.js'
import { settings } from './db/schema.js'
import { eq } from 'drizzle-orm'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const database = db()
    const { key } = req.query

    if (req.method === 'GET') {
      if (key) {
        // Buscar configuração por chave
        const result = await database
          .select()
          .from(settings)
          .where(eq(settings.key, key as string))
          .limit(1)

        if (result.length === 0) {
          return res.status(404).json({ error: 'Configuração não encontrada' })
        }

        return res.status(200).json(result[0])
      } else {
        // Buscar todas as configurações
        const result = await database.select().from(settings)
        return res.status(200).json(result)
      }
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const data = req.body

      if (!data.key || !data.value) {
        return res.status(400).json({ error: 'Key e value são obrigatórios' })
      }

      // Verificar se já existe
      const existing = await database
        .select()
        .from(settings)
        .where(eq(settings.key, data.key))
        .limit(1)

      if (existing.length > 0) {
        // Atualizar
        const result = await database
          .update(settings)
          .set({
            value: data.value,
            description: data.description || existing[0].description,
            updatedAt: new Date(),
          })
          .where(eq(settings.key, data.key))
          .returning()

        return res.status(200).json(result[0])
      } else {
        // Criar
        const result = await database
          .insert(settings)
          .values({
            key: data.key,
            value: data.value,
            description: data.description || null,
          })
          .returning()

        return res.status(201).json(result[0])
      }
    }

    if (req.method === 'DELETE') {
      if (!key) {
        return res.status(400).json({ error: 'Key é obrigatória' })
      }

      await database.delete(settings).where(eq(settings.key, key as string))

      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error: any) {
    console.error('Erro na API de settings:', error)
    return res.status(500).json({
      error: 'Erro interno do servidor',
      details: error?.message || 'Erro desconhecido',
    })
  }
}
