import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'
import { BlogPost } from '@/types'

const formSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  category: z.string().min(2, 'Categoria é obrigatória'),
  author: z.string().min(2, 'Autor é obrigatório'),
  image: z.string().min(2, 'Query de imagem é obrigatória (ex: child smiling)'),
  excerpt: z.string().min(10, 'Resumo deve ter pelo menos 10 caracteres'),
  content: z.string().min(20, 'Conteúdo deve ter pelo menos 20 caracteres'),
})

type FormValues = z.infer<typeof formSchema>

export default function PostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blogPosts, addBlogPost, updateBlogPost } = useAppStore()
  const isEditing = !!id

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      author: '',
      image: '',
      excerpt: '',
      content: '',
    },
  })

  useEffect(() => {
    if (isEditing) {
      const post = blogPosts.find((p) => p.id === Number(id))
      if (post) {
        form.reset({
          title: post.title,
          category: post.category,
          author: post.author,
          image: post.image,
          excerpt: post.excerpt,
          content: post.content,
        })
      } else {
        navigate('/admin/blog')
      }
    }
  }, [id, isEditing, blogPosts, navigate, form])

  const onSubmit = (data: FormValues) => {
    const postData: Omit<BlogPost, 'id'> = {
      ...data,
      date: isEditing
        ? blogPosts.find((p) => p.id === Number(id))?.date ||
          format(new Date(), 'dd MMM yyyy')
        : format(new Date(), 'dd MMM yyyy'),
    }

    if (isEditing) {
      updateBlogPost(Number(id), postData)
    } else {
      addBlogPost(postData)
    }
    navigate('/admin/blog')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/blog">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
          </h1>
          <p className="text-muted-foreground">
            Escreva e publique conteúdo para o blog.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Artigo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: A importância do sono..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
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
                        <SelectItem value="Sintomas">Sintomas</SelectItem>
                        <SelectItem value="Educação">Educação</SelectItem>
                        <SelectItem value="Prevenção">Prevenção</SelectItem>
                        <SelectItem value="Tratamento">Tratamento</SelectItem>
                        <SelectItem value="Novidades">Novidades</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Dra. Ana" {...field} />
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
                    <FormLabel>Imagem (Query)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: sleeping child" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo (Excerpt)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Um breve resumo para aparecer no card..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo Completo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="O conteúdo completo do artigo..."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Salvar Alterações' : 'Publicar Artigo'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
