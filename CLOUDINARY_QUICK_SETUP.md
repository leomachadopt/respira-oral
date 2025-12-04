# Configuração Rápida do Cloudinary (5 minutos)

O preset de demonstração não está funcionando. Siga estes passos para configurar sua própria conta:

## Passo 1: Criar Conta (2 minutos)

1. Abra: **https://cloudinary.com/users/register_free**
2. Preencha:
   - Email
   - Password
   - Aceite termos
3. Clique em **"Create Account"**
4. Confirme seu email (verifique spam se não receber)

---

## Passo 2: Obter Cloud Name (30 segundos)

1. Faça login em: **https://console.cloudinary.com/**
2. No topo da página, você verá:
   ```
   Cloud Name: dz123abc
   ```
3. **Copie este valor** (exemplo: `dz123abc`)

---

## Passo 3: Criar Upload Preset (2 minutos)

### 3.1 Acessar Configurações
1. No console, clique no ícone de **engrenagem** (⚙️) no canto superior direito
2. Ou acesse direto: **https://console.cloudinary.com/settings/upload**

### 3.2 Adicionar Preset
1. Vá na aba **"Upload"** (na barra lateral esquerda)
2. Role até a seção **"Upload presets"**
3. Clique em **"Add upload preset"** (botão azul)

### 3.3 Configurar Preset
Configure os seguintes campos:

| Campo | Valor |
|-------|-------|
| **Upload preset name** | `respira_oral` |
| **Signing Mode** | **Unsigned** ⚠️ IMPORTANTE! |
| **Folder** | `respira-oral/specialists` |
| **Use filename** | ✅ Checked |
| **Unique filename** | ✅ Checked |

**Transformações (opcional mas recomendado):**
1. Clique em **"Add eager transformation"**
2. Configure:
   - Width: `800`
   - Height: `800`
   - Crop: `fill`
   - Gravity: `face` (para centralizar rostos)
   - Quality: `auto`

### 3.4 Salvar
Clique em **"Save"** no topo

---

## Passo 4: Atualizar .env (30 segundos)

Edite o arquivo `.env` na raiz do projeto:

```bash
# Substitua pelos seus valores
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui
VITE_CLOUDINARY_UPLOAD_PRESET=respira_oral
```

**Exemplo real:**
```bash
VITE_CLOUDINARY_CLOUD_NAME=dz123abc
VITE_CLOUDINARY_UPLOAD_PRESET=respira_oral
```

---

## Passo 5: Reiniciar Servidor (10 segundos)

No terminal onde está rodando `npm run dev`:

1. Pressione `Ctrl+C` para parar
2. Execute novamente:
   ```bash
   npm run dev
   ```

---

## Passo 6: Testar Upload

1. Abra: **http://localhost:8081/admin/specialists**
2. Clique em **"Novo Especialista"** ou edite um existente
3. Vá até **"Foto do Profissional"**
4. Clique em **"Escolher foto"**
5. Selecione uma imagem
6. Deve ver: ✅ **"Foto enviada com sucesso!"**

---

## Troubleshooting

### ❌ Erro: "Configuração do Cloudinary não encontrada"
**Solução**: Verifique se editou o `.env` corretamente e reiniciou o servidor

### ❌ Erro: 400 Bad Request
**Soluções possíveis:**
1. Verifique se o **Signing Mode** está em **"Unsigned"**
2. Verifique se o nome do preset está correto (sem espaços)
3. Tente criar um novo preset com um nome diferente

### ❌ Erro: 401 Unauthorized
**Solução**: O preset está configurado como "Signed". Mude para "Unsigned"

### ❌ Upload demora muito
**Solução**: A imagem pode ser muito grande. Tente uma imagem menor (< 2MB)

---

## Onde Encontrar as Informações

### Cloud Name
📍 **https://console.cloudinary.com/console** → No topo da página

### Upload Presets
📍 **https://console.cloudinary.com/settings/upload** → Seção "Upload presets"

### Verificar Uploads
📍 **https://console.cloudinary.com/console/media_library** → Ver todas as imagens enviadas

---

## Limites do Plano Gratuito

- ✅ **25 GB** de armazenamento
- ✅ **25 GB** de bandwidth por mês
- ✅ **25,000** transformações por mês
- ✅ Sem limite de uploads
- ✅ **Suficiente para ~3.000-5.000 fotos**

Para um site de especialistas, isso é **MUITO mais do que suficiente**.

---

## Checklist Rápido

- [ ] Criar conta no Cloudinary
- [ ] Confirmar email
- [ ] Copiar Cloud Name
- [ ] Criar Upload Preset (nome: `respira_oral`)
- [ ] Configurar como **Unsigned**
- [ ] Atualizar `.env` com suas credenciais
- [ ] Reiniciar servidor (`Ctrl+C` → `npm run dev`)
- [ ] Testar upload no admin

---

## Próximo Passo para Produção

Quando fizer deploy no Vercel:

1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`
3. Aplique em todos os ambientes
4. Redeploy

---

**Tempo total: ~5 minutos**
**Custo: R$ 0,00 (plano gratuito)**
