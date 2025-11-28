import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, User, Bot, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type Message = {
  id: string
  sender: 'ai' | 'user'
  text: string
  type?: 'text' | 'options' | 'form'
  options?: string[]
  multiSelect?: boolean
}

type UserData = {
  age?: string
  signs?: string[]
  sleep?: string
  posture?: string
  allergy?: string
  evaluated?: string
  name?: string
  email?: string
  phone?: string
}

export function AIChat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({})
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const addMessage = useCallback((msg: Omit<Message, 'id'>) => {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: Math.random().toString(36).substring(7) },
    ])
  }, [])

  const finishEvaluation = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success('Informações recebidas com sucesso!')
    navigate('/agendamento')
  }, [navigate])

  const nextStep = useCallback(() => {
    const currentStep = step + 1
    setStep(currentStep)

    switch (currentStep) {
      case 1:
        addMessage({
          sender: 'ai',
          text: 'Para começar, qual a idade do seu filho(a)?',
          type: 'options',
          options: ['0-2 anos', '3-5 anos', '6-10 anos', 'Mais de 10 anos'],
        })
        break
      case 2:
        addMessage({
          sender: 'ai',
          text: 'Quais sinais ou comportamentos relacionados à respiração do seu filho(a) você tem observado?',
          type: 'options',
          options: [
            'Boca aberta constantemente',
            'Ronco ao dormir',
            'Dificuldade para respirar pelo nariz',
            'Lábios ressecados',
          ],
        })
        break
      case 3:
        addMessage({
          sender: 'ai',
          text: 'Durante o sono, você nota algo como ronco, sono agitado, ou o seu filho(a) dorme com a boca aberta?',
          type: 'options',
          options: [
            'Sim, frequentemente',
            'Às vezes',
            'Não notei',
            'Não sei dizer',
          ],
        })
        break
      case 4:
        addMessage({
          sender: 'ai',
          text: 'Você já reparou na postura do seu filho(a)? Por exemplo, ele(a) costuma ter a cabeça inclinada para trás ou os ombros curvados?',
          type: 'options',
          options: ['Sim', 'Não', 'Talvez'],
        })
        break
      case 5:
        addMessage({
          sender: 'ai',
          text: 'Há histórico de alergias na família ou o seu filho(a) sofre de alguma alergia?',
          type: 'options',
          options: ['Sim', 'Não'],
        })
        break
      case 6:
        addMessage({
          sender: 'ai',
          text: 'O seu filho(a) já foi avaliado por um otorrino, pediatra ou fonoaudiólogo em relação à respiração?',
          type: 'options',
          options: ['Sim', 'Não'],
        })
        break
      case 7: {
        // Risk Calculation Logic (Mock)
        const riskLevel = 'moderado' // Mock logic
        addMessage({
          sender: 'ai',
          text: `Com base nas suas respostas, os sinais observados sugerem um nível de risco ${riskLevel} para a respiração oral. É importante investigar mais a fundo, pois a respiração pela boca pode ter impactos significativos no desenvolvimento.`,
        })
        setTimeout(() => {
          addMessage({
            sender: 'ai',
            text: 'Para uma avaliação precisa e um plano de tratamento adequado, o próximo passo é uma consulta com os nossos especialistas.',
          })
          setTimeout(() => {
            addMessage({
              sender: 'ai',
              text: 'Para que possamos entrar em contato e ajudar a agendar a sua consulta, por favor, digite o seu Nome:',
            })
            setStep(8)
          }, 1000)
        }, 1500)
        break
      }
      default:
        break
    }
  }, [step, addMessage])

  const processInput = useCallback(
    async (input: string) => {
      setIsLoading(true)
      // Simulate AI thinking delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      switch (step) {
        case 1: // Age
          setUserData((prev) => ({ ...prev, age: input }))
          nextStep()
          break
        case 2: // Signs
          setUserData((prev) => ({ ...prev, signs: [input] })) // Simplified for demo
          nextStep()
          break
        case 3: // Sleep
          setUserData((prev) => ({ ...prev, sleep: input }))
          nextStep()
          break
        case 4: // Posture
          setUserData((prev) => ({ ...prev, posture: input }))
          nextStep()
          break
        case 5: // Allergy
          setUserData((prev) => ({ ...prev, allergy: input }))
          nextStep()
          break
        case 6: // Evaluated
          setUserData((prev) => ({ ...prev, evaluated: input }))
          nextStep()
          break
        case 7: // Risk Assessment (Internal step, no user input needed really, but we transition)
          // Logic handled in nextStep
          break
        case 8: // Lead Capture - Name
          setUserData((prev) => ({ ...prev, name: input }))
          addMessage({
            sender: 'ai',
            text: 'Obrigado. Qual é o seu melhor email para contato?',
          })
          setStep(9)
          break
        case 9: // Lead Capture - Email
          setUserData((prev) => ({ ...prev, email: input }))
          addMessage({
            sender: 'ai',
            text: 'E por fim, um número de telefone ou WhatsApp?',
          })
          setStep(10)
          break
        case 10: // Lead Capture - Phone & Finish
          setUserData((prev) => ({ ...prev, phone: input }))
          finishEvaluation()
          break
        default:
          break
      }
      setIsLoading(false)
    },
    [step, nextStep, addMessage, finishEvaluation],
  )

  const handleOptionClick = (option: string) => {
    addMessage({ sender: 'user', text: option })
    processInput(option)
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    addMessage({ sender: 'user', text: inputValue })
    processInput(inputValue)
    setInputValue('')
  }

  // Initial greeting
  useEffect(() => {
    if (step === 0) {
      addMessage({
        sender: 'ai',
        text: 'Olá! Sou o seu assistente inteligente e estou aqui para ajudar a compreender a respiração do seu filho. Por favor, responda às minhas perguntas para uma avaliação inicial. Lembre-se, não faço diagnósticos, apenas ofereço orientação.',
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
  }, [messages, isLoading])

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-border overflow-hidden">
      <div className="bg-primary p-4 text-white flex items-center gap-3">
        <Bot className="w-6 h-6" />
        <div>
          <h3 className="font-bold">Assistente Virtual</h3>
          <p className="text-xs opacity-90">Triagem Inicial</p>
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
            messages[messages.length - 1].sender === 'ai' &&
            messages[messages.length - 1].type === 'options' && (
              <div className="flex flex-wrap gap-2 mt-2 animate-fade-in">
                {messages[messages.length - 1].options?.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionClick(option)}
                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    {option}
                  </Button>
                ))}
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
                messages[messages.length - 1].type === 'options')
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
