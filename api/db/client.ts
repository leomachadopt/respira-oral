import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '../../src/db/schema'

// Cliente de banco de dados para API routes (serverless functions)
// Usa DATABASE_URL (não VITE_DATABASE_URL) que é segura no servidor
const getDatabaseUrl = () => {
  // No Vercel, use DATABASE_URL (não VITE_DATABASE_URL)
  return process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
}

const databaseUrl = getDatabaseUrl()

if (!databaseUrl) {
  throw new Error('DATABASE_URL não está definida nas variáveis de ambiente')
}

const sql = neon(databaseUrl)
export const db = drizzle(sql, { schema })

