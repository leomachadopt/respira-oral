import { db } from '@/db/client'
import { evaluations } from '@/db/schema'
import type { EvaluationData } from '@/types'
import { eq, desc } from 'drizzle-orm'

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

export async function getAllEvaluations(): Promise<EvaluationRecord[]> {
  try {
    const result = await db
      .select()
      .from(evaluations)
      .orderBy(desc(evaluations.createdAt))

    return result.map((evaluation) => ({
      id: evaluation.id,
      name: evaluation.name,
      email: evaluation.email,
      phone: evaluation.phone,
      age: evaluation.age || undefined,
      location: evaluation.location || undefined,
      breathingSigns: evaluation.breathingSigns || undefined,
      dentalIssues: evaluation.dentalIssues || undefined,
      oralHabits: evaluation.oralHabits || undefined,
      posture: evaluation.posture || undefined,
      speechIssues: evaluation.speechIssues || undefined,
      sleepQuality: evaluation.sleepQuality || undefined,
      previousTreatment: evaluation.previousTreatment || undefined,
      riskLevel: evaluation.riskLevel || undefined,
      analysisResult: evaluation.analysisResult || undefined,
      recommendedSpecialistId: evaluation.recommendedSpecialistId || undefined,
      createdAt: evaluation.createdAt,
    }))
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
    throw error
  }
}

export async function getEvaluationById(
  id: number,
): Promise<EvaluationRecord | null> {
  try {
    const result = await db
      .select()
      .from(evaluations)
      .where(eq(evaluations.id, id))
      .limit(1)

    if (result.length === 0) return null

    const evaluation = result[0]
    return {
      id: evaluation.id,
      name: evaluation.name,
      email: evaluation.email,
      phone: evaluation.phone,
      age: evaluation.age || undefined,
      location: evaluation.location || undefined,
      breathingSigns: evaluation.breathingSigns || undefined,
      dentalIssues: evaluation.dentalIssues || undefined,
      oralHabits: evaluation.oralHabits || undefined,
      posture: evaluation.posture || undefined,
      speechIssues: evaluation.speechIssues || undefined,
      sleepQuality: evaluation.sleepQuality || undefined,
      previousTreatment: evaluation.previousTreatment || undefined,
      riskLevel: evaluation.riskLevel || undefined,
      analysisResult: evaluation.analysisResult || undefined,
      recommendedSpecialistId: evaluation.recommendedSpecialistId || undefined,
      createdAt: evaluation.createdAt,
    }
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error)
    throw error
  }
}

export async function createEvaluation(
  data: EvaluationData,
  analysisResult?: any,
  riskLevel?: string,
  recommendedSpecialistId?: number,
): Promise<EvaluationRecord> {
  try {
    const result = await db
      .insert(evaluations)
      .values({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        age: data.age,
        location: data.location || null,
        breathingSigns: data.breathingSigns || null,
        dentalIssues: data.dentalIssues || null,
        oralHabits: data.oralHabits || null,
        posture: data.posture,
        speechIssues: data.speechIssues,
        sleepQuality: data.sleepQuality,
        previousTreatment: data.previousTreatment,
        riskLevel: riskLevel,
        analysisResult: analysisResult || null,
        recommendedSpecialistId: recommendedSpecialistId || null,
      })
      .returning()

    const evaluation = result[0]
    return {
      id: evaluation.id,
      name: evaluation.name,
      email: evaluation.email,
      phone: evaluation.phone,
      age: evaluation.age || undefined,
      location: evaluation.location || undefined,
      breathingSigns: evaluation.breathingSigns || undefined,
      dentalIssues: evaluation.dentalIssues || undefined,
      oralHabits: evaluation.oralHabits || undefined,
      posture: evaluation.posture || undefined,
      speechIssues: evaluation.speechIssues || undefined,
      sleepQuality: evaluation.sleepQuality || undefined,
      previousTreatment: evaluation.previousTreatment || undefined,
      riskLevel: evaluation.riskLevel || undefined,
      analysisResult: evaluation.analysisResult || undefined,
      recommendedSpecialistId: evaluation.recommendedSpecialistId || undefined,
      createdAt: evaluation.createdAt,
    }
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
    const updateData: any = {}

    if (data.name) updateData.name = data.name
    if (data.email) updateData.email = data.email
    if (data.phone) updateData.phone = data.phone
    if (data.age) updateData.age = data.age
    if (data.location) updateData.location = data.location
    if (data.breathingSigns) updateData.breathingSigns = data.breathingSigns
    if (data.dentalIssues) updateData.dentalIssues = data.dentalIssues
    if (data.oralHabits) updateData.oralHabits = data.oralHabits
    if (data.posture) updateData.posture = data.posture
    if (data.speechIssues) updateData.speechIssues = data.speechIssues
    if (data.sleepQuality) updateData.sleepQuality = data.sleepQuality
    if (data.previousTreatment)
      updateData.previousTreatment = data.previousTreatment
    if (riskLevel) updateData.riskLevel = riskLevel
    if (analysisResult) updateData.analysisResult = analysisResult
    if (recommendedSpecialistId !== undefined)
      updateData.recommendedSpecialistId = recommendedSpecialistId

    const result = await db
      .update(evaluations)
      .set(updateData)
      .where(eq(evaluations.id, id))
      .returning()

    const evaluation = result[0]
    return {
      id: evaluation.id,
      name: evaluation.name,
      email: evaluation.email,
      phone: evaluation.phone,
      age: evaluation.age || undefined,
      location: evaluation.location || undefined,
      breathingSigns: evaluation.breathingSigns || undefined,
      dentalIssues: evaluation.dentalIssues || undefined,
      oralHabits: evaluation.oralHabits || undefined,
      posture: evaluation.posture || undefined,
      speechIssues: evaluation.speechIssues || undefined,
      sleepQuality: evaluation.sleepQuality || undefined,
      previousTreatment: evaluation.previousTreatment || undefined,
      riskLevel: evaluation.riskLevel || undefined,
      analysisResult: evaluation.analysisResult || undefined,
      recommendedSpecialistId: evaluation.recommendedSpecialistId || undefined,
      createdAt: evaluation.createdAt,
    }
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error)
    throw error
  }
}

export async function deleteEvaluation(id: number): Promise<void> {
  try {
    await db.delete(evaluations).where(eq(evaluations.id, id))
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error)
    throw error
  }
}
