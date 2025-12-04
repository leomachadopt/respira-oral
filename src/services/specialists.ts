import { db } from '@/db/client'
import { specialists } from '@/db/schema'
import type { Specialist } from '@/types'
import { eq } from 'drizzle-orm'

export async function getAllSpecialists(): Promise<Specialist[]> {
  try {
    const result = await db.select().from(specialists)

    // Converter decimal para number e ajustar formato
    return result.map((specialist) => ({
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
  } catch (error) {
    console.error('Erro ao buscar especialistas:', error)
    throw error
  }
}

export async function getSpecialistById(id: number): Promise<Specialist | null> {
  try {
    const result = await db
      .select()
      .from(specialists)
      .where(eq(specialists.id, id))
      .limit(1)

    if (result.length === 0) return null

    const specialist = result[0]
    return {
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
    }
  } catch (error) {
    console.error('Erro ao buscar especialista:', error)
    throw error
  }
}

export async function createSpecialist(
  data: Omit<Specialist, 'id'>,
): Promise<Specialist> {
  try {
    const result = await db
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
    return {
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
    }
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

    const result = await db
      .update(specialists)
      .set(updateData)
      .where(eq(specialists.id, id))
      .returning()

    const specialist = result[0]
    return {
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
    }
  } catch (error) {
    console.error('Erro ao atualizar especialista:', error)
    throw error
  }
}

export async function deleteSpecialist(id: number): Promise<void> {
  try {
    await db.delete(specialists).where(eq(specialists.id, id))
  } catch (error) {
    console.error('Erro ao deletar especialista:', error)
    throw error
  }
}
