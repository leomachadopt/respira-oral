// Este arquivo não deve ser usado no frontend
// Use as API routes em /api para acessar o banco de dados
// Este arquivo é mantido apenas para scripts de seed/migrate

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Suporta tanto Vite (import.meta.env) quanto Node.js (process.env)
const getDatabaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_DATABASE_URL
  }
  return process.env.VITE_DATABASE_URL || process.env.DATABASE_URL
}

const databaseUrl = getDatabaseUrl()

// Não lançar erro no frontend - apenas avisar
// O frontend deve usar as API routes
if (!databaseUrl) {
  if (typeof window !== 'undefined') {
    // Estamos no browser - não usar banco diretamente
    console.warn('Banco de dados não deve ser acessado diretamente no frontend. Use as API routes.')
  } else {
    // Estamos no servidor (seed, migrate, etc)
    throw new Error('DATABASE_URL ou VITE_DATABASE_URL não está definida nas variáveis de ambiente')
  }
}

// Criar db apenas se tiver databaseUrl, senão criar um objeto vazio
let db: any
if (databaseUrl) {
  const sql = neon(databaseUrl)
  db = drizzle(sql, { schema })
} else {
  // Objeto vazio para evitar erros no frontend
  db = {} as any
}

export { db }
