import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto animate-fade-in-up">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 hover-glow">
                R
              </div>
              <span className="font-bold text-lg text-primary transition-all duration-300 group-hover:scale-105">
                Respiração Oral
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dedicados a ajudar crianças a respirar melhor para um
              desenvolvimento saudável e feliz. Especialistas em diagnóstico e
              tratamento multidisciplinar.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }, idx) => (
                <a
                  key={label}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:rotate-6"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/quem-somos', label: 'Quem Somos' },
                { path: '/problema', label: 'O Problema' },
                { path: '/blog', label: 'Blog' },
              ].map((link, idx) => (
                <li 
                  key={link.path}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / More Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/avaliacao"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Avaliação com Dra. Ro
                </Link>
              </li>
              <li>
                <Link
                  to="/contactos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contactos
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground cursor-not-allowed">
                  Política de Privacidade
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground cursor-not-allowed">
                  Termos de Uso
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contactos</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Av. da Liberdade, 100
                  <br />
                  Lisboa, Portugal
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+351210000000"
                  className="hover:text-primary transition-colors"
                >
                  +351 210 000 000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:contato@respiracaooral.pt"
                  className="hover:text-primary transition-colors"
                >
                  contato@respiracaooral.pt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Respiração Oral Infantil. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
