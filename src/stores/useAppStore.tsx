import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { Specialist, BlogPost, Testimonial } from '@/types'
import { toast } from 'sonner'
import * as specialistsService from '@/services/specialists'
import * as blogPostsService from '@/services/blogPosts'
import * as testimonialsService from '@/services/testimonials'
import * as evaluationsService from '@/services/evaluations'
import type { EvaluationRecord } from '@/services/evaluations'

interface AppContextType {
  specialists: Specialist[]
  blogPosts: BlogPost[]
  testimonials: Testimonial[]
  evaluations: EvaluationRecord[]
  isLoading: boolean
  addSpecialist: (specialist: Omit<Specialist, 'id'>) => Promise<void>
  updateSpecialist: (id: number, specialist: Partial<Specialist>) => Promise<void>
  deleteSpecialist: (id: number) => Promise<void>
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>
  updateBlogPost: (id: number, post: Partial<BlogPost>) => Promise<void>
  deleteBlogPost: (id: number) => Promise<void>
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>
  updateTestimonial: (id: number, testimonial: Partial<Testimonial>) => Promise<void>
  deleteTestimonial: (id: number) => Promise<void>
  deleteEvaluation: (id: number) => Promise<void>
  refreshData: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppStoreProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados do banco de dados ao inicializar
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true)
      const [specialistsData, postsData, testimonialsData, evaluationsData] = await Promise.all([
        specialistsService.getAllSpecialists(),
        blogPostsService.getAllBlogPosts(),
        testimonialsService.getAllTestimonials(),
        evaluationsService.getAllEvaluations(),
      ])
      console.log('REFRESH - Especialistas carregados:', specialistsData.length)
      console.log('REFRESH - Regiões:', specialistsData.map(s => ({ nome: s.name, região: s.region })))
      setSpecialists(specialistsData)
      setBlogPosts(postsData)
      setTestimonials(testimonialsData)
      setEvaluations(evaluationsData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error('Erro ao carregar dados do banco de dados')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  const addSpecialist = useCallback(
    async (data: Omit<Specialist, 'id'>) => {
      try {
        const newSpecialist = await specialistsService.createSpecialist(data)
        setSpecialists((prev) => [...prev, newSpecialist])
        toast.success('Profissional adicionado com sucesso!')
      } catch (error) {
        console.error('Erro ao adicionar especialista:', error)
        toast.error('Erro ao adicionar profissional')
        throw error
      }
    },
    [],
  )

  const updateSpecialist = useCallback(
    async (id: number, data: Partial<Specialist>) => {
      try {
        console.log('STORE - Atualizando especialista ID:', id)
        console.log('STORE - Dados recebidos:', data)
        console.log('STORE - Região recebida:', data.region)

        const updatedSpecialist = await specialistsService.updateSpecialist(
          id,
          data,
        )

        console.log('STORE - Especialista atualizado:', updatedSpecialist)
        console.log('STORE - Região retornada:', updatedSpecialist.region)

        setSpecialists((prev) =>
          prev.map((s) => (s.id === id ? updatedSpecialist : s)),
        )
        toast.success('Profissional atualizado com sucesso!')
      } catch (error) {
        console.error('Erro ao atualizar especialista:', error)
        toast.error('Erro ao atualizar profissional')
        throw error
      }
    },
    [],
  )

  const deleteSpecialist = useCallback(async (id: number) => {
    try {
      await specialistsService.deleteSpecialist(id)
      setSpecialists((prev) => prev.filter((s) => s.id !== id))
      toast.success('Profissional removido com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar especialista:', error)
      toast.error('Erro ao remover profissional')
      throw error
    }
  }, [])

  const addBlogPost = useCallback(async (data: Omit<BlogPost, 'id'>) => {
    try {
      const newPost = await blogPostsService.createBlogPost(data)
      setBlogPosts((prev) => [newPost, ...prev])
      toast.success('Artigo publicado com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar post:', error)
      toast.error('Erro ao publicar artigo')
      throw error
    }
  }, [])

  const updateBlogPost = useCallback(
    async (id: number, data: Partial<BlogPost>) => {
      try {
        const updatedPost = await blogPostsService.updateBlogPost(id, data)
        setBlogPosts((prev) => prev.map((p) => (p.id === id ? updatedPost : p)))
        toast.success('Artigo atualizado com sucesso!')
      } catch (error) {
        console.error('Erro ao atualizar post:', error)
        toast.error('Erro ao atualizar artigo')
        throw error
      }
    },
    [],
  )

  const deleteBlogPost = useCallback(async (id: number) => {
    try {
      await blogPostsService.deleteBlogPost(id)
      setBlogPosts((prev) => prev.filter((p) => p.id !== id))
      toast.success('Artigo removido com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar post:', error)
      toast.error('Erro ao remover artigo')
      throw error
    }
  }, [])

  const addTestimonial = useCallback(async (data: Omit<Testimonial, 'id'>) => {
    try {
      const newTestimonial = await testimonialsService.createTestimonial(data)
      setTestimonials((prev) => [newTestimonial, ...prev])
      toast.success('Depoimento adicionado com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar depoimento:', error)
      toast.error('Erro ao adicionar depoimento')
      throw error
    }
  }, [])

  const updateTestimonial = useCallback(
    async (id: number, data: Partial<Testimonial>) => {
      try {
        const updatedTestimonial = await testimonialsService.updateTestimonial(
          id,
          data,
        )
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? updatedTestimonial : t)),
        )
        toast.success('Depoimento atualizado com sucesso!')
      } catch (error) {
        console.error('Erro ao atualizar depoimento:', error)
        toast.error('Erro ao atualizar depoimento')
        throw error
      }
    },
    [],
  )

  const deleteTestimonial = useCallback(async (id: number) => {
    try {
      await testimonialsService.deleteTestimonial(id)
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
      toast.success('Depoimento removido com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar depoimento:', error)
      toast.error('Erro ao remover depoimento')
      throw error
    }
  }, [])

  const deleteEvaluation = useCallback(async (id: number) => {
    try {
      await evaluationsService.deleteEvaluation(id)
      setEvaluations((prev) => prev.filter((e) => e.id !== id))
      toast.success('Avaliação removida com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error)
      toast.error('Erro ao remover avaliação')
      throw error
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        specialists,
        blogPosts,
        testimonials,
        evaluations,
        isLoading,
        addSpecialist,
        updateSpecialist,
        deleteSpecialist,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        deleteEvaluation,
        refreshData,
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
