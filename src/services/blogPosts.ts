import type { BlogPost } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }))
    throw new Error(error.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    return await apiRequest<BlogPost[]>('/blog-posts')
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error)
    throw error
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    return await apiRequest<BlogPost>(`/blog-posts?id=${id}`)
  } catch (error) {
    console.error('Erro ao buscar post do blog:', error)
    return null
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await apiRequest<BlogPost>(`/blog-posts?slug=${slug}`)
  } catch (error) {
    console.error('Erro ao buscar post do blog:', error)
    return null
  }
}

export async function createBlogPost(
  data: Omit<BlogPost, 'id'>,
): Promise<BlogPost> {
  try {
    return await apiRequest<BlogPost>('/blog-posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Erro ao criar post do blog:', error)
    throw error
  }
}

export async function updateBlogPost(
  id: number,
  data: Partial<Omit<BlogPost, 'id'>>,
): Promise<BlogPost> {
  try {
    return await apiRequest<BlogPost>(`/blog-posts?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Erro ao atualizar post do blog:', error)
    throw error
  }
}

export async function deleteBlogPost(id: number): Promise<void> {
  try {
    await apiRequest<{ success: boolean }>(`/blog-posts?id=${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Erro ao deletar post do blog:', error)
    throw error
  }
}
