import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

const BlogPost = () => {
  const { slug } = useParams()
  const { blogPosts } = useAppStore()
  const post = blogPosts.find((p) => p.slug === slug)

  // SEO Meta Tags Management
  useEffect(() => {
    if (post) {
      // Update Title
      const previousTitle = document.title
      document.title = post.seoTitle || post.title

      // Update Meta Description
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      const previousDescription = metaDescription.getAttribute('content')
      metaDescription.setAttribute(
        'content',
        post.seoDescription || post.excerpt,
      )

      return () => {
        // Cleanup / Reset
        document.title = previousTitle
        if (previousDescription) {
          metaDescription?.setAttribute('content', previousDescription)
        } else {
          metaDescription?.remove()
        }
      }
    }
  }, [post])

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
        <Button asChild>
          <Link to="/blog">Voltar para o Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
      <Button
        asChild
        variant="ghost"
        className="mb-8 pl-0 hover:pl-2 transition-all"
      >
        <Link to="/blog">
          <ArrowLeft className="mr-2 w-4 h-4" /> Voltar para o Blog
        </Link>
      </Button>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>Por {post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <img
          src={`https://img.usecurling.com/p/800/400?q=${post.image}&dpr=2`}
          alt={post.title}
          className="w-full rounded-2xl shadow-lg mb-8 object-cover"
        />

        <div className="whitespace-pre-wrap">{post.content}</div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 my-8 not-prose">
          <h4 className="text-xl font-bold text-primary mb-2">
            Identificou estes sinais?
          </h4>
          <p className="text-muted-foreground mb-4">
            Não espere que o problema se agrave. Faça uma avaliação preliminar
            agora mesmo.
          </p>
          <Button asChild className="rounded-full">
            <Link to="/avaliacao">Falar com a Dra. Ro</Link>
          </Button>
        </div>
      </article>
    </div>
  )
}

export default BlogPost
