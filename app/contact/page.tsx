import type { Metadata } from 'next'
import ContactClient from '@/components/ContactClient'
import { buildMetadata, SITE_URL as BASE } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us — Free IT Consultation',
  description:
    'Contact Aiventra Labs for IT services. Get a free consultation for SEO, GEO, web development, or app development. We respond within 2 hours.',
  path: '/contact',
  keywords: [
    'contact Aiventra Labs', 'IT consultation Pakistan', 'free SEO consultation',
    'web development quote', 'hire IT company Pakistan',
  ],
})

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE}/contact` },
      ],
    },
    {
      '@type': 'ContactPage',
      '@id': `${BASE}/contact#webpage`,
      url: `${BASE}/contact`,
      name: 'Contact Aiventra Labs — Free IT Consultation',
      description: 'Contact Aiventra Labs for IT services. Free consultation for SEO, GEO, web development, and app development. Response within 2 hours.',
      isPartOf: { '@id': `${BASE}/#website` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE}/contact#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does a website project take?',
          acceptedAnswer: { '@type': 'Answer', text: 'A standard business website takes 2–4 weeks. Complex e-commerce or web apps take 6–12 weeks. We always agree on timelines upfront.' },
        },
        {
          '@type': 'Question',
          name: 'Do you offer post-launch support?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — all projects include 30 days of free post-launch support. We also offer monthly retainer plans for ongoing maintenance.' },
        },
        {
          '@type': 'Question',
          name: 'How do you measure SEO success?',
          acceptedAnswer: { '@type': 'Answer', text: 'We track organic traffic, keyword rankings, click-through rates, and revenue attribution. Monthly reports are sent every 1st of the month.' },
        },
        {
          '@type': 'Question',
          name: 'Do you work with startups and small businesses?',
          acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. We work with businesses of all sizes — from early-stage startups to established enterprises. Every client gets the same quality.' },
        },
      ],
    },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <ContactClient />
    </>
  )
}
