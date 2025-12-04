import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import type { BlogPost } from '@/types'
import { eq } from 'drizzle-orm'
import { slugify } from '@/lib/utils'

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await db.select().from(blogPosts)

    return result.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      date: post.date,
      author: post.author,
      slug: post.slug,
      seoTitle: post.seoTitle || undefined,
      seoDescription: post.seoDescription || undefined,
      seoKeywords: post.seoKeywords || undefined,
    }))
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error)
    throw error
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1)

    if (result.length === 0) return null

    const post = result[0]
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      date: post.date,
      author: post.author,
      slug: post.slug,
      seoTitle: post.seoTitle || undefined,
      seoDescription: post.seoDescription || undefined,
      seoKeywords: post.seoKeywords || undefined,
    }
  } catch (error) {
    console.error('Erro ao buscar post do blog:', error)
    throw error
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1)

    if (result.length === 0) return null

    const post = result[0]
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      date: post.date,
      author: post.author,
      slug: post.slug,
      seoTitle: post.seoTitle || undefined,
      seoDescription: post.seoDescription || undefined,
      seoKeywords: post.seoKeywords || undefined,
    }
  } catch (error) {
    console.error('Erro ao buscar post do blog:', error)
    throw error
  }
}

export async function createBlogPost(
  data: Omit<BlogPost, 'id'>,
): Promise<BlogPost> {
  try {
    // Gerar slug se não fornecido
    const postSlug = data.slug || slugify(data.title)

    const result = await db
      .insert(blogPosts)
      .values({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        image: data.image,
        date: data.date,
        author: data.author,
        slug: postSlug,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
      })
      .returning()

    const post = result[0]
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      date: post.date,
      author: post.author,
      slug: post.slug,
      seoTitle: post.seoTitle || undefined,
      seoDescription: post.seoDescription || undefined,
      seoKeywords: post.seoKeywords || undefined,
    }
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
    const updateData: any = {}

    if (data.title) updateData.title = data.title
    if (data.excerpt) updateData.excerpt = data.excerpt
    if (data.content) updateData.content = data.content
    if (data.category) updateData.category = data.category
    if (data.image) updateData.image = data.image
    if (data.date) updateData.date = data.date
    if (data.author) updateData.author = data.author
    if (data.slug) updateData.slug = data.slug
    if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle || null
    if (data.seoDescription !== undefined)
      updateData.seoDescription = data.seoDescription || null
    if (data.seoKeywords !== undefined)
      updateData.seoKeywords = data.seoKeywords || null

    updateData.updatedAt = new Date()

    const result = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning()

    const post = result[0]
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      date: post.date,
      author: post.author,
      slug: post.slug,
      seoTitle: post.seoTitle || undefined,
      seoDescription: post.seoDescription || undefined,
      seoKeywords: post.seoKeywords || undefined,
    }
  } catch (error) {
    console.error('Erro ao atualizar post do blog:', error)
    throw error
  }
}

export async function deleteBlogPost(id: number): Promise<void> {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id))
  } catch (error) {
    console.error('Erro ao deletar post do blog:', error)
    throw error
  }
}
