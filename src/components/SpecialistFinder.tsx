import { useState, useMemo } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Search,
  Navigation,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Mock Data for Specialists in Portugal
const SPECIALISTS = [
  {
    id: 1,
    name: 'Dr. Carlos Ferreira',
    role: 'Ortodontista Pediátrico',
    city: 'Lisboa',
    address: 'Av. da Liberdade, 100, Lisboa',
    phone: '+351 210 000 001',
    whatsapp: '351910000001',
    email: 'carlos.ferreira@respiracaooral.pt',
    coords: { top: '68%', left: '35%' },
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
    coords: { top: '22%', left: '42%' },
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
    coords: { top: '42%', left: '45%' },
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
    coords: { top: '88%', left: '55%' },
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
    coords: { top: '15%', left: '45%' },
    image: 'male',
    seed: 30,
  },
]

export function SpecialistFinder() {
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredSpecialists = useMemo(() => {
    if (selectedCity === 'all') return SPECIALISTS
    return SPECIALISTS.filter((s) => s.city === selectedCity)
  }, [selectedCity])

  const cities = Array.from(new Set(SPECIALISTS.map((s) => s.city)))

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
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?gender=${specialist.image}&seed=${specialist.seed}`}
                  />
                  <AvatarFallback>{specialist.name[0]}</AvatarFallback>
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

      {/* Right Column: Map */}
      <div className="relative bg-blue-50 rounded-3xl overflow-hidden border border-blue-100 shadow-inner min-h-[600px] flex items-center justify-center">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://img.usecurling.com/p/600/1000?q=portugal%20map%20silhouette&color=blue')] bg-center bg-no-repeat bg-contain pointer-events-none" />

        {/* Pins */}
        <div className="relative w-full h-full max-w-[400px] max-h-[800px] mx-auto">
          {SPECIALISTS.map((specialist) => {
            const isSelected =
              selectedCity === 'all' || selectedCity === specialist.city
            if (!isSelected) return null

            return (
              <Popover key={specialist.id}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      'absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group',
                      hoveredId === specialist.id
                        ? 'scale-125 z-20'
                        : 'scale-100 z-10',
                    )}
                    style={{
                      top: specialist.coords.top,
                      left: specialist.coords.left,
                    }}
                    onMouseEnter={() => setHoveredId(specialist.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative">
                      <MapPin
                        className={cn(
                          'w-8 h-8 drop-shadow-md fill-current',
                          hoveredId === specialist.id
                            ? 'text-primary'
                            : 'text-red-500',
                        )}
                      />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-black/20 blur-[2px] rounded-full" />
                    </div>
                    <span
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
                        hoveredId === specialist.id && 'opacity-100',
                      )}
                    >
                      {specialist.city}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 overflow-hidden shadow-xl border-primary/20">
                  <div className="bg-primary p-3 text-white flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-white/50">
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${specialist.image}&seed=${specialist.seed}`}
                      />
                      <AvatarFallback>{specialist.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-sm">{specialist.name}</h4>
                      <p className="text-xs opacity-90">{specialist.role}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3 bg-white">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <span>{specialist.address}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <a href={`tel:${specialist.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Ligar
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
                        asChild
                      >
                        <a
                          href={`https://wa.me/${specialist.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Zap
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <a href={`mailto:${specialist.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          })}
        </div>

        {/* Map Legend/Info */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm text-xs text-muted-foreground max-w-[200px]">
          <p className="flex items-center gap-2">
            <Navigation className="w-3 h-3" />
            Clique nos pinos para ver detalhes do especialista.
          </p>
        </div>
      </div>
    </div>
  )
}
