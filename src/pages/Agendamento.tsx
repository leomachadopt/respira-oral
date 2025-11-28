import { Link } from 'react-router-dom'
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const Agendamento = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-lg w-full text-center shadow-xl border-primary/20">
        <CardContent className="pt-12 pb-12 px-8 space-y-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Obrigado!</h1>
            <p className="text-muted-foreground text-lg">
              Recebemos as suas informações. A nossa equipa entrará em contato
              em breve pelo WhatsApp ou Email para confirmar os detalhes.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-primary mb-2">Quer agilizar?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Você pode verificar nossa disponibilidade e pré-agendar um horário
              agora mesmo.
            </p>
            <Button className="w-full gap-2">
              <Calendar className="w-4 h-4" />
              Ver Agenda Online
            </Button>
          </div>

          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            <Link to="/">
              Voltar para a página inicial{' '}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Agendamento
