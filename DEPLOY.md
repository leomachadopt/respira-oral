# Deploy na Vercel - Respiração Oral

Este guia mostra como fazer o deploy do projeto na Vercel.

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Node.js 18+ instalado localmente

## 🚀 Deploy Automático via Git

### 1. Criar Repositório Git

Se ainda não tiver um repositório:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### 2. Conectar ao GitHub/GitLab

```bash
# Criar repositório no GitHub primeiro, depois:
git remote add origin https://github.com/SEU-USUARIO/respira-oral.git
git push -u origin main
```

### 3. Conectar à Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Selecione seu repositório Git
4. Configure as opções:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Clique em **"Deploy"**

## 🔧 Configurações Importantes

### Build Settings

O arquivo `vercel.json` já está configurado com:
- ✅ Redirects para SPA (React Router)
- ✅ Cache de assets otimizado
- ✅ Headers de segurança

### Variáveis de Ambiente

Se precisar adicionar variáveis de ambiente:

1. No painel da Vercel, vá em **Settings → Environment Variables**
2. Adicione as variáveis necessárias:
   - `VITE_API_URL` (se houver backend)
   - `VITE_GOOGLE_MAPS_KEY` (se usar)

## 📦 Deploy Manual via CLI

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Login na Vercel

```bash
vercel login
```

### 3. Deploy

```bash
# Deploy de preview
vercel

# Deploy para produção
vercel --prod
```

## 🌐 Domínio Personalizado

### Adicionar Domínio

1. No painel da Vercel, vá em **Settings → Domains**
2. Adicione seu domínio (ex: `respiracaooral.pt`)
3. Configure os DNS conforme instruções da Vercel

### Configuração DNS Típica

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔄 Deploy Automático

Cada push para a branch `main` dispara um deploy automático.

### Deploy de Preview

Cada Pull Request cria um preview deploy automático com URL única.

## 📊 Monitoramento

Acesse o painel da Vercel para:
- Ver logs de build
- Métricas de performance
- Analytics de visitantes
- Status de deploys

## 🐛 Troubleshooting

### Build Falha

```bash
# Teste localmente primeiro
npm run build

# Verifique os logs na Vercel
vercel logs [URL_DO_DEPLOY]
```

### Rotas 404

- Verifique se o `vercel.json` está na raiz do projeto
- Confirme que os rewrites estão configurados

### Assets não Carregam

- Verifique se os paths são relativos (não começam com `/` fixo)
- Use `import.meta.env.BASE_URL` quando necessário

## 📱 Performance

O projeto já está otimizado com:
- ✅ Code splitting automático do Vite
- ✅ Minificação de JS/CSS
- ✅ Cache de assets com hash
- ✅ Lazy loading de componentes

## 🔐 Segurança

Headers de segurança já configurados:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📞 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [Comunidade Vercel](https://github.com/vercel/vercel/discussions)
- [Status Page](https://www.vercel-status.com/)

---

**Nota**: O primeiro deploy pode demorar 2-3 minutos. Deploys subsequentes são mais rápidos (~30 segundos).
