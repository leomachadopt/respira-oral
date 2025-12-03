import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Phone, Mail, MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Specialist } from '@/types'
import { cn } from '@/lib/utils'

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface InteractiveMapProps {
  specialists: Specialist[]
  selectedCity?: string
  onSpecialistHover?: (id: number | null) => void
  hoveredId?: number | null
}

export function InteractiveMap({
  specialists,
  selectedCity = 'all',
  onSpecialistHover,
  hoveredId
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<number, L.Marker>>(new Map())
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null)

  // Filter specialists
  const filteredSpecialists = selectedCity === 'all'
    ? specialists
    : specialists.filter(s => s.city === selectedCity)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map centered on Portugal
    const map = L.map(mapRef.current).setView([39.5, -8.0], 7)

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Update markers when specialists change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current.clear()

    // Create custom icon
    const createCustomIcon = (isHovered: boolean) => L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="${isHovered ? '#3B82F6' : '#EF4444'}"
            stroke="white"
            stroke-width="1"
            class="w-10 h-10 drop-shadow-lg transition-all duration-200 ${isHovered ? 'scale-125' : ''}"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    })

    // Add markers for filtered specialists
    filteredSpecialists.forEach(specialist => {
      const isHovered = hoveredId === specialist.id
      const marker = L.marker(
        [specialist.coords.lat, specialist.coords.lng],
        { icon: createCustomIcon(isHovered) }
      )

      marker.on('click', () => {
        setSelectedSpecialist(specialist)
      })

      marker.on('mouseover', () => {
        onSpecialistHover?.(specialist.id)
      })

      marker.on('mouseout', () => {
        onSpecialistHover?.(null)
      })

      marker.addTo(map)
      markersRef.current.set(specialist.id, marker)
    })

    // Fit bounds to show all markers only when filtered specialists change
    if (filteredSpecialists.length > 0) {
      const bounds = L.latLngBounds(
        filteredSpecialists.map(s => [s.coords.lat, s.coords.lng])
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [filteredSpecialists, onSpecialistHover])

  // Update marker icons when hovered state changes (without resetting zoom)
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    markersRef.current.forEach((marker, id) => {
      const isHovered = hoveredId === id
      const createCustomIcon = (isHovered: boolean) => L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="${isHovered ? '#3B82F6' : '#EF4444'}"
              stroke="white"
              stroke-width="1"
              class="w-10 h-10 drop-shadow-lg transition-all duration-200 ${isHovered ? 'scale-125' : ''}"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      })
      marker.setIcon(createCustomIcon(isHovered))
    })
  }, [hoveredId])

  return (
    <div className="relative w-full h-full min-h-[600px] rounded-3xl overflow-hidden border-2 border-border shadow-xl">
      <div ref={mapRef} className="w-full h-full min-h-[600px]" />

      {/* Specialist Details Card */}
      {selectedSpecialist && (
        <div className="absolute top-4 right-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-border animate-scale-in z-[1000]">
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-white">
                {selectedSpecialist.customImage ? (
                  <AvatarImage
                    src={selectedSpecialist.customImage}
                    alt={selectedSpecialist.name}
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://img.usecurling.com/ppl/thumbnail?gender=${selectedSpecialist.image}&seed=${selectedSpecialist.seed}`
                    }}
                  />
                ) : (
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?gender=${selectedSpecialist.image}&seed=${selectedSpecialist.seed}`}
                    alt={selectedSpecialist.name}
                  />
                )}
                <AvatarFallback className="bg-white text-primary font-bold">
                  {selectedSpecialist.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold">{selectedSpecialist.name}</h4>
                <p className="text-sm opacity-90">{selectedSpecialist.role}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSpecialist(null)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{selectedSpecialist.city}</p>
                <p>{selectedSpecialist.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                asChild
              >
                <a href={`tel:${selectedSpecialist.phone}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
                asChild
              >
                <a
                  href={`https://wa.me/${selectedSpecialist.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                asChild
              >
                <a href={`mailto:${selectedSpecialist.email}`}>
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Map Attribution */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-xs text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          Clique nos marcadores para ver detalhes
        </p>
      </div>
    </div>
  )
}
