import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Smile, Brain } from 'lucide-react'

const Tratamentos = () => {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Abordagem Multidisciplinar
          </h1>
          <p className="text-xl text-muted-foreground">
            Combinamos diferentes especialidades para tratar a causa e as
            consequências da respiração oral.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
            <CardHeader>
              <Activity className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Fisioterapia Respiratória</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exercícios e técnicas para limpar as vias aéreas, fortalecer os
                músculos respiratórios e reensinar o padrão nasal correto.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-secondary">
            <CardHeader>
              <Smile className="w-12 h-12 text-secondary mb-4" />
              <CardTitle>Reeducação Miofuncional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Terapia fonoaudiológica focada em adequar a postura da língua,
                lábios e bochechas, essenciais para a fala e deglutição.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-orange-400">
            <CardHeader>
              <Brain className="w-12 h-12 text-orange-400 mb-4" />
              <CardTitle>Estratégias Comportamentais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trabalho conjunto com a família para eliminar hábitos nocivos
                (como chupeta) e reforçar comportamentos saudáveis.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-12 lg:p-20">
          <h2 className="text-3xl font-bold mb-6">
            O primeiro passo é a avaliação
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Cada criança é única. Descubra qual o plano de tratamento ideal para
            o seu filho através de uma consulta especializada.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-slate-900 hover:bg-gray-100 rounded-full px-8"
          >
            <Link to="/avaliacao">Iniciar Avaliação Digital</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Tratamentos
