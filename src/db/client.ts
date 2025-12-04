import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Suporta tanto Vite (import.meta.env) quanto Node.js (process.env)
const getDatabaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_DATABASE_URL
  }
  return process.env.VITE_DATABASE_URL
}

const databaseUrl = getDatabaseUrl()

if (!databaseUrl) {
  throw new Error('VITE_DATABASE_URL não está definida nas variáveis de ambiente')
}

const sql = neon(databaseUrl)
export const db = drizzle(sql, { schema })
