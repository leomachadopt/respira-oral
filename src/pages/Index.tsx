import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, AlertTriangle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import useAppStore from '@/stores/useAppStore'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Index = () => {
  const { testimonials } = useAppStore()
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const whatIsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const impactsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const testimonialsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const ctaRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  // Filtrar apenas depoimentos em destaque, ou mostrar todos se não houver destaques
  const displayTestimonials = testimonials.filter(t => t.featured).length > 0
    ? testimonials.filter(t => t.featured).slice(0, 3)
    : testimonials.slice(0, 3)

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.3),transparent_50%)]"></div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          <div 
            ref={heroRef.elementRef}
            className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${
              heroRef.isVisible 
                ? 'animate-fade-in-up opacity-100' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">
              Compreenda a <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">Respiração Oral</span>{' '}
              do Seu Filho
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed animate-fade-in-up animate-stagger-1">
              A respiração pela boca pode afetar o sono, a fala e até o
              aprendizado. Identifique os sinais cedo e garanta um futuro
              saudável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4 animate-fade-in-up animate-stagger-2">
              <Button
                asChild
                size="lg"
                className="rounded-full text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover-lift"
              >
                <Link to="/avaliacao">
                  Avalie a respiração agora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover-scale"
              >
                <Link to="/avaliacao">Fale com a Dra. Ro</Link>
              </Button>
            </div>
          </div>
          <div 
            className={`relative hidden lg:block transition-all duration-1000 ${
              heroRef.isVisible 
                ? 'animate-fade-in-right opacity-100' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-[3rem] blur-3xl transform translate-x-10 translate-y-10 animate-pulse-slow"></div>
            <img
              src="https://img.usecurling.com/p/600/600?q=happy%20child%20smiling&dpr=2"
              alt="Criança feliz e saudável"
              className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-square transform hover:scale-105 transition-transform duration-700 border-4 border-white/20 hover-glow"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* O que é Respiração Oral */}
      <section className="container mx-auto px-4">
        <div 
          ref={whatIsRef.elementRef}
          className={`bg-gradient-to-br from-white to-blue-50/30 rounded-[2.5rem] p-10 lg:p-16 shadow-xl border border-blue-100 grid md:grid-cols-2 gap-16 items-center backdrop-blur-sm transition-all duration-1000 ${
            whatIsRef.isVisible 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <div 
            className={`order-2 md:order-1 transition-all duration-1000 ${
              whatIsRef.isVisible 
                ? 'animate-scale-in opacity-100' 
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative hover-scale">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-2xl animate-pulse-slow"></div>
              <img
                src="https://img.usecurling.com/p/500/400?q=child%20sleeping&dpr=2"
                alt="Criança dormindo"
                className="relative rounded-[2rem] shadow-2xl w-full object-cover border-4 border-white hover-lift"
              />
            </div>
          </div>
          <div 
            className={`space-y-7 order-1 md:order-2 transition-all duration-1000 ${
              whatIsRef.isVisible 
                ? 'animate-fade-in-left opacity-100' 
                : 'opacity-0 -translate-x-10'
            }`}
          >
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
              {[
                'Comum em crianças em fase de crescimento',
                'Pode alterar o desenvolvimento da face',
                'Afeta a qualidade do sono e descanso',
              ].map((text, idx) => (
                <li 
                  key={idx}
                  className={`flex items-center gap-4 text-foreground text-lg transition-all duration-700 ${
                    whatIsRef.isVisible 
                      ? 'animate-fade-in-up opacity-100' 
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover-scale animate-bounce-slow">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
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

        <div 
          ref={impactsRef.elementRef}
          className="container mx-auto px-4 relative z-10"
        >
          <div 
            className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${
              impactsRef.isVisible 
                ? 'animate-fade-in-up opacity-100' 
                : 'opacity-0 translate-y-10'
            }`}
          >
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
                className={`border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group hover-lift ${
                  impactsRef.isVisible 
                    ? 'animate-scale-in opacity-100' 
                    : 'opacity-0 scale-95'
                }`}
                style={{ 
                  animationDelay: `${idx * 150}ms`,
                  transitionDelay: `${idx * 150}ms`
                }}
              >
                <CardContent className="p-10 text-center space-y-5">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-float">{item.icon}</div>
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
      <section 
        ref={testimonialsRef.elementRef}
        className="container mx-auto px-4 py-8"
      >
        <h2 
          className={`text-4xl lg:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${
            testimonialsRef.isVisible 
              ? 'animate-fade-in-up opacity-100' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          O que dizem os pais
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((t, i) => (
            <Card
              key={t.id}
              className={`bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover-lift ${
                testimonialsRef.isVisible 
                  ? 'animate-scale-in opacity-100' 
                  : 'opacity-0 scale-95'
              }`}
              style={{ 
                animationDelay: `${i * 150}ms`,
                transitionDelay: `${i * 150}ms`
              }}
            >
              <CardContent className="p-8 space-y-5">
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground italic text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage
                      src={t.customAvatar || `https://img.usecurling.com/ppl/thumbnail?gender=${t.avatarGender}&seed=${t.avatarSeed}`}
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
        <div 
          ref={ctaRef.elementRef}
          className={`bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-10 relative overflow-hidden shadow-2xl transition-all duration-1000 ${
            ctaRef.isVisible 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <div 
            className={`relative z-10 max-w-3xl mx-auto transition-all duration-1000 ${
              ctaRef.isVisible 
                ? 'animate-bounce-in opacity-100' 
                : 'opacity-0 scale-90'
            }`}
          >
            <div className="w-20 h-20 mx-auto mb-8 bg-yellow-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-yellow-300/50">
              <AlertTriangle className="w-12 h-12 text-yellow-300" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Quando procurar ajuda?
            </h2>
            <p className="text-xl text-white/95 mb-10 leading-relaxed max-w-2xl mx-auto">
              Se o seu filho dorme de boca aberta, ronca ou parece sempre
              cansado, não espere. A intervenção precoce faz toda a diferença.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-blue-700 font-bold text-lg px-12 py-7 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-lift animate-glow"
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
