export interface Specialist {
  id: number
  name: string
  role: string
  city: string
  address: string
  phone: string
  whatsapp: string
  email: string
  coords: { lat: number; lng: number }
  image: 'male' | 'female'
  seed: number
  customImage?: string // URL da foto personalizada
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  author: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export interface EvaluationData {
  // Dados demográficos
  age?: string
  location?: {
    city?: string
    coords?: { lat: number; lng: number }
  }
  
  // Indicadores clínicos
  breathingSigns?: string[]
  dentalIssues?: string[]
  oralHabits?: string[]
  posture?: string
  speechIssues?: string
  sleepQuality?: string
  previousTreatment?: string
  
  // Dados de contato
  name?: string
  email?: string
  phone?: string
}

export interface EvaluationResult {
  score: number // 0-100
  treatmentRecommendation: string
  recommendedSpecialist: Specialist | null
  confidence: 'alta' | 'média' | 'baixa'
  reasoning: string
}

export interface Testimonial {
  id: number
  name: string
  text: string
  role: string // Ex: "Mãe do Pedro, 5 anos"
  rating: number // 1-5
  avatarGender: 'male' | 'female'
  avatarSeed: number
  customAvatar?: string
  featured: boolean // Destaque na home
}
