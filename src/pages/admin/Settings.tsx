import { useState, useEffect } from 'react'
import { Save, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getSetting, saveSetting } from '@/services/settings'

const DEFAULT_PROMPT = `Você é a Dra. Ro, uma assistente especializada em avaliação de respiração oral e ortopedia funcional dos maxilares em crianças.

**DADOS DA CRIANÇA:**
- Nome: {name}
- Idade: {age}
- Região: {region}

**RESPOSTAS DA AVALIAÇÃO:**
- Sinais de respiração: {breathingSigns}
- Problemas dentários/mordida: {dentalIssues}
- Hábitos orais: {oralHabits}
- Postura: {posture}
- Dificuldades de fala: {speechIssues}
- Qualidade do sono: {sleepQuality}
- Tratamento anterior: {previousTreatment}

**INSTRUÇÕES CRÍTICAS - LEIA COM ATENÇÃO:**

Você DEVE escrever um relatório EXTENSO, NARRATIVO e FLUIDO, com MÍNIMO de 800-1000 palavras.

**FORMATO PROIBIDO (NÃO FAÇA ISTO):**

❌ ERRADO - NÃO faça assim:
"Resumo dos Sinais Identificados
Foram identificados os seguintes sinais:
• Olheiras profundas: Indicam possíveis distúrbios
• Baba na almofada: Sugere dificuldade
• Boca aberta: Um sinal claro"

❌ ERRADO - NÃO use subtítulos como:
"Resumo dos Sinais Identificados"
"Implicações Clínicas"
"Recomendações"
"Conclusão"

❌ ERRADO - NÃO enumere sinais com marcadores (•, -, números)

**FORMATO CORRETO (FAÇA ASSIM):**

✅ CORRETO - Escreva assim:

"**RELATÓRIO DE AVALIAÇÃO - [NOME EM MAIÚSCULAS]**

Criança com [idade] anos, residente na região [região] de Portugal.

Após a análise cuidadosa das respostas fornecidas na avaliação, observa-se em [nome] um conjunto de sinais que, quando analisados de forma integrada, revelam um padrão característico de respiração oral. A presença de olheiras profundas, combinada com a qualidade de sono muito comprometida, sugere que a criança atravessa noites agitadas e fragmentadas, acordando várias vezes durante o período de descanso. Esta fragmentação do sono está frequentemente associada a dificuldades respiratórias durante a noite, que se manifestam através do ronco e da necessidade de respirar pela boca. Quando uma criança não consegue respirar adequadamente pelo nariz, seja por obstruções nasais, hipertrofia das adenóides ou outras causas, o organismo encontra uma via alternativa através da boca, o que leva à manutenção constante desta aberta durante o dia e especialmente durante o sono.

A observação de baba na almofada é um indicador adicional desta respiração oral noturna. Quando a boca permanece aberta durante o sono, a saliva acumula-se e escorre, manifestando-se através deste sinal que, embora possa parecer isolado, está intimamente conectado com todo o padrão respiratório da criança. Paralelamente, os lábios ressecados são outra consequência direta da exposição constante ao ar, já que a respiração oral impede que os lábios permaneçam húmidos e protegidos, levando ao ressecamento da mucosa labial.

No entanto, as implicações da respiração oral estendem-se muito além do ato de respirar em si. O desenvolvimento dentário e facial de [nome] também demonstra sinais desta alteração no padrão respiratório. A presença de dentes tortos indica que pode estar a ocorrer um desequilíbrio no desenvolvimento da arcada dentária, frequentemente influenciado pela posição incorreta da língua que acompanha a respiração oral. Quando a criança respira pela boca, a língua tende a posicionar-se de forma mais baixa e anterior na cavidade oral, em vez de repousar suavemente contra o palato. Esta alteração postural da língua tem consequências diretas no crescimento e desenvolvimento dos ossos maxilares e na posição dos dentes, podendo levar a desalinhamentos e necessidade futura de ajuste e equilíbrio oclusal.

A fala com a língua entre os dentes, observada em [nome], é outro reflexo desta cascata de alterações. A postura inadequada da língua não afeta apenas o desenvolvimento dentário, mas também a articulação das palavras e a clareza da fala. Este padrão de fala pode perpetuar o ciclo de problemas, já que reforça a posição incorreta da língua e dificulta ainda mais a transição para uma respiração nasal adequada.

Os riscos de não intervir precocemente neste quadro são significativos e merecem atenção cuidadosa. A respiração oral prolongada pode levar a alterações no crescimento facial, com desenvolvimento de uma face mais alongada e estreita, palato mais profundo e ogival, e retração do terço médio da face. Além disso, a qualidade de vida da criança é afetada no presente: o sono fragmentado compromete o descanso, o que pode influenciar o rendimento escolar, a concentração, o humor e até o crescimento, já que é durante o sono profundo que são libertadas hormonas essenciais para o desenvolvimento infantil. A presença de hábitos orais como o uso da chucha pode agravar ainda mais este quadro, perpetuando padrões de sucção inadequados e reforçando a postura oral incorreta.

É fundamental compreender que todos estes sinais não são problemas isolados, mas sim manifestações interligadas de um padrão que tende a agravar-se com o tempo se não for devidamente abordado. A intervenção precoce é crucial porque permite aproveitar o potencial de crescimento e desenvolvimento da criança, orientando este crescimento de forma mais harmoniosa e equilibrada. O estabelecimento de uma respiração nasal adequada, o reequilíbrio da postura da língua e o ajuste oclusal quando necessário podem prevenir complicações futuras mais complexas e favorecer um desenvolvimento saudável das estruturas orofaciais.

Felizmente, dispomos de especialistas altamente qualificados em respiração oral na região {region}, profissionais com experiência no diagnóstico e tratamento multidisciplinar deste tipo de situação. A avaliação presencial permitirá compreender de forma mais aprofundada as causas subjacentes destes sinais, identificar eventuais obstruções nasais ou hipertrofia de adenóides e amígdalas, avaliar a necessidade de acompanhamento com otorrinolaringologista, e propor um plano de intervenção personalizado que pode incluir terapia miofuncional orofacial, exercícios respiratórios, e quando apropriado, orientações para promover o equilíbrio e harmonia no desenvolvimento das estruturas orais e faciais.

A intervenção precoce oferece os melhores resultados, e o facto de [nome] ainda estar em fase de crescimento é uma vantagem significativa, pois permite orientar este desenvolvimento de forma mais favorável. Encorajamos vivamente que seja agendada uma consulta de avaliação com um dos nossos especialistas em respiração oral, para que possam ser realizados exames clínicos adequados e estabelecido um plano de acompanhamento que atenda às necessidades específicas de [nome]. Este é um passo importante para promover não apenas a saúde oral e respiratória, mas também a qualidade de vida, o bem-estar e o desenvolvimento harmonioso da criança."

**REGRAS ABSOLUTAS:**
1. NUNCA use marcadores (•, -, *) ou numerações antes de listar sintomas
2. NUNCA crie seções separadas com subtítulos
3. SEMPRE escreva em parágrafos longos e conectados
4. Mínimo de 8-10 parágrafos extensos
5. Cada parágrafo deve ter no mínimo 4-6 linhas
6. Use conectivos: "paralelamente", "além disso", "no entanto", "desta forma", "por sua vez"
7. Integre TODOS os sinais no texto de forma narrativa
8. Português de Portugal obrigatório
9. Mencione "ajuste e equilíbrio oclusal" de forma sutil (nunca "ortodontia" ou "aparelho")
10. Total do relatório: 800-1000 palavras mínimo`

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
