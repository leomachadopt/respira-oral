import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/problema" element={<Problema />} />
          <Route path="/tratamentos" element={<Tratamentos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/avaliacao" element={<Avaliacao />} />
          <Route path="/agendamento" element={<Agendamento />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
