import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Cliente de banco de dados para API routes (serverless functions)
// Usa DATABASE_URL (não VITE_DATABASE_URL) que é segura no servidor

let dbInstance: any = null

function getDatabaseUrl(): string {
  // No Vercel, use DATABASE_URL (não VITE_DATABASE_URL)
  let url = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
  
  if (!url) {
    const error = 'DATABASE_URL não está definida nas variáveis de ambiente. Configure no painel da Vercel em Settings → Environment Variables.'
    console.error(error)
    throw new Error(error)
  }
  
  // Remover channel_binding=require se existir (pode causar problemas com Neon serverless)
  url = url.replace(/[&?]channel_binding=require/g, '')
  
  // Garantir que tem sslmode=require
  if (!url.includes('sslmode=')) {
    url += (url.includes('?') ? '&' : '?') + 'sslmode=require'
  }
  
  return url
}

function getDb() {
  if (dbInstance) {
    return dbInstance
  }

  try {
    const databaseUrl = getDatabaseUrl()
    console.log('Conectando ao banco de dados...')
    console.log('URL (sem senha):', databaseUrl.replace(/:[^:@]+@/, ':****@'))
    
    const sql = neon(databaseUrl)
    console.log('Neon client criado')
    
    dbInstance = drizzle(sql, { schema })
    console.log('Drizzle ORM inicializado com schema')
    
    console.log('Conexão com banco de dados estabelecida com sucesso')
    return dbInstance
  } catch (error: any) {
    console.error('Erro ao conectar ao banco de dados:', error)
    console.error('Tipo do erro:', typeof error)
    console.error('Mensagem:', error?.message)
    console.error('Stack:', error?.stack)
    if (error?.cause) {
      console.error('Causa:', error.cause)
    }
    throw new Error(`Erro ao conectar ao banco de dados: ${error?.message || 'Erro desconhecido'}`)
  }
}

export { getDb as db }

