import OpenAI from 'openai'
import { db } from './db/client.js'
import { settings } from './db/schema.js'
import { eq } from 'drizzle-orm'
import type { VercelRequest, VercelResponse } from '@vercel/node'

async function getPrompt(): Promise<string | null> {
  try {
    const database = db()
    const result = await database
      .select()
      .from(settings)
      .where(eq(settings.key, 'ai_report_prompt'))
      .limit(1)

    if (result.length === 0) {
      console.error('Prompt não configurado')
      return null
    }

    return result[0].value
  } catch (error) {
    console.error('Erro ao buscar prompt:', error)
    return null
  }
}

async function getOpenAIKey(): Promise<string | null> {
  try {
    const database = db()
    const result = await database
      .select()
      .from(settings)
      .where(eq(settings.key, 'openai_api_key'))
      .limit(1)

    if (result.length === 0) {
      console.error('Chave OpenAI não configurada')
      return null
    }

    return result[0].value
  } catch (error) {
    console.error('Erro ao buscar chave OpenAI:', error)
    return null
  }
}

function replaceVariables(template: string, data: any): string {
  let result = template

  // Substituir todas as variáveis
  result = result.replace(/{name}/g, data.name || 'Não informado')
  result = result.replace(/{whatsapp}/g, data.whatsapp || 'Não informado')
  result = result.replace(/{age}/g, data.age || 'Não informada')
  result = result.replace(/{breathingSigns}/g,
    Array.isArray(data.breathingSigns)
      ? data.breathingSigns.join(', ')
      : data.breathingSigns || 'Não informado'
  )
  result = result.replace(/{dentalIssues}/g,
    Array.isArray(data.dentalIssues)
      ? data.dentalIssues.join(', ')
      : data.dentalIssues || 'Não informado'
  )
  result = result.replace(/{oralHabits}/g,
    Array.isArray(data.oralHabits)
      ? data.oralHabits.join(', ')
      : data.oralHabits || 'Não informado'
  )
  result = result.replace(/{posture}/g, data.posture || 'Não informado')
  result = result.replace(/{speechIssues}/g, data.speechIssues || 'Não informado')
  result = result.replace(/{sleepQuality}/g, data.sleepQuality || 'Não informado')
  result = result.replace(/{previousTreatment}/g, data.previousTreatment || 'Não informado')
  result = result.replace(/{region}/g, data.region || 'Não informada')

  return result
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const evaluationData = req.body

    console.log('Gerando relatório para:', evaluationData.name)

    // Buscar prompt e chave do banco
    const [prompt, apiKey] = await Promise.all([
      getPrompt(),
      getOpenAIKey(),
    ])

    if (!prompt) {
      return res.status(500).json({
        error: 'Prompt não configurado. Configure em /admin/settings'
      })
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'Chave OpenAI não configurada. Configure em /admin/settings'
      })
    }

    // Substituir variáveis no prompt
    const finalPrompt = replaceVariables(prompt, evaluationData)

    console.log('Chamando OpenAI...')

    // Chamar OpenAI
    const openai = new OpenAI({
      apiKey: apiKey,
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é a Dra. Ro, especialista em respiração oral infantil. Sempre responda em português de Portugal. IMPORTANTE: Escreva relatórios EXTENSOS e NARRATIVOS, NUNCA use listas com marcadores ou enumerações. Todo o conteúdo deve ser em texto corrido e bem desenvolvido.',
        },
        {
          role: 'user',
          content: finalPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    const report = completion.choices[0]?.message?.content

    if (!report) {
      throw new Error('OpenAI não retornou resposta')
    }

    console.log('Relatório gerado com sucesso')

    return res.status(200).json({
      success: true,
      report: report,
      tokensUsed: completion.usage?.total_tokens || 0,
    })
  } catch (error: any) {
    console.error('Erro ao gerar relatório:', error)

    // Tratar erros específicos da OpenAI
    if (error?.status === 401) {
      return res.status(500).json({
        error: 'Chave OpenAI inválida. Verifique a chave em /admin/settings'
      })
    }

    if (error?.status === 429) {
      return res.status(500).json({
        error: 'Limite de uso da OpenAI atingido. Tente novamente mais tarde.'
      })
    }

    return res.status(500).json({
      error: 'Erro ao gerar relatório',
      details: error?.message || 'Erro desconhecido',
    })
  }
}
