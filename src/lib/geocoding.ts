// Geocoding service usando Nominatim (OpenStreetMap)
// API gratuita e sem necessidade de chave

export interface GeocodingResult {
  lat: number
  lng: number
  display_name: string
}

/**
 * Converte um endereço em coordenadas GPS usando Nominatim
 * @param address - Endereço completo (ex: "Av. da Liberdade, 100, Lisboa, Portugal")
 * @returns Coordenadas {lat, lng} ou null se não encontrado
 */
export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    // Adiciona "Portugal" ao endereço se não estiver presente
    const searchAddress = address.toLowerCase().includes('portugal')
      ? address
      : `${address}, Portugal`

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchAddress)}&format=json&limit=1`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RespiraOral/1.0',
      },
    })

    if (!response.ok) {
      throw new Error('Geocoding request failed')
    }

    const data = await response.json()

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      }
    }

    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

/**
 * Converte coordenadas GPS em endereço (reverse geocoding)
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Endereço ou null se não encontrado
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RespiraOral/1.0',
      },
    })

    if (!response.ok) {
      throw new Error('Reverse geocoding request failed')
    }

    const data = await response.json()

    if (data && data.display_name) {
      return data.display_name
    }

    return null
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return null
  }
}

/**
 * Coordenadas padrão das principais cidades de Portugal
 */
export const PORTUGAL_CITIES = {
  Lisboa: { lat: 38.7223, lng: -9.1393 },
  Porto: { lat: 41.1579, lng: -8.6291 },
  Coimbra: { lat: 40.2033, lng: -8.4103 },
  Braga: { lat: 41.5454, lng: -8.4265 },
  Faro: { lat: 37.0194, lng: -7.9304 },
  Évora: { lat: 38.5714, lng: -7.9087 },
  Aveiro: { lat: 40.6443, lng: -8.6455 },
  Viseu: { lat: 40.6566, lng: -7.9122 },
  Setúbal: { lat: 38.5244, lng: -8.8926 },
  'Vila Nova de Gaia': { lat: 41.1239, lng: -8.6118 },
  Funchal: { lat: 32.6669, lng: -16.9241 },
  'Ponta Delgada': { lat: 37.7412, lng: -25.6756 },
} as const

export type PortugalCity = keyof typeof PORTUGAL_CITIES
