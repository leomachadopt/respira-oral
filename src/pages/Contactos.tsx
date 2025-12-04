import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

const Contactos = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success(
      'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    )
    setIsSubmitting(false)
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="flex flex-col gap-12 pb-16 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Entre em Contato
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estamos aqui para ajudá-lo a si e ao seu filho. Agende uma consulta, tire
            as suas dúvidas ou venha visitar-nos.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Phone */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telefone</h3>
                    <p className="text-sm text-muted-foreground">
                      +351 210 000 000
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-primary mt-1"
                      asChild
                    >
                      <a href="tel:+351210000000">Ligar agora</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      Atendimento Rápido
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-green-600 mt-1"
                      asChild
                    >
                      <a
                        href="https://wa.me/351910000000"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Iniciar conversa
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground break-all">
                      contato@respiracaooral.pt
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-primary mt-1"
                      asChild
                    >
                      <a href="mailto:contato@respiracaooral.pt">
                        Enviar email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Horário</h3>
                    <p className="text-sm text-muted-foreground">
                      Seg - Sex: 09:00 - 19:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sáb: 09:00 - 13:00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Address Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">A Nossa Localização</h3>
                  <p className="text-muted-foreground">Av. da Liberdade, 100</p>
                  <p className="text-muted-foreground">
                    1250-144 Lisboa, Portugal
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Localizado no centro de Lisboa, com fácil acesso a
                    transportes públicos e estacionamento próximo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Envie uma mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e responderemos o mais breve
                possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="O seu nome"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="+351..."
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Select disabled={isSubmitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agendamento">
                        Agendamento de Consulta
                      </SelectItem>
                      <SelectItem value="duvida">
                        Dúvida sobre Tratamentos
                      </SelectItem>
                      <SelectItem value="avaliacao">
                        Sobre a Avaliação com Dra. Ro
                      </SelectItem>
                      <SelectItem value="parceria">Parcerias</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Como podemos ajudar?"
                    className="min-h-[120px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl overflow-hidden shadow-lg border border-border h-[400px] relative bg-slate-100">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?q=Av.+da+Liberdade,+100,+Lisboa&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Localização da Clínica"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </section>
    </div>
  )
}

export default Contactos
