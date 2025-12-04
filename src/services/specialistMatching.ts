import { Specialist, EvaluationData, EvaluationResult } from '@/types'

/**
 * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371 // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Verifica se o especialista trabalha com ortopedia funcional ou alinhadores
 */
function isFunctionalOrthopedicsSpecialist(specialist: Specialist): boolean {
  const role = specialist.role.toLowerCase()
  const keywords = [
    'ortodont',
    'ortopedia',
    'funcional',
    'alinhador',
    'invisalign',
    'odontopediatra',
  ]
  return keywords.some((keyword) => role.includes(keyword))
}

/**
 * Encontra o especialista mais adequado baseado em:
 * 1. Especialização (ortopedia funcional/alinhadores)
 * 2. Proximidade geográfica
 * 3. Score da avaliação
 */
export function findBestSpecialist(
  evaluation: EvaluationData,
  result: EvaluationResult,
  specialists: Specialist[],
): Specialist | null {
  if (!evaluation.location) {
    // Se não há localização, retorna o primeiro especialista adequado
    return (
      specialists.find(isFunctionalOrthopedicsSpecialist) || specialists[0]
    )
  }

  const userCoords = evaluation.location.coords
  const userCity = evaluation.location.city

  if (!userCoords && !userCity) {
    return specialists.find(isFunctionalOrthopedicsSpecialist) || specialists[0]
  }

  // Filtra especialistas que trabalham com ortopedia funcional
  const functionalSpecialists = specialists.filter(
    isFunctionalOrthopedicsSpecialist,
  )

  if (functionalSpecialists.length === 0) {
    // Se não há especialistas em ortopedia funcional, usa todos
    return findClosestSpecialist(specialists, userCoords, userCity)
  }

  // Se há score alto, prioriza especialistas em ortopedia funcional
  if (result.score >= 50) {
    return findClosestSpecialist(
      functionalSpecialists,
      userCoords,
      userCity,
    )
  }

  // Score baixo, pode ser qualquer especialista próximo
  return findClosestSpecialist(specialists, userCoords, userCity)
}

/**
 * Encontra o especialista mais próximo geograficamente
 */
function findClosestSpecialist(
  specialists: Specialist[],
  userCoords?: { lat: number; lng: number },
  userCity?: string,
): Specialist | null {
  if (specialists.length === 0) return null

  // Se não há coordenadas, tenta match por cidade
  if (!userCoords && userCity) {
    const cityMatch = specialists.find(
      (s) => s.city.toLowerCase() === userCity.toLowerCase(),
    )
    if (cityMatch) return cityMatch
  }

  // Se há coordenadas, calcula distância
  if (userCoords) {
    let closest: Specialist | null = null
    let minDistance = Infinity

    for (const specialist of specialists) {
      const distance = calculateDistance(
        userCoords.lat,
        userCoords.lng,
        specialist.coords.lat,
        specialist.coords.lng,
      )

      if (distance < minDistance) {
        minDistance = distance
        closest = specialist
      }
    }

    return closest
  }

  // Fallback: retorna o primeiro
  return specialists[0]
}

/**
 * Obtém a localização do usuário via geolocalização do navegador
 */
export async function getUserLocation(): Promise<{
  coords?: { lat: number; lng: number }
  city?: string
} | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        // Tenta fazer reverse geocoding para obter a cidade
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'RespiraOral/1.0',
              },
            },
          )
          const data = await response.json()
          const city = data.address?.city || data.address?.town || data.address?.municipality

          resolve({ coords, city })
        } catch {
          resolve({ coords })
        }
      },
      () => {
        // Erro na geolocalização
        resolve(null)
      },
      {
        timeout: 5000,
        enableHighAccuracy: false,
      },
    )
  })
}

