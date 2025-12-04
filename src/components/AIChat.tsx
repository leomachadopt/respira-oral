import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Bot, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { EvaluationData } from '@/types'
import { analyzeEvaluation } from '@/services/aiAnalysis'
import { findBestSpecialist, getUserLocation } from '@/services/specialistMatching'
import { createEvaluation, updateEvaluation } from '@/services/evaluations'
import useAppStore from '@/stores/useAppStore'

type Message = {
  id: string
  sender: 'ai' | 'user'
  text: string
  type?: 'text' | 'options' | 'form'
  options?: string[]
  multiSelect?: boolean
}

export function AIChat() {
  const navigate = useNavigate()
  const { specialists } = useAppStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<EvaluationData>({})
  const [evaluationId, setEvaluationId] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const addMessage = useCallback((msg: Omit<Message, 'id'>) => {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: Math.random().toString(36).substring(7) },
    ])
  }, [])

  const nextStep = useCallback(() => {
    const currentStep = step + 1
    setStep(currentStep)

    switch (currentStep) {
      case 1:
        addMessage({
          sender: 'ai',
          text: 'Para começarmos, como devemos chamá-lo(a)? Por favor, digite o seu nome:',
          type: 'text',
        })
        break
      case 2:
        addMessage({
          sender: 'ai',
          text: 'Ótimo! Para que possamos enviar o relatório completo da avaliação, qual é o seu número de WhatsApp?',
          type: 'text',
        })
        break
      case 3:
        addMessage({
          sender: 'ai',
          text: 'Perfeito! Agora vamos falar sobre o seu filho(a). Qual a idade dele(a)?',
          type: 'options',
          options: ['0-2 anos', '3-5 anos', '6-10 anos', '11-14 anos', 'Mais de 14 anos'],
        })
        break
      case 4:
        addMessage({
          sender: 'ai',
          text: 'Quais sinais ou comportamentos relacionados à respiração do seu filho(a) tem observado? (Pode selecionar vários)',
          type: 'options',
          options: [
            'Boca aberta constantemente',
            'Ronco ao dormir',
            'Dificuldade para respirar pelo nariz',
            'Lábios ressecados',
            'Baba no travesseiro',
            'Olheiras profundas',
            'Nenhum destes',
          ],
          multiSelect: true,
        })
        setSelectedOptions([])
        break
      case 5:
        addMessage({
          sender: 'ai',
          text: 'O seu filho(a) tem dentes tortos, espaçados ou alguma mordida que não encaixa bem?',
          type: 'options',
          options: [
            'Sim, dentes tortos',
            'Sim, mordida cruzada',
            'Sim, dentes espaçados',
            'Sim, dentes apinhados',
            'Não notei problemas',
            'Não sei dizer',
          ],
        })
        break
      case 6:
        addMessage({
          sender: 'ai',
          text: 'O seu filho(a) ainda usa chupeta, chupa o dedo ou tem algum hábito oral?',
          type: 'options',
          options: [
            'Sim, usa chupeta',
            'Sim, chupa o dedo',
            'Sim, ambos',
            'Não, mas já usou',
            'Não, nunca usou',
          ],
        })
        break
      case 7:
        addMessage({
          sender: 'ai',
          text: 'Já reparou na postura do seu filho(a)? Por exemplo, ele(a) costuma ter a cabeça inclinada para trás ou os ombros curvados?',
          type: 'options',
          options: ['Sim, frequentemente', 'Às vezes', 'Não notei', 'Não sei dizer'],
        })
        break
      case 8:
        addMessage({
          sender: 'ai',
          text: 'O seu filho(a) tem dificuldade em pronunciar certos sons ou fala com a língua entre os dentes?',
          type: 'options',
          options: [
            'Sim, dificuldade de pronúncia',
            'Sim, fala com língua entre dentes',
            'Às vezes',
            'Não',
            'Não sei dizer',
          ],
        })
        break
      case 9:
        addMessage({
          sender: 'ai',
          text: 'Como descreveria a qualidade do sono do seu filho(a)?',
          type: 'options',
          options: [
            'Muito ruim - acorda várias vezes',
            'Ruim - sono agitado',
            'Regular - às vezes agitado',
            'Bom - dorme bem',
            'Não sei avaliar',
          ],
        })
        break
      case 10:
        addMessage({
          sender: 'ai',
          text: 'O seu filho(a) já fez algum tratamento ortodôntico ou de ortopedia funcional anteriormente?',
          type: 'options',
          options: [
            'Sim, tratamento ortodôntico',
            'Sim, ortopedia funcional',
            'Sim, ambos',
            'Não, nunca',
            'Não sei',
          ],
        })
        break
      case 11:
        addMessage({
          sender: 'ai',
          text: 'Para encontrarmos o especialista mais próximo, qual é a sua cidade ou localização? (Pode digitar o nome da cidade)',
          type: 'text',
        })
        break
      case 12:
        addMessage({
          sender: 'ai',
          text: 'Por fim, qual é o seu melhor email para contato?',
          type: 'text',
        })
        break
      default:
        break
    }
  }, [step, addMessage])

  // Função auxiliar para salvar/atualizar avaliação no banco
  const saveEvaluation = useCallback(
    async (data: EvaluationData) => {
      try {
        if (evaluationId) {
          // Atualiza avaliação existente
          await updateEvaluation(evaluationId, data)
        } else if (data.name && data.phone) {
          // Cria nova avaliação (apenas após ter nome e whatsapp)
          const newEvaluation = await createEvaluation(data)
          setEvaluationId(newEvaluation.id)
        }
      } catch (error) {
        console.error('Erro ao salvar avaliação:', error)
        // Não bloqueia o fluxo se der erro ao salvar
      }
    },
    [evaluationId],
  )

  const processInput = useCallback(
    async (input: string) => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))

      switch (step) {
        case 1: // Name
          const updatedWithName = { ...userData, name: input }
          setUserData(updatedWithName)
          nextStep()
          break
        case 2: // Phone/WhatsApp
          const updatedWithPhone = { ...userData, phone: input }
          setUserData(updatedWithPhone)
          // Salva no banco após ter nome e whatsapp
          await saveEvaluation(updatedWithPhone)
          nextStep()
          break
        case 3: // Age
          const updatedWithAge = { ...userData, age: input }
          setUserData(updatedWithAge)
          await saveEvaluation(updatedWithAge)
          nextStep()
          break
        case 4: // Breathing Signs (multi-select)
          if (selectedOptions.length === 0) {
            toast.error('Por favor, selecione pelo menos uma opção')
            setIsLoading(false)
            return
          }
          const updatedWithBreathing = {
            ...userData,
            breathingSigns: selectedOptions.filter((opt) => opt !== 'Nenhum destes'),
          }
          setUserData(updatedWithBreathing)
          await saveEvaluation(updatedWithBreathing)
          setSelectedOptions([])
          nextStep()
          break
        case 5: // Dental Issues
          const updatedWithDental = {
            ...userData,
            dentalIssues: [input],
          }
          setUserData(updatedWithDental)
          await saveEvaluation(updatedWithDental)
          nextStep()
          break
        case 6: // Oral Habits
          const updatedWithHabits = {
            ...userData,
            oralHabits: [input],
          }
          setUserData(updatedWithHabits)
          await saveEvaluation(updatedWithHabits)
          nextStep()
          break
        case 7: // Posture
          const updatedWithPosture = { ...userData, posture: input }
          setUserData(updatedWithPosture)
          await saveEvaluation(updatedWithPosture)
          nextStep()
          break
        case 8: // Speech Issues
          const updatedWithSpeech = { ...userData, speechIssues: input }
          setUserData(updatedWithSpeech)
          await saveEvaluation(updatedWithSpeech)
          nextStep()
          break
        case 9: // Sleep Quality
          const updatedWithSleep = { ...userData, sleepQuality: input }
          setUserData(updatedWithSleep)
          await saveEvaluation(updatedWithSleep)
          nextStep()
          break
        case 10: // Previous Treatment
          const updatedWithTreatment = { ...userData, previousTreatment: input }
          setUserData(updatedWithTreatment)
          await saveEvaluation(updatedWithTreatment)
          nextStep()
          break
        case 11: // Location
          // Tenta obter geolocalização primeiro
          let location = { city: input }
          try {
            const geoLocation = await getUserLocation()
            if (geoLocation) {
              location = {
                city: input || geoLocation.city,
                coords: geoLocation.coords,
              }
            }
          } catch (error) {
            console.error('Erro ao obter localização:', error)
          }
          const updatedWithLocation = { ...userData, location }
          setUserData(updatedWithLocation)
          await saveEvaluation(updatedWithLocation)
          nextStep()
          break
        case 12: // Email & Finish
          const finalData = { ...userData, email: input }
          setUserData(finalData)
          await saveEvaluation(finalData)
          // Processa avaliação completa
          await processEvaluation(finalData)
          break
        default:
          break
      }
      setIsLoading(false)
    },
    [step, nextStep, userData, selectedOptions, saveEvaluation],
  )

  const processEvaluation = async (finalData: EvaluationData) => {
    setIsLoading(true)
    addMessage({
      sender: 'ai',
      text: 'Perfeito! Estou analisando todas as informações...',
    })

    try {
      // Analisa com IA
      const result = await analyzeEvaluation(finalData)

      // Encontra especialista
      const recommendedSpecialist = findBestSpecialist(
        finalData,
        result,
        specialists,
      )

      // Atualiza resultado com especialista
      result.recommendedSpecialist = recommendedSpecialist

      // Determina nível de risco baseado no score
      let riskLevel = 'baixo'
      if (result.score >= 70) {
        riskLevel = 'alto'
      } else if (result.score >= 40) {
        riskLevel = 'moderado'
      }

      // Atualiza avaliação no banco com os resultados finais
      if (evaluationId) {
        await updateEvaluation(
          evaluationId,
          finalData,
          result,
          riskLevel,
          recommendedSpecialist?.id,
        )
      }

      // Salva resultado no sessionStorage para a página de resultado
      sessionStorage.setItem('evaluationResult', JSON.stringify(result))
      sessionStorage.setItem('evaluationData', JSON.stringify(finalData))

      // Mensagem final
      addMessage({
        sender: 'ai',
        text: 'Análise concluída! Vou mostrar os resultados e o especialista recomendado.',
      })

      setTimeout(() => {
        navigate('/resultado-avaliacao', { state: { result, data: finalData } })
      }, 1500)
    } catch (error) {
      console.error('Erro ao processar avaliação:', error)
      toast.error('Erro ao processar avaliação. Tente novamente.')
      setIsLoading(false)
    }
  }

  const handleOptionClick = (option: string) => {
    const currentMessage = messages[messages.length - 1]

    if (currentMessage?.multiSelect) {
      // Multi-select: toggle option
      setSelectedOptions((prev) => {
        if (prev.includes(option)) {
          // Remove opção
          return prev.filter((opt) => opt !== option)
        } else {
          // Adiciona opção
          return [...prev, option]
        }
      })
      // Não avança automaticamente no multi-select
    } else {
      // Single select: avança
      addMessage({ sender: 'user', text: option })
      processInput(option)
    }
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    addMessage({ sender: 'user', text: inputValue })
    processInput(inputValue)
    setInputValue('')
  }

  const handleFinishMultiSelect = () => {
    if (selectedOptions.length === 0) {
      toast.error('Por favor, selecione pelo menos uma opção')
      return
    }
    
    // Adiciona mensagem visual com as opções selecionadas
    const selectedText = selectedOptions.join(', ')
    addMessage({ sender: 'user', text: selectedText })
    
    // Processa com string vazia, o case 2 vai usar selectedOptions do estado
    setIsLoading(true)
    setTimeout(() => {
      processInput('')
    }, 300)
  }

  // Initial greeting
  useEffect(() => {
    if (step === 0) {
      addMessage({
        sender: 'ai',
        text: 'Olá! Sou a Dra. Ro e estou aqui para ajudar a compreender a respiração do seu filho. Vou fazer algumas perguntas para uma avaliação inicial focada em ortopedia funcional dos maxilares. Lembre-se, não faço diagnósticos, apenas ofereço orientação.',
      })
      setTimeout(() => nextStep(), 1000)
    }
  }, [step, addMessage, nextStep])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading, selectedOptions])

  const currentMessage = messages[messages.length - 1]

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-border overflow-hidden">
      <div className="bg-primary p-4 text-white flex items-center gap-3">
        <Bot className="w-6 h-6" />
        <div>
          <h3 className="font-bold">Dra. Ro</h3>
          <p className="text-xs opacity-90">Assistente de Triagem</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex w-full',
                msg.sender === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-2xl animate-fade-in',
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-muted text-foreground rounded-tl-none',
                )}
              >
                <p className="text-sm md:text-base leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                <span
                  className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          )}

          {/* Options Display */}
          {!isLoading &&
            messages.length > 0 &&
            currentMessage?.sender === 'ai' &&
            currentMessage?.type === 'options' && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 mt-2 animate-fade-in">
                  {currentMessage.options?.map((option) => {
                    const isSelected = selectedOptions.includes(option)
                    return (
                      <Button
                        key={option}
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className={cn(
                          'rounded-full transition-all',
                          isSelected
                            ? 'bg-primary text-white shadow-md scale-105'
                            : 'border-primary text-primary hover:bg-primary hover:text-white',
                        )}
                      >
                        {option}
                        {isSelected && ' ✓'}
                      </Button>
                    )
                  })}
                </div>
                {currentMessage?.multiSelect && (
                  <div className="space-y-3 mt-4">
                    {selectedOptions.length > 0 && (
                      <div className="text-sm text-center text-muted-foreground bg-blue-50 py-2 px-4 rounded-full">
                        ✓ {selectedOptions.length} opção{selectedOptions.length > 1 ? 'ões' : ''} selecionada{selectedOptions.length > 1 ? 's' : ''}
                      </div>
                    )}
                    <Button
                      onClick={handleFinishMultiSelect}
                      disabled={selectedOptions.length === 0 || isLoading}
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : selectedOptions.length > 0 ? (
                        <>
                          Continuar com {selectedOptions.length} opç{selectedOptions.length > 1 ? 'ões' : 'ão'}
                        </>
                      ) : (
                        'Selecione pelo menos uma opção para continuar'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
        </div>
      </ScrollArea>

      <div className="p-4 bg-gray-50 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua resposta..."
            className="flex-1 bg-white"
            disabled={
              isLoading ||
              (messages.length > 0 &&
                currentMessage?.type === 'options' &&
                !isMultiSelect)
            }
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
