import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import QuemSomos from './pages/QuemSomos'
import Problema from './pages/Problema'
import Tratamentos from './pages/Tratamentos'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contactos from './pages/Contactos'
import Avaliacao from './pages/Avaliacao'
import Agendamento from './pages/Agendamento'
import NotFound from './pages/NotFound'

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
        path: '/tratamentos',
        element: <Tratamentos />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/blog/:id',
        element: <BlogPost />,
      },
      {
        path: '/contactos',
        element: <Contactos />,
      },
      {
        path: '/avaliacao',
        element: <Avaliacao />,
      },
      {
        path: '/agendamento',
        element: <Agendamento />,
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}

export default App
