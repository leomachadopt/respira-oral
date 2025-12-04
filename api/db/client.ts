import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Cliente de banco de dados para API routes (serverless functions)
// Usa DATABASE_URL (não VITE_DATABASE_URL) que é segura no servidor

let dbInstance: any = null

function getDatabaseUrl(): string {
  // No Vercel, use DATABASE_URL (não VITE_DATABASE_URL)
  const url = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
  
  if (!url) {
    const error = 'DATABASE_URL não está definida nas variáveis de ambiente. Configure no painel da Vercel em Settings → Environment Variables.'
    console.error(error)
    throw new Error(error)
  }
  
  return url
}

function getDb() {
  if (dbInstance) {
    return dbInstance
  }

  try {
    const databaseUrl = getDatabaseUrl()
    const sql = neon(databaseUrl)
    dbInstance = drizzle(sql, { schema })
    return dbInstance
  } catch (error: any) {
    console.error('Erro ao conectar ao banco de dados:', error)
    throw new Error(`Erro ao conectar ao banco de dados: ${error?.message || 'Erro desconhecido'}`)
  }
}

export { getDb as db }

