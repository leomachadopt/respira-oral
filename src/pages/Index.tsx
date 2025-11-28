import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, AlertTriangle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Index = () => {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-foreground">
              Compreenda a <span className="text-primary">Respiração Oral</span>{' '}
              do Seu Filho e Proteja o Seu Desenvolvimento.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              A respiração pela boca pode afetar o sono, a fala e até o
              aprendizado. Identifique os sinais cedo e garanta um futuro
              saudável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-full text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/avaliacao">
                  Avalie a respiração agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full text-lg px-8 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Link to="/avaliacao">Fale com a IA</Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in hidden lg:block">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
            <img
              src="https://img.usecurling.com/p/600/600?q=happy%20child%20smiling&dpr=2"
              alt="Criança feliz e saudável"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-square transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* O que é Respiração Oral */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-subtle border border-border grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://img.usecurling.com/p/500/400?q=child%20sleeping&dpr=2"
              alt="Criança dormindo"
              className="rounded-2xl shadow-md w-full object-cover"
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-foreground">
              O que é a Respiração Oral?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A respiração oral ocorre quando a criança respira
              predominantemente pela boca, em vez do nariz. Embora pareça
              inofensivo, pode ser um sinal de obstrução nasal, alergias ou
              hábitos que precisam de atenção.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>Comum em crianças em fase de crescimento</span>
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>Pode alterar o desenvolvimento da face</span>
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>Afeta a qualidade do sono e descanso</span>
              </li>
            </ul>
            <Button
              asChild
              variant="link"
              className="text-primary p-0 h-auto font-semibold text-lg"
            >
              <Link to="/problema">
                Saiba mais sobre o problema{' '}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Consequências */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Impactos no Desenvolvimento
            </h2>
            <p className="text-muted-foreground text-lg">
              A respiração oral não tratada pode ter consequências que vão além
              da saúde física, afetando o dia a dia da criança.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sono e Cansaço',
                desc: 'Sono agitado, ronco e cansaço diurno, afetando a energia para brincar.',
                icon: '💤',
              },
              {
                title: 'Fala e Linguagem',
                desc: 'Alterações na dicção e dificuldade em pronunciar certos sons.',
                icon: '🗣️',
              },
              {
                title: 'Aprendizagem',
                desc: 'Dificuldade de concentração na escola devido à má qualidade do sono.',
                icon: '📚',
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="border-none shadow-elevation hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          O que dizem os pais
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Maria Silva',
              text: 'A avaliação foi um divisor de águas. Meu filho dorme muito melhor agora!',
              role: 'Mãe do Pedro, 5 anos',
            },
            {
              name: 'João Santos',
              text: 'A equipe é fantástica. Ajudaram-nos a entender o problema sem alarmismo.',
              role: 'Pai da Ana, 7 anos',
            },
            {
              name: 'Carla Dias',
              text: 'Recomendo a todos os pais. A IA ajudou-nos a perceber que precisávamos de ajuda.',
              role: 'Mãe do Lucas, 4 anos',
            },
          ].map((t, i) => (
            <Card key={i} className="bg-white border border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar>
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? 'female' : 'male'}&seed=${i}`}
                    />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Warning Signs CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 lg:p-16 text-center text-white space-y-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <AlertTriangle className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Quando procurar ajuda?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Se o seu filho dorme de boca aberta, ronca ou parece sempre
              cansado, não espere. A intervenção precoce faz toda a diferença.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full text-primary font-bold text-lg px-10 hover:bg-white"
            >
              <Link to="/avaliacao">Falar com um especialista agora</Link>
            </Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>
    </div>
  )
}

export default Index
