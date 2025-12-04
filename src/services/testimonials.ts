import { db } from '@/db/client'
import { testimonials } from '@/db/schema'
import type { Testimonial } from '@/types'
import { eq } from 'drizzle-orm'

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const result = await db.select().from(testimonials)

    return result.map((testimonial) => ({
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
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error)
    throw error
  }
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  try {
    const result = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1)

    if (result.length === 0) return null

    const testimonial = result[0]
    return {
      id: testimonial.id,
      name: testimonial.name,
      text: testimonial.text,
      role: testimonial.role,
      rating: testimonial.rating,
      avatarGender: (testimonial.avatarGender as 'male' | 'female') || 'female',
      avatarSeed: testimonial.avatarSeed || 0,
      customAvatar: testimonial.customAvatar || undefined,
      featured: testimonial.featured === 1,
    }
  } catch (error) {
    console.error('Erro ao buscar depoimento:', error)
    throw error
  }
}

export async function createTestimonial(
  data: Omit<Testimonial, 'id'>,
): Promise<Testimonial> {
  try {
    const result = await db
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
    return {
      id: testimonial.id,
      name: testimonial.name,
      text: testimonial.text,
      role: testimonial.role,
      rating: testimonial.rating,
      avatarGender: (testimonial.avatarGender as 'male' | 'female') || 'female',
      avatarSeed: testimonial.avatarSeed || 0,
      customAvatar: testimonial.customAvatar || undefined,
      featured: testimonial.featured === 1,
    }
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

    const result = await db
      .update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id))
      .returning()

    const testimonial = result[0]
    return {
      id: testimonial.id,
      name: testimonial.name,
      text: testimonial.text,
      role: testimonial.role,
      rating: testimonial.rating,
      avatarGender: (testimonial.avatarGender as 'male' | 'female') || 'female',
      avatarSeed: testimonial.avatarSeed || 0,
      customAvatar: testimonial.customAvatar || undefined,
      featured: testimonial.featured === 1,
    }
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error)
    throw error
  }
}

export async function deleteTestimonial(id: number): Promise<void> {
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id))
  } catch (error) {
    console.error('Erro ao deletar depoimento:', error)
    throw error
  }
}
