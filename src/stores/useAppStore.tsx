import React, { createContext, useContext, useState, useCallback } from 'react'
import { Specialist, BlogPost } from '@/types'
import { toast } from 'sonner'
import { slugify } from '@/lib/utils'

// Initial Mock Data - Coordenadas GPS reais das cidades em Portugal
const INITIAL_SPECIALISTS: Specialist[] = [
  {
    id: 1,
    name: 'Dr. Carlos Ferreira',
    role: 'Ortodontista Pediátrico',
    city: 'Lisboa',
    address: 'Av. da Liberdade, 100, Lisboa',
    phone: '+351 210 000 001',
    whatsapp: '351910000001',
    email: 'carlos.ferreira@respiracaooral.pt',
    coords: { lat: 38.7223, lng: -9.1393 }, // Lisboa
    image: 'male',
    seed: 12,
  },
  {
    id: 2,
    name: 'Dra. Sofia Costa',
    role: 'Odontopediatra',
    city: 'Porto',
    address: 'Rua de Santa Catarina, 200, Porto',
    phone: '+351 220 000 002',
    whatsapp: '351920000002',
    email: 'sofia.costa@respiracaooral.pt',
    coords: { lat: 41.1579, lng: -8.6291 }, // Porto
    image: 'female',
    seed: 15,
  },
  {
    id: 3,
    name: 'Dr. Miguel Santos',
    role: 'Ortodontista',
    city: 'Coimbra',
    address: 'Praça da República, 50, Coimbra',
    phone: '+351 239 000 003',
    whatsapp: '351930000003',
    email: 'miguel.santos@respiracaooral.pt',
    coords: { lat: 40.2033, lng: -8.4103 }, // Coimbra
    image: 'male',
    seed: 20,
  },
  {
    id: 4,
    name: 'Dra. Inês Silva',
    role: 'Dentista do Sono',
    city: 'Faro',
    address: 'Rua de Santo António, 30, Faro',
    phone: '+351 289 000 004',
    whatsapp: '351960000004',
    email: 'ines.silva@respiracaooral.pt',
    coords: { lat: 37.0194, lng: -7.9304 }, // Faro
    image: 'female',
    seed: 25,
  },
  {
    id: 5,
    name: 'Dr. Ricardo Oliveira',
    role: 'Ortodontista',
    city: 'Braga',
    address: 'Av. Central, 10, Braga',
    phone: '+351 253 000 005',
    whatsapp: '351910000005',
    email: 'ricardo.oliveira@respiracaooral.pt',
    coords: { lat: 41.5454, lng: -8.4265 }, // Braga
    image: 'male',
    seed: 30,
  },
  {
    id: 6,
    name: 'Dra. Cristiane Martins',
    role: 'Ortodontista | Invisalign Provider',
    city: 'Oliveira de Azeméis',
    address: 'Rua Artur Correia Barbosa, 111, Oliveira de Azeméis',
    phone: '+351 918 233 310',
    whatsapp: '351918233310',
    email: 'clinicadentariavitoria@hotmail.com',
    coords: { lat: 40.8396, lng: -8.4733 }, // Oliveira de Azeméis
    image: 'female',
    seed: 35,
    customImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces',
  },
]

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: '5 Sinais de que seu filho respira pela boca',
    excerpt:
      'Aprenda a identificar os sinais sutis que indicam problemas respiratórios durante o dia e a noite.',
    content:
      'Muitos pais acham que o ronco em crianças é "fofo" ou sinal de sono profundo, mas na verdade, pode ser um grito de socorro das vias aéreas. A respiração oral é um problema sério que precisa de atenção.\n\n1. Boca sempre entreaberta\nSe o seu filho assiste TV, brinca ou dorme com os lábios separados, é o sinal mais óbvio.\n\n2. Baba no travesseiro\nAcordar com a fronha molhada é um indicativo clássico.\n\n3. Olheiras profundas\nA má oxigenação e o sono de má qualidade resultam em olheiras vasculares.',
    category: 'Sintomas',
    image: 'child sleeping',
    date: '28 Nov 2024',
    author: 'Dra. Ana Martins',
    slug: '5-sinais-respiracao-oral',
    seoTitle: '5 Sinais de Respiração Oral Infantil - Guia Completo',
    seoDescription:
      'Descubra se o seu filho respira pela boca. Veja os 5 principais sinais de alerta e saiba quando procurar ajuda especializada.',
    seoKeywords: 'respiração oral, sintomas, crianças, sono infantil',
  },
  {
    id: 2,
    title: 'Como a respiração afeta o desempenho escolar',
    excerpt:
      'A falta de oxigenação adequada e o sono ruim podem ser os vilões das notas baixas.',
    content:
      'A respiração oral afeta a qualidade do sono, e uma criança cansada não aprende. O cérebro precisa de oxigênio e descanso para consolidar a memória e manter o foco.',
    category: 'Educação',
    image: 'child studying',
    date: '25 Nov 2024',
    author: 'Dr. Carlos Ferreira',
    slug: 'respiracao-desempenho-escolar',
    seoTitle: 'Respiração Oral e Desempenho Escolar: Qual a Relação?',
    seoDescription:
      'Entenda como a má respiração pode afetar a concentração e o aprendizado do seu filho na escola.',
  },
  {
    id: 3,
    title: 'Chupeta e Dedo: O impacto na respiração',
    excerpt:
      'Entenda como hábitos orais podem deformar a arcada dentária e forçar a respiração oral.',
    content:
      'O uso prolongado de chupeta ou o hábito de chupar o dedo altera o formato do palato (céu da boca), deixando-o ogival (fundo e estreito), o que diminui o espaço para a passagem de ar pelo nariz.',
    category: 'Prevenção',
    image: 'baby pacifier',
    date: '20 Nov 2024',
    author: 'Dra. Sofia Costa',
    slug: 'chupeta-dedo-impacto-respiracao',
  },
  {
    id: 4,
    title: 'Tratamentos modernos para respiração oral',
    excerpt:
      'Conheça as novas abordagens que evitam cirurgias em muitos casos.',
    content:
      'Hoje em dia, a abordagem multidisciplinar com ortopedia funcional, fonoaudiologia e otorrino permite tratar muitos casos sem intervenção cirúrgica invasiva.',
    category: 'Tratamento',
    image: 'doctor child',
    date: '15 Nov 2024',
    author: 'Dr. Miguel Santos',
    slug: 'tratamentos-respiracao-oral',
  },
]

interface AppContextType {
  specialists: Specialist[]
  blogPosts: BlogPost[]
  addSpecialist: (specialist: Omit<Specialist, 'id'>) => void
  updateSpecialist: (id: number, specialist: Partial<Specialist>) => void
  deleteSpecialist: (id: number) => void
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void
  updateBlogPost: (id: number, post: Partial<BlogPost>) => void
  deleteBlogPost: (id: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppStoreProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Load from localStorage or use initial data
  const [specialists, setSpecialists] = useState<Specialist[]>(() => {
    const stored = localStorage.getItem('specialists')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return INITIAL_SPECIALISTS
      }
    }
    return INITIAL_SPECIALISTS
  })

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem('blogPosts')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return INITIAL_POSTS
      }
    }
    return INITIAL_POSTS
  })

  // Persist to localStorage whenever data changes
  React.useEffect(() => {
    localStorage.setItem('specialists', JSON.stringify(specialists))
  }, [specialists])

  React.useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts))
  }, [blogPosts])

  const addSpecialist = useCallback((data: Omit<Specialist, 'id'>) => {
    const newSpecialist = { ...data, id: Date.now() }
    setSpecialists((prev) => [...prev, newSpecialist])
    toast.success('Profissional adicionado com sucesso!')
  }, [])

  const updateSpecialist = useCallback(
    (id: number, data: Partial<Specialist>) => {
      setSpecialists((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...data } : s)),
      )
      toast.success('Profissional atualizado com sucesso!')
    },
    [],
  )

  const deleteSpecialist = useCallback((id: number) => {
    setSpecialists((prev) => prev.filter((s) => s.id !== id))
    toast.success('Profissional removido com sucesso!')
  }, [])

  const addBlogPost = useCallback((data: Omit<BlogPost, 'id'>) => {
    const postData = { ...data }
    if (!postData.slug) {
      postData.slug = slugify(postData.title)
    }

    const newPost = { ...postData, id: Date.now() }
    setBlogPosts((prev) => [newPost, ...prev]) // Newest first
    toast.success('Artigo publicado com sucesso!')
  }, [])

  const updateBlogPost = useCallback((id: number, data: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
    )
    toast.success('Artigo atualizado com sucesso!')
  }, [])

  const deleteBlogPost = useCallback((id: number) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id))
    toast.success('Artigo removido com sucesso!')
  }, [])

  return (
    <AppContext.Provider
      value={{
        specialists,
        blogPosts,
        addSpecialist,
        updateSpecialist,
        deleteSpecialist,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppStore = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppStore must be used within AppStoreProvider')
  }
  return context
}

export default useAppStore
