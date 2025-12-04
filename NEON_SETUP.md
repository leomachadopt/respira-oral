# Configuração do Banco de Dados Neon

Este guia explica como configurar o banco de dados PostgreSQL com Neon para o projeto Respiração Oral.

## Passo 1: Criar Conta no Neon

1. Aceda a [https://console.neon.tech/](https://console.neon.tech/)
2. Crie uma conta gratuita (pode usar GitHub, Google, etc.)
3. Crie um novo projeto chamado "respira-oral"

## Passo 2: Obter Connection String

1. No painel do Neon, vá para o seu projeto
2. Clique em "Connection Details"
3. Copie a **Connection String** que terá este formato:
   ```
   postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

## Passo 3: Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e cole a sua connection string:
   ```env
   VITE_DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

3. **IMPORTANTE**: Adicione `.env` ao `.gitignore` para não commitar credenciais:
   ```bash
   echo ".env" >> .gitignore
   ```

## Passo 4: Criar as Tabelas no Banco de Dados

Execute o comando para criar as tabelas automaticamente:

```bash
npm run db:push
```

Este comando irá:
- Criar a tabela `specialists` (especialistas)
- Criar a tabela `blog_posts` (artigos do blog)
- Criar a tabela `evaluations` (avaliações da Dra. Ro)

## Passo 5: Migrar Dados Iniciais (Opcional)

Se quiser popular o banco com dados iniciais dos especialistas e posts do blog:

```bash
npm run db:seed
```

## Passo 6: Verificar no Drizzle Studio

Pode visualizar e editar os dados diretamente no navegador:

```bash
npm run db:studio
```

Isto abrirá uma interface visual em `https://local.drizzle.studio`

## Estrutura do Banco de Dados

### Tabela: specialists
- `id` - ID automático
- `name` - Nome do especialista
- `role` - Especialidade (Ortodontista, etc.)
- `city` - Cidade
- `address` - Endereço completo
- `phone` - Telefone
- `whatsapp` - WhatsApp
- `email` - Email
- `lat` / `lng` - Coordenadas GPS
- `image` - Tipo de avatar (male/female)
- `seed` - Seed para avatar
- `custom_image` - URL de imagem personalizada
- `created_at` / `updated_at` - Timestamps

### Tabela: blog_posts
- `id` - ID automático
- `title` - Título do artigo
- `excerpt` - Resumo
- `content` - Conteúdo completo
- `category` - Categoria
- `image` - Imagem
- `date` - Data de publicação
- `author` - Autor
- `slug` - URL amigável (único)
- `seo_title` - Título SEO
- `seo_description` - Descrição SEO
- `seo_keywords` - Palavras-chave SEO
- `created_at` / `updated_at` - Timestamps

### Tabela: evaluations
- `id` - ID automático
- `name` / `email` / `phone` - Dados de contacto
- `age` - Idade da criança
- `location` - Localização (JSON)
- `breathing_signs` - Sinais respiratórios (JSON array)
- `dental_issues` - Problemas dentários (JSON array)
- `oral_habits` - Hábitos orais (JSON array)
- `posture` - Postura
- `speech_issues` - Problemas de fala
- `sleep_quality` - Qualidade do sono
- `previous_treatment` - Tratamento anterior
- `risk_level` - Nível de risco (baixo/moderado/alto)
- `analysis_result` - Resultado completo da análise (JSON)
- `recommended_specialist_id` - ID do especialista recomendado
- `created_at` - Data da avaliação

## Scripts Disponíveis

- `npm run db:generate` - Gera migrations a partir do schema
- `npm run db:migrate` - Aplica migrations pendentes
- `npm run db:push` - Sincroniza schema diretamente (desenvolvimento)
- `npm run db:studio` - Abre interface visual do banco

## Variáveis de Ambiente para Produção (Vercel)

No Vercel, adicione a variável de ambiente:

1. Vá em Settings → Environment Variables
2. Adicione:
   - **Nome**: `VITE_DATABASE_URL`
   - **Valor**: Sua connection string do Neon
   - **Environment**: Production, Preview, Development

## Segurança

⚠️ **NUNCA commite o arquivo `.env` com credenciais reais!**

- Use `.env` para desenvolvimento local
- Use variáveis de ambiente no Vercel para produção
- O `.env.example` deve ter apenas placeholders

## Suporte

- Documentação Neon: https://neon.tech/docs
- Documentação Drizzle ORM: https://orm.drizzle.team/docs/overview
- Issues: Entre em contacto através do repositório
