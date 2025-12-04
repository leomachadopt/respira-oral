import { db } from './db/client'
import { blogPosts } from './db/schema'
import { eq } from 'drizzle-orm'
import type { VercelRequest, VercelResponse } from '@vercel/node'
// Função slugify local para evitar dependências do frontend
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    // Inicializar banco de dados
    const database = db()
    const { id, slug } = req.query

    if (req.method === 'GET') {
      if (slug) {
        // Buscar por slug
        const result = await database
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.slug, slug as string))
          .limit(1)

        if (result.length === 0) {
          return res.status(404).json({ error: 'Post não encontrado' })
        }

        const post = result[0]
        return res.status(200).json({
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
        })
      } else if (id) {
        // Buscar por ID
        const result = await database
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.id, Number(id)))
          .limit(1)

        if (result.length === 0) {
          return res.status(404).json({ error: 'Post não encontrado' })
        }

        const post = result[0]
        return res.status(200).json({
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
        })
      } else {
        // Buscar todos
        const result = await database.select().from(blogPosts)

        const postsData = result.map((post) => ({
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

        return res.status(200).json(postsData)
      }
    }

    if (req.method === 'POST') {
      const data = req.body
      const postSlug = data.slug || slugify(data.title)

      const result = await database
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
      return res.status(201).json({
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
      })
    }

    if (req.method === 'PUT') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      const data = req.body
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

      const result = await database
        .update(blogPosts)
        .set(updateData)
        .where(eq(blogPosts.id, Number(id)))
        .returning()

      if (result.length === 0) {
        return res.status(404).json({ error: 'Post não encontrado' })
      }

      const post = result[0]
      return res.status(200).json({
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
      })
    }

    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      await database.delete(blogPosts).where(eq(blogPosts.id, Number(id)))
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error: any) {
    console.error('Erro na API de blog posts:', error)
    const errorMessage = error?.message || 'Erro interno do servidor'
    return res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    })
  }
}

