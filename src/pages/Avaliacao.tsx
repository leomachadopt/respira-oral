import { AIChat } from '@/components/AIChat'

const Avaliacao = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="text-center mb-8 max-w-2xl animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
          Avaliação Digital com IA
        </h1>
        <p className="text-muted-foreground text-lg">
          Converse com nosso assistente inteligente para uma triagem inicial
          rápida e segura. Entenda os sinais que seu filho pode estar
          apresentando.
        </p>
      </div>

      <div className="w-full animate-slide-up">
        <AIChat />
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        Nota: Esta ferramenta é apenas para fins informativos e de triagem. Não
        substitui uma consulta médica profissional e diagnóstico clínico.
      </p>
    </div>
  )
}

export default Avaliacao
