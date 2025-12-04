# Upload de Fotos com Cloudinary

## O que foi implementado

✅ Componente `ImageUpload` para fazer upload de fotos
✅ Integração com Cloudinary para armazenamento na nuvem
✅ Preview de imagem em tempo real
✅ Validação (tipo de arquivo e tamanho máximo 5MB)
✅ Salva URL da foto no banco de dados Neon

---

## Para Desenvolvimento Local (Teste Rápido)

**As credenciais de teste já estão configuradas no `.env`:**

```env
VITE_CLOUDINARY_CLOUD_NAME=demo
VITE_CLOUDINARY_UPLOAD_PRESET=docs_upload_example_us_preset
```

⚠️ **ATENÇÃO**: Estas são credenciais públicas de demonstração do Cloudinary.
Funcionam para teste, mas **NÃO devem ser usadas em produção**.

---

## Para Produção (Obrigatório)

### Passo 1: Criar Conta no Cloudinary

1. Aceda a [https://cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. Crie uma conta gratuita (tem 25GB de armazenamento grátis)
3. Confirme seu email

### Passo 2: Obter Cloud Name

1. Faça login em [https://console.cloudinary.com/](https://console.cloudinary.com/)
2. No Dashboard, veja o **"Cloud Name"** (exemplo: `dz123abc`)
3. Anote este valor

### Passo 3: Criar Upload Preset

1. No console do Cloudinary, vá em **Settings** (ícone de engrenagem no canto superior direito)
2. Clique na aba **"Upload"**
3. Role até **"Upload presets"**
4. Clique em **"Add upload preset"**
5. Configure:
   - **Preset name**: `respira_oral_specialists` (ou qualquer nome)
   - **Signing Mode**: **Unsigned** ✅ (importante!)
   - **Folder**: `respira-oral/specialists` (opcional, para organização)
   - **Allowed formats**: `jpg, png, webp`
   - **Max file size**: `5242880` (5MB em bytes)
   - **Transformations**: (opcional)
     - **Width**: 800
     - **Height**: 800
     - **Crop**: Fill
     - **Quality**: Auto
6. Clique em **"Save"**

### Passo 4: Atualizar `.env`

Edite o arquivo `.env` e substitua pelas suas credenciais:

```env
# Cloudinary (Produção)
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui
VITE_CLOUDINARY_UPLOAD_PRESET=respira_oral_specialists
```

### Passo 5: Adicionar no Vercel

1. Vá em [https://vercel.com/](https://vercel.com/)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione:
   - **VITE_CLOUDINARY_CLOUD_NAME**: `seu_cloud_name`
   - **VITE_CLOUDINARY_UPLOAD_PRESET**: `respira_oral_specialists`
5. Aplique em: **Production**, **Preview**, **Development**
6. Redeploy o projeto

---

## Como Usar

### No Admin de Especialistas

1. Aceda a `/admin/specialists`
2. Clique em **"Novo Especialista"** ou edite um existente
3. Vá até o campo **"Foto do Profissional"**
4. Clique em **"Escolher foto"**
5. Selecione uma imagem (JPG, PNG ou WEBP, máx 5MB)
6. A foto será enviada automaticamente para o Cloudinary
7. Preview aparece instantaneamente
8. URL da foto é salva no campo `customImage` no banco de dados

### Preview da Foto

- Se houver `customImage`, a foto personalizada é mostrada
- Se não houver, um avatar genérico é gerado com base no género

---

## Estrutura

### Componente `ImageUpload`

```typescript
<ImageUpload
  value={currentImageUrl}
  onChange={(url) => setImageUrl(url)}
/>
```

**Props:**
- `value`: URL da imagem atual (opcional)
- `onChange`: Callback quando a imagem muda
- `className`: Classes CSS opcionais

### Fluxo de Upload

```
User seleciona imagem
  ↓
Validação (tipo + tamanho)
  ↓
FormData → Cloudinary API
  ↓
Upload + Transformação
  ↓
Retorna URL segura (HTTPS)
  ↓
Salva no banco de dados (campo customImage)
  ↓
Imagem aparece no site
```

---

## Segurança

### Upload Unsigned (Sem Backend)

- ✅ Upload direto do browser para Cloudinary
- ✅ Não precisa de servidor intermediário
- ✅ Mais rápido e escalável
- ⚠️ Qualquer um com o preset pode fazer upload
- 🔒 Configure folder específico para organização

### Transformações Automáticas

Cloudinary pode:
- ✂️ Redimensionar automaticamente (800x800 recomendado)
- 🖼️ Converter para WebP (melhor compressão)
- 🎨 Otimizar qualidade automaticamente
- 📐 Crop inteligente (face detection)

---

## Limites e Custos

### Plano Gratuito

- 🎁 **25 GB** de armazenamento
- 🎁 **25 GB** de bandwidth/mês
- 🎁 **25,000** transformações/mês
- ✅ Suficiente para ~3.000-5.000 fotos
- ✅ Mais do que suficiente para este projeto

### Upgrade (se necessário)

Só se tiver **MUITO** tráfego:
- $99/mês: 140GB storage + 140GB bandwidth
- Pay-as-you-go: $0.40/GB adicional

**Para este projeto, o plano gratuito é mais que suficiente.**

---

## Troubleshooting

### Erro: "Configuração do Cloudinary não encontrada"

**Causa**: `.env` não tem `VITE_CLOUDINARY_CLOUD_NAME` ou `VITE_CLOUDINARY_UPLOAD_PRESET`

**Solução**:
1. Verifique se `.env` existe
2. Verifique se as variáveis estão definidas
3. Reinicie o servidor de desenvolvimento: `npm run dev`

### Erro: "Upload failed" ou 400

**Causa**: Upload preset não existe ou está configurado como "signed"

**Solução**:
1. Vá no console do Cloudinary
2. Settings → Upload → Upload Presets
3. Verifique se o preset existe
4. Certifique-se que **Signing Mode = Unsigned**

### Erro: "File too large"

**Causa**: Imagem maior que 5MB

**Solução**:
- Reduza o tamanho da imagem antes de fazer upload
- Ou aumente o limite no upload preset do Cloudinary

### Imagem não aparece no site

**Causa**: URL não foi salva no banco de dados

**Solução**:
1. Verifique se o upload foi bem-sucedido (toast de sucesso aparece)
2. Vá no Drizzle Studio: `npm run db:studio`
3. Verifique se o campo `custom_image` tem a URL
4. Se não tiver, edite o especialista novamente e faça upload

---

## Alternativas

Se não quiser usar Cloudinary, outras opções:

### 1. Vercel Blob Storage
- ✅ Integrado com Vercel
- ❌ Requer API route (mais complexo)
- 💰 1GB grátis

### 2. ImgBB
- ✅ API simples
- ✅ Upload direto
- 💰 Free limitado

### 3. AWS S3
- ✅ Altamente escalável
- ❌ Configuração complexa
- 💰 Pay-as-you-go

**Cloudinary é a opção mais simples e completa para este projeto.**

---

## Suporte

- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Upload Widget**: https://cloudinary.com/documentation/upload_widget
- **Unsigned Upload**: https://cloudinary.com/documentation/upload_images#unsigned_upload

---

✅ **Status**: Upload de fotos 100% funcional
☁️ **Armazenamento**: Cloudinary
🗄️ **URL**: Salva no Neon (campo `customImage`)
🎨 **Otimização**: Automática
