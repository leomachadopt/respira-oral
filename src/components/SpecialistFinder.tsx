import { useState, useMemo } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { InteractiveMap } from './InteractiveMap'

export function SpecialistFinder() {
  const { specialists } = useAppStore()
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredSpecialists = useMemo(() => {
    if (selectedCity === 'all') return specialists
    return specialists.filter((s) => s.city === selectedCity)
  }, [selectedCity, specialists])

  const cities = Array.from(new Set(specialists.map((s) => s.city)))

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Left Column: Filters & List */}
      <div className="space-y-6">
        {/* Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-border space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Filtrar por Localização
          </h3>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as cidades</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {filteredSpecialists.map((specialist) => (
            <Card
              key={specialist.id}
              className={cn(
                'transition-all duration-300 hover:shadow-md cursor-pointer border-l-4',
                hoveredId === specialist.id
                  ? 'border-l-primary shadow-md scale-[1.02]'
                  : 'border-l-transparent',
              )}
              onMouseEnter={() => setHoveredId(specialist.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardContent className="p-4 flex gap-4 items-start">
                <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                  {specialist.customImage ? (
                    <AvatarImage
                      src={specialist.customImage}
                      alt={specialist.name}
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to generic avatar on error
                        const target = e.target as HTMLImageElement
                        target.src = `https://img.usecurling.com/ppl/thumbnail?gender=${specialist.image}&seed=${specialist.seed}`
                      }}
                    />
                  ) : (
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=${specialist.image}&seed=${specialist.seed}`}
                      alt={specialist.name}
                    />
                  )}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                    {specialist.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-foreground">
                      {specialist.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {specialist.city}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    {specialist.role}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {specialist.address}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 rounded-full"
                      asChild
                    >
                      <a href={`tel:${specialist.phone}`} title="Ligar">
                        <Phone className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <a
                        href={`https://wa.me/${specialist.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 rounded-full"
                      asChild
                    >
                      <a href={`mailto:${specialist.email}`} title="Email">
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredSpecialists.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum especialista encontrado nesta cidade.
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Interactive Map */}
      <div className="sticky top-24">
        <InteractiveMap
          specialists={specialists}
          selectedCity={selectedCity}
          onSpecialistHover={setHoveredId}
          hoveredId={hoveredId}
        />
      </div>
    </div>
  )
}
