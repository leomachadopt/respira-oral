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
    { name: 'Blog', path: '/blog' },
    { name: 'Contactos', path: '/contactos' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-border/50 py-3'
          : 'bg-transparent py-5',
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg hover-glow animate-bounce-slow">
            R
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:scale-105">
            Respiração Oral
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative group',
                location.pathname === link.path
                  ? 'text-primary font-semibold'
                  : 'text-foreground/80',
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md hover-lift animate-pulse-slow"
          >
            <Link to="/avaliacao" className="group">
              <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Fale com a Dra. Ro
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
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 hover:scale-105',
                      location.pathname === link.path
                        ? 'text-primary font-semibold'
                        : 'text-foreground/80',
                    )}
                    style={{ animationDelay: `${idx * 100}ms` }}
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
                    Fale com a Dra. Ro
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
