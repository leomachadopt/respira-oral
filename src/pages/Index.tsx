import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, AlertTriangle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Index = () => {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden min-h-screen flex items-center">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.3),transparent_50%)]"></div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-white">
              Compreenda a <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Respiração Oral</span>{' '}
              do Seu Filho
            </h1>
            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
              A respiração pela boca pode afetar o sono, a fala e até o
              aprendizado. Identifique os sinais cedo e garanta um futuro
              saudável.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Button
                asChild
                size="lg"
                className="rounded-full text-lg px-10 py-7 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
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
                className="rounded-full text-lg px-10 py-7 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <Link to="/avaliacao">Fale com a IA</Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-[3rem] blur-3xl transform translate-x-10 translate-y-10"></div>
            <img
              src="https://img.usecurling.com/p/600/600?q=happy%20child%20smiling&dpr=2"
              alt="Criança feliz e saudável"
              className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-square transform hover:scale-105 transition-transform duration-700 border-4 border-white/20"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* O que é Respiração Oral */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-[2.5rem] p-10 lg:p-16 shadow-xl border border-blue-100 grid md:grid-cols-2 gap-16 items-center backdrop-blur-sm">
          <div className="order-2 md:order-1 animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-2xl"></div>
              <img
                src="https://img.usecurling.com/p/500/400?q=child%20sleeping&dpr=2"
                alt="Criança dormindo"
                className="relative rounded-[2rem] shadow-2xl w-full object-cover border-4 border-white"
              />
            </div>
          </div>
          <div className="space-y-7 order-1 md:order-2 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              O que é a Respiração Oral?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A respiração oral ocorre quando a criança respira
              predominantemente pela boca, em vez do nariz. Embora pareça
              inofensivo, pode ser um sinal de obstrução nasal, alergias ou
              hábitos que precisam de atenção.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-foreground text-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span>Comum em crianças em fase de crescimento</span>
              </li>
              <li className="flex items-center gap-4 text-foreground text-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span>Pode alterar o desenvolvimento da face</span>
              </li>
              <li className="flex items-center gap-4 text-foreground text-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span>Afeta a qualidade do sono e descanso</span>
              </li>
            </ul>
            <Button
              asChild
              variant="link"
              className="text-primary p-0 h-auto font-semibold text-lg hover:gap-3 transition-all group"
            >
              <Link to="/problema" className="flex items-center gap-2">
                Saiba mais sobre o problema{' '}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Consequências */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Impactos no Desenvolvimento
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
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
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-scale-in group"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <CardContent className="p-10 text-center space-y-5">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 animate-slide-up">
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
            <Card
              key={i}
              className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <CardContent className="p-8 space-y-5">
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground italic text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? 'female' : 'male'}&seed=${i}`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-base">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Warning Signs CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto animate-slide-up">
            <div className="w-20 h-20 mx-auto mb-8 bg-yellow-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-yellow-300/50">
              <AlertTriangle className="w-12 h-12 text-yellow-300" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Quando procurar ajuda?
            </h2>
            <p className="text-xl opacity-95 mb-10 leading-relaxed max-w-2xl mx-auto">
              Se o seu filho dorme de boca aberta, ronca ou parece sempre
              cansado, não espere. A intervenção precoce faz toda a diferença.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-blue-700 font-bold text-lg px-12 py-7 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/avaliacao">Falar com um especialista agora</Link>
            </Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>
      </section>
    </div>
  )
}

export default Index
