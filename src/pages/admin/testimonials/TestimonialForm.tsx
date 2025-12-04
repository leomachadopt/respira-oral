import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Star } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/ImageUpload'
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
import { Testimonial } from '@/types'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  role: z.string().min(2, 'Papel/relação é obrigatório'),
  text: z.string().min(10, 'O depoimento deve ter pelo menos 10 caracteres'),
  rating: z.number().min(1).max(5),
  avatarGender: z.enum(['male', 'female']),
  customAvatar: z.string().url('URL inválida').optional().or(z.literal('')),
  featured: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export default function TestimonialForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { testimonials, addTestimonial, updateTestimonial } = useAppStore()
  const isEditing = !!id

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      role: '',
      text: '',
      rating: 5,
      avatarGender: 'female',
      customAvatar: '',
      featured: false,
    },
  })

  useEffect(() => {
    if (isEditing) {
      const testimonial = testimonials.find((t) => t.id === Number(id))
      if (testimonial) {
        form.reset({
          name: testimonial.name,
          role: testimonial.role,
          text: testimonial.text,
          rating: testimonial.rating,
          avatarGender: testimonial.avatarGender,
          customAvatar: testimonial.customAvatar || '',
          featured: testimonial.featured,
        })
      } else {
        navigate('/admin/testimonials')
      }
    }
  }, [id, isEditing, testimonials, navigate, form])

  const onSubmit = (data: FormValues) => {
    const testimonialData: Omit<Testimonial, 'id'> = {
      name: data.name,
      role: data.role,
      text: data.text,
      rating: data.rating,
      avatarGender: data.avatarGender,
      avatarSeed: isEditing
        ? testimonials.find((t) => t.id === Number(id))?.avatarSeed || 1
        : Math.floor(Math.random() * 100),
      ...(data.customAvatar && { customAvatar: data.customAvatar }),
      featured: data.featured,
    }

    if (isEditing) {
      updateTestimonial(Number(id), testimonialData)
    } else {
      addTestimonial(testimonialData)
    }
    navigate('/admin/testimonials')
  }

  const rating = form.watch('rating')

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/testimonials">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? 'Editar Depoimento' : 'Novo Depoimento'}
          </h1>
          <p className="text-muted-foreground">
            Preencha os dados do depoimento abaixo.
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
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Maria Silva" {...field} />
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
                    <FormLabel>Papel/Relação</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Mãe do Pedro, 5 anos"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depoimento</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escreva o depoimento aqui..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avaliação</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <SelectItem key={stars} value={String(stars)}>
                            <div className="flex items-center gap-2">
                              {Array.from({ length: stars }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatarGender"
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
              name="customAvatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto (opcional)</FormLabel>
                  <FormControl>
                    <ImageUpload value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Faça upload da foto da pessoa. Se não fornecida, será usado
                    um avatar genérico.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Destacar na página inicial</FormLabel>
                    <FormDescription>
                      Este depoimento aparecerá em destaque na home do site.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Salvar Alterações' : 'Adicionar Depoimento'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
