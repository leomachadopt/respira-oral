# Correção da Connection String

## Problema Identificado

A connection string que você configurou tem `channel_binding=require`:

```
postgresql://neondb_owner:npg_MgE8SU6PavnO@ep-cold-truth-adx3jks3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

O parâmetro `channel_binding=require` pode causar problemas com o driver serverless do Neon.

## Solução

### Opção 1: Remover channel_binding no Vercel (Recomendado)

No painel da Vercel:

1. Vá em **Settings → Environment Variables**
2. Edite a variável `DATABASE_URL`
3. Remova `&channel_binding=require` do final
4. Deve ficar assim:
   ```
   postgresql://neondb_owner:npg_MgE8SU6PavnO@ep-cold-truth-adx3jks3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
5. **Salve** e faça um **novo deploy**

### Opção 2: Usar Connection String do Pooler (Melhor Performance)

No painel do Neon:

1. Vá em **Connection Details**
2. Procure por **"Pooled connection"** ou **"Connection pooling"**
3. Use a connection string do **pooler** (geralmente tem `-pooler` no host)
4. Ela deve ter este formato:
   ```
   postgresql://user:password@ep-xxx-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```

## Connection String Correta

A connection string deve ter este formato:

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Exemplo:**
```
postgresql://neondb_owner:npg_MgE8SU6PavnO@ep-cold-truth-adx3jks3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**NÃO inclua:**
- ❌ `channel_binding=require`
- ❌ Espaços no início ou fim
- ❌ Quebras de linha

## Verificação

Após corrigir:

1. **Faça um novo deploy** (muito importante!)
2. Teste: `https://respiracaooral.pt/api/test`
3. Deve retornar informações sobre a conexão
4. Teste: `https://respiracaooral.pt/api/specialists`
5. Deve retornar dados ou array vazio (não erro 500)

## Código Atualizado

Atualizei o código para remover automaticamente `channel_binding=require` se estiver presente. Mas é melhor corrigir na origem (no Vercel).

## Próximos Passos

1. ✅ Remova `&channel_binding=require` da connection string no Vercel
2. ✅ Faça um novo deploy
3. ✅ Teste `/api/test` primeiro
4. ✅ Depois teste `/api/specialists`

