import { Link, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingCTA() {
  const location = useLocation()

  // Don't show on the evaluation page itself
  if (location.pathname === '/avaliacao') return null

  return (
    <Link
      to="/avaliacao"
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-slow',
        'py-3 px-6 min-w-[60px] h-[60px] md:h-auto',
      )}
      aria-label="Pergunte à IA"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-semibold hidden md:inline">Pergunte à IA</span>
    </Link>
  )
}
