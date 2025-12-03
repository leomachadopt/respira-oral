import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'
import { Specialist } from '@/types'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  role: z.string().min(2, 'Especialidade é obrigatória'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  address: z.string().min(5, 'Morada completa é obrigatória'),
  phone: z.string().min(9, 'Telefone inválido'),
  whatsapp: z.string().min(9, 'WhatsApp inválido'),
  email: z.string().email('Email inválido'),
  image: z.enum(['male', 'female']),
  coordsTop: z.string().regex(/^\d+%$/, 'Deve ser uma porcentagem (ex: 50%)'),
  coordsLeft: z.string().regex(/^\d+%$/, 'Deve ser uma porcentagem (ex: 50%)'),
})

type FormValues = z.infer<typeof formSchema>

export default function SpecialistForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { specialists, addSpecialist, updateSpecialist } = useAppStore()
  const isEditing = !!id

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      role: '',
      city: '',
      address: '',
      phone: '',
      whatsapp: '',
      email: '',
      image: 'female',
      coordsTop: '50%',
      coordsLeft: '50%',
    },
  })

  useEffect(() => {
    if (isEditing) {
      const specialist = specialists.find((s) => s.id === Number(id))
      if (specialist) {
        form.reset({
          name: specialist.name,
          role: specialist.role,
          city: specialist.city,
          address: specialist.address,
          phone: specialist.phone,
          whatsapp: specialist.whatsapp,
          email: specialist.email,
          image: specialist.image,
          coordsTop: specialist.coords.top,
          coordsLeft: specialist.coords.left,
        })
      } else {
        navigate('/admin/specialists')
      }
    }
  }, [id, isEditing, specialists, navigate, form])

  const onSubmit = (data: FormValues) => {
    const specialistData: Omit<Specialist, 'id'> = {
      name: data.name,
      role: data.role,
      city: data.city,
      address: data.address,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      image: data.image,
      coords: {
        top: data.coordsTop,
        left: data.coordsLeft,
      },
      seed: isEditing
        ? specialists.find((s) => s.id === Number(id))?.seed || 1
        : Math.floor(Math.random() * 100),
    }

    if (isEditing) {
      updateSpecialist(Number(id), specialistData)
    } else {
      addSpecialist(specialistData)
    }
    navigate('/admin/specialists')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/specialists">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? 'Editar Profissional' : 'Novo Profissional'}
          </h1>
          <p className="text-muted-foreground">
            Preencha os dados do especialista abaixo.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Ortodontista Pediátrico"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Lisboa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero (para avatar)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Morada Completa</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua Exemplo, 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="+351..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp (apenas números)</FormLabel>
                    <FormControl>
                      <Input placeholder="3519..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold">Posição no Mapa</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="coordsTop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Top (%)</FormLabel>
                      <FormControl>
                        <Input placeholder="50%" {...field} />
                      </FormControl>
                      <FormDescription>Distância do topo</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordsLeft"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Left (%)</FormLabel>
                      <FormControl>
                        <Input placeholder="50%" {...field} />
                      </FormControl>
                      <FormDescription>Distância da esquerda</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Profissional'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
