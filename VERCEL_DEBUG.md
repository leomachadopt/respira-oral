# Debug - Erros 500 nas API Routes

## Passo 1: Verificar Logs do Vercel

**IMPORTANTE**: Os logs do Vercel mostram o erro real. Siga estes passos:

1. Acesse o painel da Vercel: https://vercel.com
2. Selecione seu projeto
3. Vá em **Deployments** → Clique no último deploy
4. Vá na aba **Functions**
5. Clique em uma das funções que está falhando (ex: `api/specialists`)
6. Veja os **Logs** - lá você verá o erro exato

## Passo 2: Testar Endpoint de Teste

Criei um endpoint de teste simples. Acesse:

```
https://respiracaooral.pt/api/test
```

Este endpoint deve retornar:
- Se funcionar: informações sobre as variáveis de ambiente
- Se falhar: o erro específico

## Passo 3: Verificar Variável DATABASE_URL

No painel da Vercel:

1. **Settings → Environment Variables**
2. Verifique se `DATABASE_URL` existe
3. **IMPORTANTE**: Após adicionar/editar uma variável, você precisa fazer um **novo deploy**!

### Como fazer novo deploy:

**Opção 1 - Automático:**
- Faça um pequeno commit e push (pode ser apenas um espaço em branco)
- O Vercel fará deploy automático

**Opção 2 - Manual:**
- No painel da Vercel → **Deployments**
- Clique nos três pontos (...) no último deploy
- Selecione **Redeploy**

## Passo 4: Verificar Connection String

A connection string do Neon deve ter este formato:

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Exemplo real:**
```
postgresql://leonardo:abc123@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Verifique:**
- ✅ Não tem espaços no início ou fim
- ✅ Começa com `postgresql://`
- ✅ Tem `?sslmode=require` no final
- ✅ Não tem quebras de linha

## Passo 5: Erros Comuns

### Erro: "DATABASE_URL não está definida"

**Causa**: A variável não foi configurada ou o deploy não foi refeito.

**Solução**:
1. Verifique se `DATABASE_URL` existe no painel
2. **Faça um novo deploy** (muito importante!)
3. Aguarde o deploy terminar completamente

### Erro: "Cannot find module" ou "Module not found"

**Causa**: Problemas com imports ou dependências.

**Solução**:
1. Verifique se todos os arquivos na pasta `api` foram commitados
2. Verifique se `@vercel/node` está instalado: `npm list @vercel/node`
3. Se não estiver: `npm install @vercel/node --save-dev`

### Erro: "Connection timeout" ou "ECONNREFUSED"

**Causa**: Problemas de conexão com o Neon.

**Solução**:
1. Verifique se a connection string está correta
2. Verifique se o banco Neon está ativo (acesse o console do Neon)
3. Teste a connection string localmente primeiro

## Passo 6: Testar Localmente

Para testar se as API routes funcionam localmente:

1. Crie `.env.local` na raiz:
   ```
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   ```

2. Execute:
   ```bash
   npm run dev
   ```

3. Teste:
   - http://localhost:8080/api/test
   - http://localhost:8080/api/specialists

## Próximos Passos

1. **Acesse os logs do Vercel** e copie o erro completo
2. **Teste o endpoint `/api/test`** e veja o que retorna
3. **Verifique se fez um novo deploy** após adicionar a variável
4. **Compartilhe o erro dos logs** para diagnóstico mais preciso

## Como Acessar os Logs

**Método 1 - Via Deployments:**
1. Vercel → Seu Projeto → Deployments
2. Clique no último deploy
3. Aba "Functions"
4. Clique na função (ex: `api/specialists`)
5. Veja "Logs"

**Método 2 - Via Functions:**
1. Vercel → Seu Projeto → Functions
2. Selecione a função
3. Veja os logs em tempo real

**Método 3 - Via CLI:**
```bash
vercel logs [URL_DO_DEPLOY] --follow
```



