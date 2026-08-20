import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export { SITE_URL }

interface BuildMetadataArgs {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogType?: 'website' | 'article'
}

/** Shared page-metadata builder — every route was hand-writing this block before. */
export function buildMetadata({ title, description, path, keywords, ogType = 'website' }: BuildMetadataArgs): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    keywords,
    openGraph: {
      type: ogType,
      title,
      description,
      url: path,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

interface BreadcrumbItem {
  name: string
  path: string
}

/** Builds a schema.org BreadcrumbList node. `path` is site-relative (e.g. "/services/seo"). */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      name: item.name,
      item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  }
}

interface Faq {
  q: string
  a: string
}

/** Builds a schema.org FAQPage node. Pass an @id path (e.g. "/services/seo#faq") if the graph needs to reference it. */
export function buildFaqSchema(faqs: Faq[], id?: string) {
  return {
    '@type': 'FAQPage' as const,
    ...(id ? { '@id': `${SITE_URL}${id}` } : {}),
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question' as const,
      name: q,
      acceptedAnswer: { '@type': 'Answer' as const, text: a },
    })),
  }
}

/** Wraps schema.org nodes in a @graph document, ready for a <script type="application/ld+json"> tag. */
export function buildSchemaGraph(nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
