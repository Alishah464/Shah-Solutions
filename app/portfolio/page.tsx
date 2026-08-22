import type { Metadata } from 'next'
import PortfolioClient from '@/components/PortfolioClient'
import { buildMetadata, SITE_URL as BASE } from '@/lib/seo'

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${BASE}/portfolio` },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${BASE}/portfolio#webpage`,
      url: `${BASE}/portfolio`,
      name: 'Portfolio — What We Build | Aiventra Labs',
      description: 'See what Aiventra Labs builds: web development, mobile app development, SEO, GEO, AI development, and digital marketing capabilities.',
      isPartOf: { '@id': `${BASE}/#website` },
      creator: { '@id': `${BASE}/#organization` },
      inLanguage: 'en-US',
    },
  ],
}

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio — What We Build',
  description:
    'See what Aiventra Labs builds: web development, mobile app development, SEO, GEO, AI development, and digital marketing capabilities.',
  path: '/portfolio',
  keywords: [
    'IT portfolio Pakistan', 'web development capabilities', 'app development company',
    'SEO agency Pakistan', 'digital marketing agency',
  ],
})

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
      <PortfolioClient />
    </>
  )
}
