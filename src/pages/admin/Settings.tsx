import { useState, useEffect } from 'react'
import { Save, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getSetting, saveSetting } from '@/services/settings'

const DEFAULT_PROMPT = `Você é a Dra. Ro, uma assistente especializada em avaliação de respiração oral e ortopedia funcional dos maxilares em crianças.

Analise as seguintes respostas da avaliação e gere um relatório detalhado que identifica os sinais apresentados pela criança:

**DADOS DA CRIANÇA:**
- Nome: {name}
- WhatsApp: {whatsapp}
- Idade: {age}

**RESPOSTAS DA AVALIAÇÃO:**
- Sinais de respiração observados: {breathingSigns}
- Problemas dentários/mordida: {dentalIssues}
- Hábitos orais: {oralHabits}
- Postura: {posture}
- Dificuldades de fala: {speechIssues}
- Qualidade do sono: {sleepQuality}
- Tratamento anterior: {previousTreatment}
- Região: {region}

**INSTRUÇÕES:**
1. Identifique os principais sinais de respiração oral presentes
2. Explique como esses sinais podem estar relacionados
3. Indique o nível de preocupação (baixo, moderado ou alto)
4. Sugira próximos passos e a importância de uma avaliação presencial
5. Seja empático, claro e objetivo
6. Use linguagem acessível para pais/responsáveis

**FORMATO DO RELATÓRIO:**
Estruture o relatório em seções claras:
- Resumo dos sinais identificados
- Possíveis implicações
- Nível de preocupação
- Recomendações

Seja profissional mas acolhedor. Não faça diagnósticos, apenas identifique padrões e oriente sobre a importância da avaliação presencial.`

export default function Settings() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [openaiKey, setOpenaiKey] = useState('')
  const [isKeyConfigured, setIsKeyConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setIsLoading(true)
      const [promptSetting, keySetting] = await Promise.all([
        getSetting('ai_report_prompt'),
        getSetting('openai_api_key'),
      ])

      if (promptSetting) {
        setPrompt(promptSetting.value)
      }
      if (keySetting) {
        // A chave vem mascarada do backend por segurança
        setIsKeyConfigured(keySetting.value === '***configurada***')
        setOpenaiKey('') // Nunca mostrar a chave real
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
      toast.error('Erro ao carregar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      const promises = [
        saveSetting(
          'ai_report_prompt',
          prompt,
          'Prompt usado pela IA para gerar relatórios de avaliação'
        ),
      ]

      // Só salvar a chave se o usuário digitou uma nova
      if (openaiKey.trim().length > 0) {
        promises.push(
          saveSetting(
            'openai_api_key',
            openaiKey,
            'Chave da API OpenAI para gerar relatórios'
          )
        )
      }

      await Promise.all(promises)

      if (openaiKey.trim().length > 0) {
        setIsKeyConfigured(true)
        setOpenaiKey('') // Limpar o campo após salvar
      }

      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    if (
      confirm(
        'Tem certeza que deseja restaurar o prompt padrão? Isso irá sobrescrever as suas alterações.'
      )
    ) {
      setPrompt(DEFAULT_PROMPT)
      toast.success('Prompt restaurado para o padrão')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Configurações da IA
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure o prompt usado pela IA para gerar relatórios de avaliação
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Chave da API OpenAI
          </label>
          {isKeyConfigured && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
              <p className="text-sm text-green-800">
                ✓ Chave OpenAI já configurada e armazenada de forma segura no servidor
              </p>
            </div>
          )}
          <input
            type="password"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            placeholder={isKeyConfigured ? "Digite para atualizar a chave..." : "sk-..."}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">
            {isKeyConfigured
              ? 'A chave atual está armazenada de forma segura. Digite uma nova chave apenas se desejar atualizá-la.'
              : 'Obtenha sua chave em'}{' '}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              platform.openai.com/api-keys
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Prompt de Análise
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              Restaurar Padrão
            </Button>
          </div>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={20}
            className="font-mono text-sm"
            placeholder="Insira o prompt para a IA..."
          />
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-semibold">Variáveis disponíveis:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <code className="bg-muted px-1 rounded">{'{name}'}</code>
              <span>Nome do responsável</span>
              <code className="bg-muted px-1 rounded">{'{whatsapp}'}</code>
              <span>WhatsApp</span>
              <code className="bg-muted px-1 rounded">{'{age}'}</code>
              <span>Idade da criança</span>
              <code className="bg-muted px-1 rounded">{'{breathingSigns}'}</code>
              <span>Sinais de respiração</span>
              <code className="bg-muted px-1 rounded">{'{dentalIssues}'}</code>
              <span>Problemas dentários</span>
              <code className="bg-muted px-1 rounded">{'{oralHabits}'}</code>
              <span>Hábitos orais</span>
              <code className="bg-muted px-1 rounded">{'{posture}'}</code>
              <span>Postura</span>
              <code className="bg-muted px-1 rounded">{'{speechIssues}'}</code>
              <span>Problemas de fala</span>
              <code className="bg-muted px-1 rounded">{'{sleepQuality}'}</code>
              <span>Qualidade do sono</span>
              <code className="bg-muted px-1 rounded">{'{previousTreatment}'}</code>
              <span>Tratamento anterior</span>
              <code className="bg-muted px-1 rounded">{'{region}'}</code>
              <span>Região de Portugal</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                A guardar...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Configurações
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
          🔒 Segurança
        </h3>
        <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
          <li>
            A chave OpenAI é armazenada de forma <strong>criptografada</strong> no servidor
          </li>
          <li>
            A chave <strong>NUNCA</strong> é enviada ao navegador ou exposta no frontend
          </li>
          <li>
            Todas as chamadas à OpenAI são feitas exclusivamente pelo backend
          </li>
        </ul>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="font-semibold text-amber-900 mb-2">
          ℹ️ Informações
        </h3>
        <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
          <li>
            O prompt será usado para gerar relatórios personalizados para cada
            avaliação
          </li>
          <li>
            As variáveis entre chaves (ex: {'{name}'}) serão substituídas pelos dados
            reais da avaliação
          </li>
          <li>Teste o prompt após fazer alterações para garantir bons resultados</li>
        </ul>
      </div>
    </div>
  )
}
