import type { VercelRequest, VercelResponse } from '@vercel/node'

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
    // Teste simples - verificar se a função está funcionando
    const hasDatabaseUrl = !!process.env.DATABASE_URL
    const hasViteDatabaseUrl = !!process.env.VITE_DATABASE_URL
    
    return res.status(200).json({
      success: true,
      message: 'API route está funcionando',
      env: {
        hasDatabaseUrl,
        hasViteDatabaseUrl,
        nodeEnv: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Erro no teste:', error)
    return res.status(500).json({
      error: error?.message || 'Erro desconhecido',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
    })
  }
}

