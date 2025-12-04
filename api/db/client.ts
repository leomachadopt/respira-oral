import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Cliente de banco de dados para API routes (serverless functions)
// Usa DATABASE_URL (não VITE_DATABASE_URL) que é segura no servidor
const getDatabaseUrl = () => {
  // No Vercel, use DATABASE_URL (não VITE_DATABASE_URL)
  return process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
}

const databaseUrl = getDatabaseUrl()

if (!databaseUrl) {
  console.error('DATABASE_URL não está definida nas variáveis de ambiente')
  throw new Error('DATABASE_URL não está definida nas variáveis de ambiente. Configure no painel da Vercel em Settings → Environment Variables.')
}

let sql: any
let db: any

try {
  sql = neon(databaseUrl)
  db = drizzle(sql, { schema })
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error)
  throw error
}

export { db }

