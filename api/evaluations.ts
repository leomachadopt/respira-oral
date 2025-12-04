import { db } from './db/client.js'
import { evaluations } from './db/schema.js'
import { eq, desc } from 'drizzle-orm'
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
    // Inicializar banco de dados
    const database = db()
    const { id } = req.query

    if (req.method === 'GET') {
      if (id) {
        // Buscar por ID
        const result = await database
          .select()
          .from(evaluations)
          .where(eq(evaluations.id, Number(id)))
          .limit(1)

        if (result.length === 0) {
          return res.status(404).json({ error: 'Avaliação não encontrada' })
        }

        const evaluation = result[0]
        return res.status(200).json({
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
        })
      } else {
        // Buscar todos ordenados por data
        const result = await database
          .select()
          .from(evaluations)
          .orderBy(desc(evaluations.createdAt))

        const evaluationsData = result.map((evaluation) => ({
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

        return res.status(200).json(evaluationsData)
      }
    }

    if (req.method === 'POST') {
      const data = req.body

      const result = await database
        .insert(evaluations)
        .values({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          age: data.age || null,
          location: data.location || null,
          breathingSigns: data.breathingSigns || null,
          dentalIssues: data.dentalIssues || null,
          oralHabits: data.oralHabits || null,
          posture: data.posture || null,
          speechIssues: data.speechIssues || null,
          sleepQuality: data.sleepQuality || null,
          previousTreatment: data.previousTreatment || null,
          riskLevel: data.riskLevel || null,
          analysisResult: data.analysisResult || null,
          recommendedSpecialistId: data.recommendedSpecialistId || null,
        })
        .returning()

      const evaluation = result[0]
      return res.status(201).json({
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
      })
    }

    if (req.method === 'PUT') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      const data = req.body
      const updateData: any = {}

      if (data.name !== undefined) updateData.name = data.name
      if (data.email !== undefined) updateData.email = data.email
      if (data.phone !== undefined) updateData.phone = data.phone
      if (data.age !== undefined) updateData.age = data.age
      if (data.location !== undefined) updateData.location = data.location
      if (data.breathingSigns !== undefined) updateData.breathingSigns = data.breathingSigns
      if (data.dentalIssues !== undefined) updateData.dentalIssues = data.dentalIssues
      if (data.oralHabits !== undefined) updateData.oralHabits = data.oralHabits
      if (data.posture !== undefined) updateData.posture = data.posture
      if (data.speechIssues !== undefined) updateData.speechIssues = data.speechIssues
      if (data.sleepQuality !== undefined) updateData.sleepQuality = data.sleepQuality
      if (data.previousTreatment !== undefined) updateData.previousTreatment = data.previousTreatment
      if (data.riskLevel !== undefined) updateData.riskLevel = data.riskLevel
      if (data.analysisResult !== undefined) updateData.analysisResult = data.analysisResult
      if (data.recommendedSpecialistId !== undefined) updateData.recommendedSpecialistId = data.recommendedSpecialistId

      const result = await database
        .update(evaluations)
        .set(updateData)
        .where(eq(evaluations.id, Number(id)))
        .returning()

      if (result.length === 0) {
        return res.status(404).json({ error: 'Avaliação não encontrada' })
      }

      const evaluation = result[0]
      return res.status(200).json({
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
      })
    }

    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      await database.delete(evaluations).where(eq(evaluations.id, Number(id)))
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error: any) {
    console.error('Erro na API de evaluations:', error)
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
