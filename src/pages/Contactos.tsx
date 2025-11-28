import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { toast } from 'sonner'

const Contactos = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(
      'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    )
  }

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-muted-foreground text-lg">
            Estamos aqui para ajudar você e seu filho.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telefone</h3>
                    <p className="text-sm text-muted-foreground">
                      +351 210 000 000
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +351 910 000 000 (WhatsApp)
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      contato@respiracaooral.pt
                    </p>
                    <p className="text-sm text-muted-foreground">
                      agendamento@respiracaooral.pt
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Endereço</h3>
                    <p className="text-sm text-muted-foreground">
                      Av. da Liberdade, 100
                    </p>
                    <p className="text-sm text-muted-foreground">
                      1250-144 Lisboa
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
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

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative">
              <img
                src="https://img.usecurling.com/p/800/400?q=map%20location&dpr=2"
                alt="Mapa"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="secondary">Ver no Google Maps</Button>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Envie uma mensagem</h2>
              <p className="text-muted-foreground">
                Preencha o formulário abaixo e responderemos o mais breve
                possível.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input id="name" placeholder="Seu nome completo" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Telefone
                    </label>
                    <Input id="phone" placeholder="+351..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Assunto
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agendamento">Agendamento</SelectItem>
                      <SelectItem value="duvida">Dúvida Geral</SelectItem>
                      <SelectItem value="parceria">Parceria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Como podemos ajudar?"
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Contactos
