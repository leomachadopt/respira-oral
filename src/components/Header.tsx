import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Problema', path: '/problema' },
    { name: 'Tratamentos', path: '/tratamentos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contactos', path: '/contactos' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4',
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-105">
            R
          </div>
          <span className="font-bold text-xl text-primary hidden sm:block">
            Respiração Oral
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.path
                  ? 'text-primary font-semibold'
                  : 'text-foreground/80',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
          >
            <Link to="/avaliacao">
              <MessageCircle className="w-4 h-4 mr-2" />
              Pergunte à IA
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] sm:w-[350px] flex flex-col"
            >
              <SheetTitle className="text-left text-lg font-bold text-primary">
                Menu
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navegação principal
              </SheetDescription>
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      location.pathname === link.path
                        ? 'text-primary font-semibold'
                        : 'text-foreground/80',
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 w-full rounded-full bg-primary hover:bg-primary/90"
                >
                  <Link to="/avaliacao" onClick={() => setIsOpen(false)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Pergunte à IA
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
