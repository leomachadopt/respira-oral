import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'

const Blog = () => {
  const { blogPosts } = useAppStore()

  return (
    <div className="flex flex-col gap-12 pb-16">
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog & Artigos</h1>
          <p className="text-muted-foreground text-lg">
            Informação confiável para pais e cuidadores.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={`https://img.usecurling.com/p/400/250?q=${post.image}&dpr=2`}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-tight hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0 text-primary">
                  <Link to={`/blog/${post.slug}`}>Ler artigo completo</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog
