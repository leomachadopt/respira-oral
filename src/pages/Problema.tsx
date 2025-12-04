import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Problema = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const contentRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const sidebarRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero */}
      <section className="bg-blue-50 py-20">
        <div 
          ref={heroRef.elementRef}
          className={`container mx-auto px-4 max-w-4xl text-center transition-all duration-1000 ${
            heroRef.isVisible 
              ? 'animate-fade-in-up opacity-100' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Respiração Oral em Crianças: Compreenda, Identifique e Aja
          </h1>
          <p className="text-xl text-muted-foreground">
            Um guia completo para pais sobre as causas, sintomas e consequências
            de respirar pela boca na infância.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 grid lg:grid-cols-3 gap-12">
        <div 
          ref={contentRef.elementRef}
          className={`lg:col-span-2 space-y-12 transition-all duration-1000 ${
            contentRef.isVisible 
              ? 'animate-fade-in-left opacity-100' 
              : 'opacity-0 -translate-x-10'
          }`}
        >
          {/* What is it */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-4">
              O que é a Respiração Oral?
            </h2>
            <p>
              A respiração oral é uma condição onde a criança substitui o padrão
              correto de respiração nasal pela respiração através da boca. O
              nariz tem funções vitais: filtrar, aquecer e umidificar o ar.
              Quando o ar entra pela boca, ele chega aos pulmões "sujo", frio e
              seco, o que pode levar a diversas complicações.
            </p>
            <img
              src="https://img.usecurling.com/p/800/400?q=anatomy%20illustration%20child&dpr=2"
              alt="Ilustração anatômica"
              className="rounded-xl shadow-md my-6 w-full object-cover hover-scale hover-lift transition-all duration-300"
            />
          </div>

          {/* Symptoms */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              Sintomas e Sinais de Alerta
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Dorme com a boca aberta',
                'Ronca ou tem sono agitado',
                'Baba no travesseiro',
                'Lábios secos e rachados',
                'Olheiras profundas',
                'Postura curvada',
                'Dificuldade de concentração',
                'Come de boca aberta ou rápido demais',
              ].map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-4 bg-white border border-border rounded-lg shadow-sm hover-lift transition-all duration-300 ${
                    contentRef.isVisible 
                      ? 'animate-scale-in opacity-100' 
                      : 'opacity-0 scale-95'
                  }`}
                  style={{ 
                    animationDelay: `${i * 100}ms`,
                    transitionDelay: `${i * 100}ms`
                  }}
                >
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-slow" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impacts */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              Impactos no Desenvolvimento
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  Sono e Descanso
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  A respiração oral fragmenta o sono, impedindo que a criança
                  atinja os estágios profundos de descanso. Isso resulta em
                  irritabilidade, sonolência diurna e até hiperatividade.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  Fala e Linguagem
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  A flacidez dos músculos da face e a posição incorreta da
                  língua podem causar alterações na fala, como o ceceio (falar
                  com a língua entre os dentes) e dificuldade em pronunciar
                  certos fonemas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  Dentes e Face
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Pode levar ao estreitamento do maxilar, mordida cruzada,
                  dentes tortos e um perfil facial alongado e "triste".
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Sidebar CTA */}
        <div 
          ref={sidebarRef.elementRef}
          className={`lg:col-span-1 space-y-6 transition-all duration-1000 ${
            sidebarRef.isVisible 
              ? 'animate-fade-in-right opacity-100' 
              : 'opacity-0 translate-x-10'
          }`}
        >
          <Card className="sticky top-24 border-primary/20 shadow-lg bg-blue-50/50 hover-lift">
            <CardHeader>
              <CardTitle className="text-primary">
                Identificou algum sinal?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Não deixe a dúvida persistir. A Dra. Ro pode ajudar numa triagem
                inicial rápida e gratuita.
              </p>
              <Button asChild className="w-full rounded-full">
                <Link to="/avaliacao">Fale com a Dra. Ro agora</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Problema
