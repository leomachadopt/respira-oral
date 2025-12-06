import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import { EvaluationResultComponent } from '@/components/EvaluationResult'
import { EvaluationResult, EvaluationData } from '@/types'
import { toast } from 'sonner'

const ResultadoAvaliacao = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [data, setData] = useState<EvaluationData | null>(null)

  useEffect(() => {
    // Tenta obter do state da navegação primeiro
    if (location.state?.result) {
      setResult(location.state.result)
      setData(location.state.data)
      return
    }

    // Se não houver, tenta do sessionStorage
    const storedResult = sessionStorage.getItem('evaluationResult')
    const storedData = sessionStorage.getItem('evaluationData')

    if (storedResult && storedData) {
      try {
        setResult(JSON.parse(storedResult))
        setData(JSON.parse(storedData))
      } catch (error) {
        console.error('Erro ao carregar resultado:', error)
        toast.error('Erro ao carregar resultado da avaliação')
        navigate('/avaliacao')
      }
    } else {
      // Se não houver resultado, redireciona para avaliação
      toast.error('Nenhum resultado encontrado. Por favor, faça a avaliação novamente.')
      navigate('/avaliacao')
    }
  }, [location, navigate])

  if (!result || !data) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Carregando resultado...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-foreground">
              Resultado da Avaliação
            </h1>
            <p className="text-muted-foreground">
              Análise completa realizada pela Dra. Ro
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/avaliacao')}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nova Avaliação
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Início
            </Button>
          </div>
        </div>

        {/* Result Component */}
        <EvaluationResultComponent
          result={result}
          specialist={result.recommendedSpecialist}
        />
      </div>
    </div>
  )
}

export default ResultadoAvaliacao



