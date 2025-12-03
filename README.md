# Respiração Oral - Rede de Especialistas

Plataforma web para conectar famílias a especialistas em respiração oral infantil em Portugal.

## 🌟 Funcionalidades

- 🗺️ **Mapa Interativo** - Visualize especialistas em Portugal com Leaflet Maps
- 📍 **Geolocalização Precisa** - Coordenadas GPS reais via OpenStreetMap
- 👨‍⚕️ **Rede de Especialistas** - Ortodontistas, dentistas e fonoaudiólogos
- 📱 **Contato Direto** - Telefone, WhatsApp e email integrados
- 🔍 **Filtros por Cidade** - Encontre profissionais próximos a você
- 📝 **Blog Educativo** - Artigos sobre respiração oral infantil
- 🎯 **Avaliação Online** - Chat com IA para orientação inicial
- 🔐 **Painel Admin** - Gerenciamento de especialistas e conteúdo

## 🚀 Stack Tecnológica

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool extremamente rápida
- **TypeScript** - Superset tipado do JavaScript
- **Shadcn UI** - Componentes reutilizáveis e acessíveis
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento para aplicações React
- **Leaflet** - Mapas interativos open-source
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de schemas TypeScript-first
- **Zustand** - State management leve e eficiente

## 📋 Pré-requisitos

- Node.js 18+
- npm

## 🔧 Instalação

```bash
npm install
```

## 💻 Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm start
# ou
npm run dev
```

Abre a aplicação em modo de desenvolvimento em [http://localhost:5173](http://localhost:5173).

### Build

```bash
# Build para produção
npm run build

# Build para desenvolvimento
npm run build:dev
```

Gera os arquivos otimizados para produção na pasta `dist/`.

### Preview

```bash
# Visualizar build de produção localmente
npm run preview
```

Permite visualizar a build de produção localmente antes do deploy.

### Linting e Formatação

```bash
# Executar linter
npm run lint

# Executar linter e corrigir problemas automaticamente
npm run lint:fix

# Formatar código com Prettier
npm run format
```

## 📁 Estrutura do Projeto

```
.
├── src/              # Código fonte da aplicação
├── public/           # Arquivos estáticos
├── dist/             # Build de produção (gerado)
├── node_modules/     # Dependências (gerado)
└── package.json      # Configurações e dependências do projeto
```

## 🎨 Componentes UI

Este template inclui uma biblioteca completa de componentes Shadcn UI baseados em Radix UI:

- Accordion
- Alert Dialog
- Avatar
- Button
- Checkbox
- Dialog
- Dropdown Menu
- Form
- Input
- Label
- Select
- Switch
- Tabs
- Toast
- Tooltip
- E muito mais...

## 📝 Ferramentas de Qualidade de Código

- **TypeScript**: Tipagem estática
- **ESLint**: Análise de código estático
- **Oxlint**: Linter extremamente rápido
- **Prettier**: Formatação automática de código

## 🔄 Workflow de Desenvolvimento

1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm start`
3. Faça suas alterações
4. Verifique o código: `npm run lint`
5. Formate o código: `npm run format`
6. Crie a build: `npm run build`
7. Visualize a build: `npm run preview`

## 📦 Build e Deploy

### Build Local

Para criar uma build otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/` e estarão prontos para deploy.

### Deploy na Vercel

Este projeto está otimizado para deploy na Vercel. Consulte [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.

**Deploy Rápido:**

1. Push para GitHub/GitLab
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Deploy automático! 🚀

**Configurações Incluídas:**
- ✅ `vercel.json` - Routing e headers otimizados
- ✅ Code splitting automático
- ✅ Cache otimizado para assets
- ✅ SEO meta tags
- ✅ Security headers

## 🗺️ Estrutura de Dados

### Especialistas

```typescript
interface Specialist {
  id: number
  name: string
  role: string
  city: string
  address: string
  phone: string
  whatsapp: string
  email: string
  coords: { lat: number; lng: number }
  image: 'male' | 'female'
  customImage?: string
  seed: number
}
```

### Storage

Os dados são armazenados no `localStorage` do navegador:
- `specialists` - Lista de especialistas
- `blogPosts` - Artigos do blog

Para resetar os dados:
```javascript
localStorage.removeItem('specialists')
localStorage.removeItem('blogPosts')
location.reload()
```

## 🔧 Configuração

### Adicionar Especialista via Admin

1. Acesse `/admin/specialists`
2. Clique em "Novo Profissional"
3. Preencha os dados
4. Use "Obter Coordenadas" para geocoding automático
5. Salve

### Geocoding

O sistema usa a API gratuita do OpenStreetMap (Nominatim) para converter endereços em coordenadas GPS automaticamente.

## 🎨 Personalização

### Cores

As cores principais estão definidas em `src/main.css`:
- Primary: Azul (#3B82F6)
- Secondary: Roxo (#9333EA)

### Mapa

O mapa usa tiles do OpenStreetMap. Para personalizar:
- Edite `src/components/InteractiveMap.tsx`
- Troque os tiles ou adicione controles personalizados

## 🔒 Segurança

- Headers de segurança configurados via Vercel
- Validação de formulários com Zod
- Sanitização de inputs
- HTTPS forçado em produção

## 📱 Responsividade

O site é totalmente responsivo:
- Mobile First design
- Breakpoints Tailwind padrão
- Mapa adaptativo
- Menu mobile com drawer
