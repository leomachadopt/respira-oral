import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, MapPin, Loader2 } from 'lucide-react'
import { geocodeAddress, PORTUGAL_CITIES } from '@/lib/geocoding'
import { toast } from 'sonner'
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
  coordsLat: z.number().min(-90).max(90),
  coordsLng: z.number().min(-180).max(180),
  customImage: z.string().url('URL inválida').optional().or(z.literal('')),
})

type FormValues = z.infer<typeof formSchema>

export default function SpecialistForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { specialists, addSpecialist, updateSpecialist } = useAppStore()
  const isEditing = !!id
  const [isGeocoding, setIsGeocoding] = useState(false)

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
      coordsLat: 38.7223, // Lisboa default
      coordsLng: -9.1393,
      customImage: '',
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
          coordsLat: specialist.coords.lat,
          coordsLng: specialist.coords.lng,
          customImage: specialist.customImage || '',
        })
      } else {
        navigate('/admin/specialists')
      }
    }
  }, [id, isEditing, specialists, navigate, form])

  // Auto-geocode quando endereço ou cidade mudar
  const handleGeocode = async () => {
    const address = form.getValues('address')
    const city = form.getValues('city')

    if (!address && !city) {
      toast.error('Preencha o endereço ou a cidade primeiro')
      return
    }

    setIsGeocoding(true)

    try {
      // Primeiro tenta o endereço completo
      let result = await geocodeAddress(`${address}, ${city}`)

      // Se falhar, tenta apenas a cidade
      if (!result && city) {
        result = await geocodeAddress(city)
      }

      if (result) {
        form.setValue('coordsLat', result.lat)
        form.setValue('coordsLng', result.lng)
        toast.success(`Localização encontrada: ${result.display_name}`)
      } else {
        toast.error('Não foi possível encontrar a localização. Tente ser mais específico.')
      }
    } catch (error) {
      toast.error('Erro ao buscar localização')
    } finally {
      setIsGeocoding(false)
    }
  }

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
        lat: data.coordsLat,
        lng: data.coordsLng,
      },
      seed: isEditing
        ? specialists.find((s) => s.id === Number(id))?.seed || 1
        : Math.floor(Math.random() * 100),
      ...(data.customImage && { customImage: data.customImage }),
    }

    if (isEditing) {
      updateSpecialist(Number(id), specialistData)
      toast.success('Especialista atualizado com sucesso!')
    } else {
      addSpecialist(specialistData)
      toast.success('Especialista cadastrado com sucesso!')
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
              name="customImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Foto Personalizada (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/foto.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Se fornecida, esta foto será usada em vez do avatar genérico
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Localização GPS</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGeocode}
                  disabled={isGeocoding}
                >
                  {isGeocoding ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-2" />
                      Obter Coordenadas
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Clique em "Obter Coordenadas" para buscar automaticamente a localização GPS baseada no endereço fornecido.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="coordsLat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000001"
                          placeholder="38.7223"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Coordenada de latitude</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordsLng"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000001"
                          placeholder="-9.1393"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Coordenada de longitude</FormDescription>
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
