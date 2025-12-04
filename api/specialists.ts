import { db } from './db/client'
import { specialists } from './db/schema'
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

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    // Inicializar banco de dados
    const database = db()
    const { id } = req.query

    if (req.method === 'GET') {
      if (id) {
        // Buscar por ID
        const result = await database
          .select()
          .from(specialists)
          .where(eq(specialists.id, Number(id)))
          .limit(1)

        if (result.length === 0) {
          return res.status(404).json({ error: 'Especialista não encontrado' })
        }

        const specialist = result[0]
        return res.status(200).json({
          id: specialist.id,
          name: specialist.name,
          role: specialist.role,
          city: specialist.city,
          address: specialist.address,
          phone: specialist.phone,
          whatsapp: specialist.whatsapp || '',
          email: specialist.email,
          coords: {
            lat: Number(specialist.lat),
            lng: Number(specialist.lng),
          },
          image: specialist.image || 'male',
          seed: specialist.seed || 0,
          customImage: specialist.customImage || undefined,
        })
      } else {
        // Buscar todos
        const result = await database.select().from(specialists)

        const specialistsData = result.map((specialist) => ({
          id: specialist.id,
          name: specialist.name,
          role: specialist.role,
          city: specialist.city,
          address: specialist.address,
          phone: specialist.phone,
          whatsapp: specialist.whatsapp || '',
          email: specialist.email,
          coords: {
            lat: Number(specialist.lat),
            lng: Number(specialist.lng),
          },
          image: specialist.image || 'male',
          seed: specialist.seed || 0,
          customImage: specialist.customImage || undefined,
        }))

        return res.status(200).json(specialistsData)
      }
    }

    if (req.method === 'POST') {
      const data = req.body

      const result = await database
        .insert(specialists)
        .values({
          name: data.name,
          role: data.role,
          city: data.city,
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp || null,
          email: data.email,
          lat: data.coords.lat.toString(),
          lng: data.coords.lng.toString(),
          image: data.image || 'male',
          seed: data.seed || 0,
          customImage: data.customImage || null,
        })
        .returning()

      const specialist = result[0]
      return res.status(201).json({
        id: specialist.id,
        name: specialist.name,
        role: specialist.role,
        city: specialist.city,
        address: specialist.address,
        phone: specialist.phone,
        whatsapp: specialist.whatsapp || '',
        email: specialist.email,
        coords: {
          lat: Number(specialist.lat),
          lng: Number(specialist.lng),
        },
        image: specialist.image || 'male',
        seed: specialist.seed || 0,
        customImage: specialist.customImage || undefined,
      })
    }

    if (req.method === 'PUT') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      const data = req.body
      const updateData: any = {}

      if (data.name) updateData.name = data.name
      if (data.role) updateData.role = data.role
      if (data.city) updateData.city = data.city
      if (data.address) updateData.address = data.address
      if (data.phone) updateData.phone = data.phone
      if (data.whatsapp !== undefined) updateData.whatsapp = data.whatsapp || null
      if (data.email) updateData.email = data.email
      if (data.coords) {
        updateData.lat = data.coords.lat.toString()
        updateData.lng = data.coords.lng.toString()
      }
      if (data.image) updateData.image = data.image
      if (data.seed !== undefined) updateData.seed = data.seed
      if (data.customImage !== undefined)
        updateData.customImage = data.customImage || null

      updateData.updatedAt = new Date()

      const result = await database
        .update(specialists)
        .set(updateData)
        .where(eq(specialists.id, Number(id)))
        .returning()

      if (result.length === 0) {
        return res.status(404).json({ error: 'Especialista não encontrado' })
      }

      const specialist = result[0]
      return res.status(200).json({
        id: specialist.id,
        name: specialist.name,
        role: specialist.role,
        city: specialist.city,
        address: specialist.address,
        phone: specialist.phone,
        whatsapp: specialist.whatsapp || '',
        email: specialist.email,
        coords: {
          lat: Number(specialist.lat),
          lng: Number(specialist.lng),
        },
        image: specialist.image || 'male',
        seed: specialist.seed || 0,
        customImage: specialist.customImage || undefined,
      })
    }

    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      await database.delete(specialists).where(eq(specialists.id, Number(id)))
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error: any) {
    console.error('Erro na API de specialists:', error)
    console.error('Stack:', error?.stack)
    console.error('DATABASE_URL existe?', !!process.env.DATABASE_URL)
    
    const errorMessage = error?.message || 'Erro interno do servidor'
    return res.status(500).json({ 
      error: errorMessage,
      details: error?.stack || 'Sem detalhes disponíveis',
      hasDatabaseUrl: !!process.env.DATABASE_URL,
    })
  }
}

