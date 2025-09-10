import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { postsQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Fetch all posts
  const { data: posts } = await sanityFetch({
    query: postsQuery,
    perspective: "published"
  })

  // Base routes
  const baseRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Post routes
  const postRoutes = posts?.map((post) => ({
    url: `${baseUrl}/posts/${post._id}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  return [...baseRoutes, ...postRoutes]
}