import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { SpecialistFinder } from '@/components/SpecialistFinder'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const QuemSomos = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const missionRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const team = [
    {
      name: 'Dra. Ana Martins',
      role: 'Otorrinolaringologista Pediátrica',
      bio: 'Especialista em vias aéreas superiores infantis com 15 anos de experiência.',
      img: 'female',
    },
    {
      name: 'Dr. Carlos Ferreira',
      role: 'Ortodontista',
      bio: 'Focado em ortopedia funcional dos maxilares e desenvolvimento facial.',
      img: 'male',
    },
    {
      name: 'Dra. Sofia Costa',
      role: 'Fonoaudióloga',
      bio: 'Especialista em motricidade orofacial e reeducação respiratória.',
      img: 'female',
    },
  ]

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero */}
      <section className="bg-slate-50 py-20">
        <div 
          ref={heroRef.elementRef}
          className={`container mx-auto px-4 text-center max-w-4xl transition-all duration-1000 ${
            heroRef.isVisible 
              ? 'animate-fade-in-up opacity-100' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Rede de Especialistas em Respiração Oral
          </h1>
          <p className="text-xl text-muted-foreground">
            Conectamos famílias a profissionais qualificados em todo o país para tratar a respiração oral infantil com excelência.
          </p>
        </div>
      </section>

      {/* Specialists Map Section */}
      <section className="container mx-auto px-4">
        <SpecialistFinder />
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4">
        <div 
          ref={missionRef.elementRef}
          className={`bg-white border border-border rounded-3xl p-8 lg:p-16 grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            missionRef.isVisible 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              missionRef.isVisible 
                ? 'animate-fade-in-left opacity-100' 
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-3xl font-bold">A Nossa Missão e Metodologia</h2>
            <p className="text-lg text-muted-foreground">
              Acreditamos que o tratamento da respiração oral exige um olhar
              integral. Não tratamos apenas o sintoma, mas a criança como um
              todo.
            </p>
            <p className="text-lg text-muted-foreground">
              A nossa metodologia integra medicina, odontologia e terapia da fala
              para oferecer diagnósticos precisos e tratamentos eficazes e
              personalizados.
            </p>
            <Button asChild size="lg" className="rounded-full hover-lift">
              <Link to="/avaliacao">Agende uma consulta</Link>
            </Button>
          </div>
          <div 
            className={`transition-all duration-1000 ${
              missionRef.isVisible 
                ? 'animate-fade-in-right opacity-100' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            <img
              src="https://img.usecurling.com/p/600/400?q=medical%20team%20meeting&dpr=2"
              alt="Equipa médica reunida"
              className="rounded-2xl shadow-lg w-full object-cover hover-scale hover-lift transition-all duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuemSomos
