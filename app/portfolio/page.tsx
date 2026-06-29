import type { Metadata } from 'next'
import PortfolioClient from '@/components/PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio — Web, App, SEO & Marketing Projects',
  description:
    'Explore Shah Solutions portfolio: 150+ delivered projects in web development, app development, SEO campaigns, GEO optimization, and digital marketing. Real results, real businesses.',
  alternates: { canonical: '/portfolio' },
  keywords: [
    'IT portfolio Pakistan', 'web development projects', 'app development portfolio',
    'SEO case studies', 'digital marketing results',
  ],
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
