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

/** Shared page-metadata builder — every route was hand-writing this block before.
 *
 * `images` is set explicitly on every call: Next.js does not deep-merge the
 * `openGraph`/`twitter` objects between the root layout and a page's own
 * metadata — a page that defines its own `openGraph` silently loses the
 * layout's `images`, which left nearly every non-homepage route with no
 * social-preview image at all (caught via an audit of the actual generated
 * HTML, not the source). */
export function buildMetadata({ title, description, path, keywords, ogType = 'website' }: BuildMetadataArgs): Metadata {
  const ogImage = [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }]
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
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage,
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
