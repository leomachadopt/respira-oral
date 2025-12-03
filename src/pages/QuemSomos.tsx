import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { SpecialistFinder } from '@/components/SpecialistFinder'

const QuemSomos = () => {
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
        <div className="container mx-auto px-4 text-center max-w-4xl">
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
        <div className="bg-white border border-border rounded-3xl p-8 lg:p-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Nossa Missão e Metodologia</h2>
            <p className="text-lg text-muted-foreground">
              Acreditamos que o tratamento da respiração oral exige um olhar
              integral. Não tratamos apenas o sintoma, mas a criança como um
              todo.
            </p>
            <p className="text-lg text-muted-foreground">
              Nossa metodologia integra medicina, odontologia e terapia da fala
              para oferecer diagnósticos precisos e tratamentos eficazes e
              personalizados.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/avaliacao">Agende uma consulta</Link>
            </Button>
          </div>
          <div>
            <img
              src="https://img.usecurling.com/p/600/400?q=medical%20team%20meeting&dpr=2"
              alt="Equipa médica reunida"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuemSomos
