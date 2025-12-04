import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppStoreProvider } from '@/stores/useAppStore'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Index from './pages/Index'
import QuemSomos from './pages/QuemSomos'
import Problema from './pages/Problema'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Avaliacao from './pages/Avaliacao'
import ResultadoAvaliacao from './pages/ResultadoAvaliacao'
import Agendamento from './pages/Agendamento'
import NotFound from './pages/NotFound'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import SpecialistList from './pages/admin/specialists/SpecialistList'
import SpecialistForm from './pages/admin/specialists/SpecialistForm'
import PostList from './pages/admin/blog/PostList'
import PostForm from './pages/admin/blog/PostForm'
import TestimonialList from './pages/admin/testimonials/TestimonialList'
import TestimonialForm from './pages/admin/testimonials/TestimonialForm'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/quem-somos',
        element: <QuemSomos />,
      },
      {
        path: '/problema',
        element: <Problema />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/blog/:slug',
        element: <BlogPost />,
      },
      {
        path: '/avaliacao',
        element: <Avaliacao />,
      },
      {
        path: '/resultado-avaliacao',
        element: <ResultadoAvaliacao />,
      },
      {
        path: '/agendamento',
        element: <Agendamento />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'specialists',
        element: <SpecialistList />,
      },
      {
        path: 'specialists/new',
        element: <SpecialistForm />,
      },
      {
        path: 'specialists/:id/edit',
        element: <SpecialistForm />,
      },
      {
        path: 'blog',
        element: <PostList />,
      },
      {
        path: 'blog/new',
        element: <PostForm />,
      },
      {
        path: 'blog/:id/edit',
        element: <PostForm />,
      },
      {
        path: 'testimonials',
        element: <TestimonialList />,
      },
      {
        path: 'testimonials/new',
        element: <TestimonialForm />,
      },
      {
        path: 'testimonials/:id/edit',
        element: <TestimonialForm />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const App = () => {
  return (
    <AppStoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </AppStoreProvider>
  )
}

export default App
