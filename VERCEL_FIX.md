# Correção de Deploy no Vercel

## Problemas Resolvidos

### 1. Erro: `VITE_DATABASE_URL não está definida`

**Problema**: O código estava tentando acessar o banco de dados diretamente no cliente (browser), o que não é seguro e não funciona em produção.

**Solução**: Criadas API routes serverless no Vercel que executam no servidor, onde as credenciais do banco de dados estão seguras.

### 2. Erro CORS com goskip.dev

**Problema**: O script do goskip.dev estava causando erros CORS.

**Solução**: Removido o script do `index.html`.

## Mudanças Realizadas

### Estrutura de API Routes

Criadas as seguintes rotas serverless na pasta `/api`:

- `/api/specialists.ts` - CRUD de especialistas
- `/api/blog-posts.ts` - CRUD de posts do blog
- `/api/testimonials.ts` - CRUD de depoimentos
- `/api/db/client.ts` - Cliente de banco de dados para API routes

### Serviços Atualizados

Os serviços em `/src/services` foram atualizados para fazer chamadas HTTP em vez de acessar o banco diretamente:

- `src/services/specialists.ts`
- `src/services/blogPosts.ts`
- `src/services/testimonials.ts`

## Configuração no Vercel

### Variáveis de Ambiente

No painel da Vercel, configure as seguintes variáveis de ambiente:

1. Acesse **Settings → Environment Variables**
2. Adicione:

   - **Nome**: `DATABASE_URL`
   - **Valor**: Sua connection string do Neon (ex: `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`)
   - **Environment**: Production, Preview, Development (marque todos)

   ⚠️ **IMPORTANTE**: Use `DATABASE_URL` (não `VITE_DATABASE_URL`) para as API routes. A variável `VITE_*` é exposta ao cliente, o que não é seguro para credenciais.

### Opcional: Variáveis do Cloudinary

Se estiver usando Cloudinary, também adicione:

- `VITE_CLOUDINARY_CLOUD_NAME` (pode ser pública)
- `VITE_CLOUDINARY_UPLOAD_PRESET` (pode ser pública)

## Como Funciona Agora

```
┌─────────────────┐
│  React Frontend │
│   (Browser)     │
└────────┬────────┘
         │
         │ HTTP Requests
         │
         ▼
┌─────────────────┐
│  Vercel API     │
│  Serverless     │
│  Functions      │
│  (/api/*)       │
└────────┬────────┘
         │
         │ DATABASE_URL
         │ (segura no servidor)
         ▼
┌─────────────────┐
│  Neon Database  │
│  (PostgreSQL)   │
└─────────────────┘
```

## Próximos Passos

1. **Adicione a variável `DATABASE_URL` no Vercel** (Settings → Environment Variables)
2. **Faça um novo deploy** ou aguarde o deploy automático após o push
3. **Teste as funcionalidades** que usam o banco de dados

## Testando Localmente

Para testar localmente, você pode:

1. Criar um arquivo `.env.local` na raiz do projeto:
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

2. Executar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

   As API routes estarão disponíveis em `http://localhost:8080/api/*`

## Notas Importantes

- ✅ As credenciais do banco de dados agora estão seguras no servidor
- ✅ O frontend não tem mais acesso direto ao banco de dados
- ✅ Todas as operações passam pelas API routes
- ✅ CORS está configurado nas API routes para permitir requisições do frontend

## Troubleshooting

### Erro 500 nas API routes

- Verifique se `DATABASE_URL` está configurada no Vercel
- Verifique os logs no painel da Vercel (Functions → Logs)

### Erro 404 nas API routes

- Verifique se o arquivo `vercel.json` está na raiz do projeto
- Verifique se as rotas estão na pasta `/api`

### Dados não aparecem

- Verifique se o banco de dados tem dados (use `npm run db:seed` localmente)
- Verifique os logs do navegador para erros de requisição

