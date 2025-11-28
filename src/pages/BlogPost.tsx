import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const BlogPost = () => {
  const { id } = useParams()

  // Mock content - in a real app, fetch based on ID
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
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
          5 Sinais de que seu filho respira pela boca
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>Por Dra. Ana Martins</span>
          <span>•</span>
          <span>28 Nov 2024</span>
        </div>

        <img
          src="https://img.usecurling.com/p/800/400?q=child%20sleeping%20mouth%20open&dpr=2"
          alt="Criança dormindo"
          className="w-full rounded-2xl shadow-lg mb-8"
        />

        <p>
          Muitos pais acham que o ronco em crianças é "fofo" ou sinal de sono
          profundo, mas na verdade, pode ser um grito de socorro das vias
          aéreas. A respiração oral é um problema sério que precisa de atenção.
        </p>

        <h3>1. Boca sempre entreaberta</h3>
        <p>
          Se o seu filho assiste TV, brinca ou dorme com os lábios separados, é
          o sinal mais óbvio. A postura correta de repouso é com os lábios
          selados.
        </p>

        <h3>2. Baba no travesseiro</h3>
        <p>
          Acordar com a fronha molhada é um indicativo clássico de que a boca
          ficou aberta durante a noite, permitindo a saída da saliva.
        </p>

        <h3>3. Olheiras profundas</h3>
        <p>
          A má oxigenação e o sono de má qualidade resultam em olheiras
          vasculares, dando à criança um aspecto cansado constante.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 my-8 not-prose">
          <h4 className="text-xl font-bold text-primary mb-2">
            Identificou estes sinais?
          </h4>
          <p className="text-muted-foreground mb-4">
            Não espere que o problema se agrave. Faça uma avaliação preliminar
            agora mesmo.
          </p>
          <Button asChild className="rounded-full">
            <Link to="/avaliacao">Falar com a IA</Link>
          </Button>
        </div>

        <h3>4. Agitação e falta de foco</h3>
        <p>
          Crianças que não dormem bem não descansam. O resultado muitas vezes é
          confundido com TDAH, mas é apenas privação de sono.
        </p>

        <h3>5. Lábios ressecados</h3>
        <p>
          A passagem constante de ar pela boca resseca a mucosa e os lábios,
          levando a rachaduras frequentes e necessidade de umedecer os lábios
          constantemente.
        </p>
      </article>
    </div>
  )
}

export default BlogPost
