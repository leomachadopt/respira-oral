import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const databaseUrl = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
    
    if (!databaseUrl) {
      return res.status(500).json({
        error: 'DATABASE_URL não está definida',
      })
    }

    // Remover channel_binding se existir
    const cleanUrl = databaseUrl.replace(/[&?]channel_binding=require/g, '')
    
    const sql = neon(cleanUrl)
    
    // Verificar se as tabelas existem
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `
    
    const tables = await sql(tablesQuery)
    
    // Verificar se a tabela specialists existe e tem dados
    let specialistsCount = 0
    let specialistsError = null
    
    try {
      const countQuery = 'SELECT COUNT(*) as count FROM specialists'
      const countResult = await sql(countQuery)
      specialistsCount = Number(countResult[0]?.count || 0)
    } catch (err: any) {
      specialistsError = err?.message || 'Erro desconhecido'
    }
    
    return res.status(200).json({
      success: true,
      tables: tables.map((t: any) => t.table_name),
      specialists: {
        exists: !specialistsError,
        count: specialistsCount,
        error: specialistsError,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Erro ao verificar tabelas:', error)
    return res.status(500).json({
      error: error?.message || 'Erro desconhecido',
      stack: error?.stack,
    })
  }
}

