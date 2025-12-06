# Troubleshooting - Erros 500 nas API Routes

## Problema

Você está vendo erros 500 ao acessar as rotas da API:
- `GET /api/specialists` → 500
- `GET /api/blog-posts` → 500
- `GET /api/testimonials` → 500

## Solução Passo a Passo

### 1. Verificar Variável de Ambiente DATABASE_URL

**No painel da Vercel:**

1. Acesse seu projeto
2. Vá em **Settings → Environment Variables**
3. Verifique se existe uma variável chamada **`DATABASE_URL`** (não `VITE_DATABASE_URL`)
4. Se não existir, adicione:
   - **Nome**: `DATABASE_URL`
   - **Valor**: Sua connection string do Neon
     - Exemplo: `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`
   - **Environments**: Marque **Production**, **Preview** e **Development**

### 2. Verificar Logs do Vercel

**Para ver os erros reais:**

1. No painel da Vercel, vá em **Deployments**
2. Clique no último deploy
3. Vá na aba **Functions**
4. Clique em uma das funções (ex: `api/specialists`)
5. Veja os **Logs** para encontrar o erro específico

**Ou:**

1. No painel da Vercel, vá em **Functions**
2. Selecione a função que está falhando
3. Veja os logs em tempo real

### 3. Erros Comuns e Soluções

#### Erro: "DATABASE_URL não está definida nas variáveis de ambiente"

**Causa**: A variável não foi configurada ou está com nome errado.

**Solução**:
- Certifique-se de que o nome é exatamente `DATABASE_URL` (não `VITE_DATABASE_URL`)
- Verifique se está marcada para todos os ambientes
- Após adicionar/atualizar, faça um novo deploy

#### Erro: "Cannot find module" ou problemas de importação

**Causa**: Problemas com os imports do schema.

**Solução**:
- Verifique se o arquivo `api/db/schema.ts` existe
- Certifique-se de que todos os arquivos na pasta `api` foram commitados
- Faça um novo deploy

#### Erro: "Connection timeout" ou "ECONNREFUSED"

**Causa**: Problemas de conexão com o banco de dados Neon.

**Solução**:
- Verifique se a connection string está correta
- Verifique se o banco de dados Neon está ativo
- Verifique se o IP não está bloqueado (Neon permite conexões de qualquer IP por padrão)

### 4. Testar Localmente

Para testar se as API routes funcionam localmente:

1. Crie um arquivo `.env.local` na raiz do projeto:
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Teste as rotas:
   - `http://localhost:8080/api/specialists`
   - `http://localhost:8080/api/blog-posts`
   - `http://localhost:8080/api/testimonials`

### 5. Verificar Estrutura dos Arquivos

Certifique-se de que a estrutura está assim:

```
/
├── api/
│   ├── db/
│   │   ├── client.ts
│   │   └── schema.ts
│   ├── specialists.ts
│   ├── blog-posts.ts
│   └── testimonials.ts
├── src/
│   └── services/
│       ├── specialists.ts
│       ├── blogPosts.ts
│       └── testimonials.ts
└── vercel.json
```

### 6. Fazer Novo Deploy

Após corrigir os problemas:

1. Faça commit das mudanças:
   ```bash
   git add .
   git commit -m "Fix API routes"
   git push
   ```

2. O Vercel fará deploy automático, ou você pode fazer manualmente:
   - No painel da Vercel, vá em **Deployments**
   - Clique em **Redeploy**

### 7. Verificar se Funcionou

Após o deploy:

1. Acesse `https://respiracaooral.pt/api/specialists` no navegador
2. Deve retornar um JSON com os especialistas (ou array vazio se não houver dados)
3. Se ainda houver erro 500, verifique os logs novamente

## Ainda com Problemas?

Se após seguir todos os passos ainda houver problemas:

1. **Copie a mensagem de erro completa dos logs do Vercel**
2. **Verifique se o banco de dados tem dados** (use `npm run db:seed` localmente)
3. **Verifique se a connection string está correta** (teste localmente primeiro)

## Notas Importantes

- ⚠️ **Nunca use `VITE_DATABASE_URL`** para as API routes - ela é exposta ao cliente
- ✅ **Sempre use `DATABASE_URL`** para as API routes - ela fica segura no servidor
- 🔒 As credenciais do banco de dados nunca devem ser expostas ao cliente



