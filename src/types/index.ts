export interface Specialist {
  id: number
  name: string
  role: string
  city: string
  address: string
  phone: string
  whatsapp: string
  email: string
  coords: { top: string; left: string }
  image: 'male' | 'female'
  seed: number
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
