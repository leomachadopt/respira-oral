import { db } from './db/client.js'
import { testimonials } from './db/schema.js'
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
          .from(testimonials)
          .where(eq(testimonials.id, Number(id)))
          .limit(1)

        if (result.length === 0) {
          return res.status(404).json({ error: 'Depoimento não encontrado' })
        }

        const testimonial = result[0]
        return res.status(200).json({
          id: testimonial.id,
          name: testimonial.name,
          text: testimonial.text,
          role: testimonial.role,
          rating: testimonial.rating,
          avatarGender: (testimonial.avatarGender as 'male' | 'female') || 'female',
          avatarSeed: testimonial.avatarSeed || 0,
          customAvatar: testimonial.customAvatar || undefined,
          featured: testimonial.featured === 1,
        })
      } else {
        // Buscar todos
        const result = await database.select().from(testimonials)

        const testimonialsData = result.map((testimonial) => ({
          id: testimonial.id,
          name: testimonial.name,
          text: testimonial.text,
          role: testimonial.role,
          rating: testimonial.rating,
          avatarGender: (testimonial.avatarGender as 'male' | 'female') || 'female',
          avatarSeed: testimonial.avatarSeed || 0,
          customAvatar: testimonial.customAvatar || undefined,
          featured: testimonial.featured === 1,
        }))

        return res.status(200).json(testimonialsData)
      }
    }

    if (req.method === 'POST') {
      const data = req.body

      const result = await database
        .insert(testimonials)
        .values({
          name: data.name,
          text: data.text,
          role: data.role,
          rating: data.rating,
          avatarGender: data.avatarGender,
          avatarSeed: data.avatarSeed,
          customAvatar: data.customAvatar || null,
          featured: data.featured ? 1 : 0,
        })
        .returning()

      const testimonial = result[0]
      return res.status(201).json({
        id: testimonial.id,
        name: testimonial.name,
        text: testimonial.text,
        role: testimonial.role,
        rating: testimonial.rating,
        avatarGender: (testimonial.avatarGender as 'male' | 'female') || 'female',
        avatarSeed: testimonial.avatarSeed || 0,
        customAvatar: testimonial.customAvatar || undefined,
        featured: testimonial.featured === 1,
      })
    }

    if (req.method === 'PUT') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      const data = req.body
      const updateData: any = {}

      if (data.name) updateData.name = data.name
      if (data.text) updateData.text = data.text
      if (data.role) updateData.role = data.role
      if (data.rating !== undefined) updateData.rating = data.rating
      if (data.avatarGender) updateData.avatarGender = data.avatarGender
      if (data.avatarSeed !== undefined) updateData.avatarSeed = data.avatarSeed
      if (data.customAvatar !== undefined)
        updateData.customAvatar = data.customAvatar || null
      if (data.featured !== undefined) updateData.featured = data.featured ? 1 : 0

      updateData.updatedAt = new Date()

      const result = await database
        .update(testimonials)
        .set(updateData)
        .where(eq(testimonials.id, Number(id)))
        .returning()

      if (result.length === 0) {
        return res.status(404).json({ error: 'Depoimento não encontrado' })
      }

      const testimonial = result[0]
      return res.status(200).json({
        id: testimonial.id,
        name: testimonial.name,
        text: testimonial.text,
        role: testimonial.role,
        rating: testimonial.rating,
        avatarGender: (testimonial.avatarGender as 'male' | 'female') || 'female',
        avatarSeed: testimonial.avatarSeed || 0,
        customAvatar: testimonial.customAvatar || undefined,
        featured: testimonial.featured === 1,
      })
    }

    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      await database.delete(testimonials).where(eq(testimonials.id, Number(id)))
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error: any) {
    console.error('Erro na API de testimonials:', error)
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

