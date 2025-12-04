import { EvaluationData, EvaluationResult } from '@/types'

/**
 * Analisa os dados da avaliação e calcula um score para ortopedia funcional
 * Esta função simula uma análise de IA, mas pode ser substituída por uma chamada real à API
 */
export async function analyzeEvaluation(
  data: EvaluationData,
): Promise<EvaluationResult> {
  // Simula delay de processamento
  await new Promise((resolve) => setTimeout(resolve, 1500))

  let score = 0
  const factors: string[] = []

  // 1. Idade (crianças mais novas têm mais benefício com ortopedia funcional)
  if (data.age) {
    const ageNum = parseInt(data.age.split('-')[0]) || 0
    if (ageNum >= 3 && ageNum <= 10) {
      score += 15
      factors.push('Idade ideal para intervenção precoce')
    } else if (ageNum < 3) {
      score += 10
      factors.push('Idade muito precoce, monitorização recomendada')
    } else {
      score += 5
    }
  }

  // 2. Sinais de respiração oral (peso alto)
  if (data.breathingSigns && data.breathingSigns.length > 0) {
    const breathingScore = Math.min(data.breathingSigns.length * 12, 30)
    score += breathingScore
    factors.push(`${data.breathingSigns.length} sinais de respiração oral identificados`)
  }

  // 3. Problemas dentários (indicador forte para ortopedia funcional)
  if (data.dentalIssues && data.dentalIssues.length > 0) {
    const dentalScore = Math.min(data.dentalIssues.length * 10, 25)
    score += dentalScore
    factors.push('Problemas dentários/oclusais identificados')
  }

  // 4. Hábitos orais (chupeta, dedo) - indicam necessidade de intervenção
  if (data.oralHabits && data.oralHabits.length > 0) {
    score += 15
    factors.push('Hábitos orais presentes - intervenção pode prevenir problemas futuros')
  }

  // 5. Postura
  if (
    data.posture === 'Sim, frequentemente' ||
    data.posture?.toLowerCase().includes('sim')
  ) {
    score += 10
    factors.push('Alterações posturais observadas')
  } else if (data.posture === 'Às vezes') {
    score += 5
  }

  // 6. Dificuldades de fala
  if (
    data.speechIssues === 'Sim, dificuldade de pronúncia' ||
    data.speechIssues === 'Sim, fala com língua entre dentes' ||
    data.speechIssues === 'Às vezes'
  ) {
    score += 8
    factors.push('Possíveis alterações de fala relacionadas')
  }

  // 7. Qualidade do sono
  if (
    data.sleepQuality === 'Muito ruim - acorda várias vezes' ||
    data.sleepQuality === 'Ruim - sono agitado'
  ) {
    score += 12
    factors.push('Sono comprometido - tratamento pode melhorar significativamente')
  } else if (data.sleepQuality === 'Regular - às vezes agitado') {
    score += 6
  }

  // 8. Tratamento anterior
  if (
    data.previousTreatment === 'Não, nunca' ||
    data.previousTreatment === 'Não sei'
  ) {
    score += 5
    factors.push('Primeira intervenção - momento ideal para ortopedia funcional')
  }

  // Normalizar score (0-100)
  score = Math.min(score, 100)

  // Determinar confiança
  let confidence: 'alta' | 'média' | 'baixa'
  if (score >= 70) {
    confidence = 'alta'
  } else if (score >= 40) {
    confidence = 'média'
  } else {
    confidence = 'baixa'
  }

  // Recomendação de tratamento
  let treatmentRecommendation = ''
  if (score >= 70) {
    treatmentRecommendation =
      'Ortopedia Funcional dos Maxilares com Alinhadores - Recomendação Forte'
  } else if (score >= 40) {
    treatmentRecommendation =
      'Avaliação com Ortopedia Funcional - Pode ser benéfico'
  } else {
    treatmentRecommendation =
      'Monitorização e Avaliação Periódica - Intervenção pode não ser necessária no momento'
  }

  // Reasoning
  const reasoning = `Com base nas respostas fornecidas, identificamos ${factors.length} fatores relevantes: ${factors.join(', ')}. O score de ${score} pontos indica ${confidence === 'alta' ? 'alta' : confidence === 'média' ? 'média' : 'baixa'} probabilidade de benefício com ortopedia funcional dos maxilares.`

  return {
    score,
    treatmentRecommendation,
    recommendedSpecialist: null, // Será preenchido pelo matching
    confidence,
    reasoning,
  }
}

