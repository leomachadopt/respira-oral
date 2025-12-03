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
