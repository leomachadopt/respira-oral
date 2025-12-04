import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client.js'
import { specialists } from './db/schema.js'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const debug: any = {
    step: 'inicio',
    errors: [],
    logs: [],
  }

  try {
    debug.step = 'inicializando_banco'
    debug.logs.push('Tentando inicializar banco de dados...')
    
    let database
    try {
      database = db()
      debug.logs.push('Banco de dados inicializado com sucesso')
      debug.databaseType = typeof database
    } catch (dbError: any) {
      debug.errors.push({
        step: 'inicializacao',
        error: dbError?.message || 'Erro desconhecido',
        stack: dbError?.stack,
      })
      return res.status(500).json(debug)
    }

    debug.step = 'verificando_schema'
    debug.logs.push('Verificando schema...')
    debug.specialistsType = typeof specialists
    debug.specialistsKeys = Object.keys(specialists || {})

    debug.step = 'executando_query'
    debug.logs.push('Executando query select...')
    
    let result: any[] = []
    try {
      result = await database.select().from(specialists)
      debug.logs.push(`Query executada com sucesso. Resultados: ${result.length}`)
      debug.resultType = typeof result
      debug.isArray = Array.isArray(result)
      debug.resultLength = result?.length || 0
      
      if (result && result.length > 0) {
        debug.firstResultKeys = Object.keys(result[0])
        debug.firstResultLat = result[0]?.lat
        debug.firstResultLatType = typeof result[0]?.lat
        debug.firstResultLng = result[0]?.lng
        debug.firstResultLngType = typeof result[0]?.lng
      }
    } catch (queryError: any) {
      debug.errors.push({
        step: 'query',
        error: queryError?.message || 'Erro desconhecido',
        stack: queryError?.stack,
        type: typeof queryError,
      })
      return res.status(500).json(debug)
    }

    debug.step = 'processando_dados'
    debug.logs.push('Processando dados...')
    
    try {
      const specialistsData = result.map((specialist: any) => {
        const lat = specialist.lat ? Number(specialist.lat) : 0
        const lng = specialist.lng ? Number(specialist.lng) : 0
        
        return {
          id: specialist.id,
          name: specialist.name || '',
          role: specialist.role || '',
          city: specialist.city || '',
          address: specialist.address || '',
          phone: specialist.phone || '',
          whatsapp: specialist.whatsapp || '',
          email: specialist.email || '',
          coords: {
            lat: isNaN(lat) ? 0 : lat,
            lng: isNaN(lng) ? 0 : lng,
          },
          image: specialist.image || 'male',
          seed: specialist.seed || 0,
          customImage: specialist.customImage || undefined,
        }
      })

      debug.step = 'sucesso'
      debug.logs.push('Dados processados com sucesso')
      debug.data = specialistsData
      
      return res.status(200).json(debug)
    } catch (mapError: any) {
      debug.errors.push({
        step: 'processamento',
        error: mapError?.message || 'Erro desconhecido',
        stack: mapError?.stack,
      })
      return res.status(500).json(debug)
    }
  } catch (error: any) {
    debug.errors.push({
      step: 'geral',
      error: error?.message || 'Erro desconhecido',
      stack: error?.stack,
    })
    return res.status(500).json(debug)
  }
}

