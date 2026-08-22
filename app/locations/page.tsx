import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Sparkles, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { cities, serviceOfferings } from '@/lib/locationsData'
import { buildMetadata, buildBreadcrumbSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Where We Work — Pakistan',
  description:
    'Aiventra Labs provides SEO, web development, and digital marketing services to businesses across Pakistan, remote-first.',
  path: '/locations',
  keywords: ['SEO company Pakistan', 'web development company Pakistan', 'digital marketing agency Pakistan'],
})

const schema = buildSchemaGraph([
  buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations' }]),
  {
    '@type': 'CollectionPage',
    '@id': `${BASE}/locations#webpage`,
    url: `${BASE}/locations`,
    name: 'Locations We Serve | Aiventra Labs',
    isPartOf: { '@id': `${BASE}/#website` },
  },
])

export default function LocationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 -left-32 w-[600px] h-[600px] opacity-20 animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-tag mx-auto inline-flex">
              <Sparkles size={12} />
              Where We Work
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white mt-4 mb-6 leading-tight">
              Serving Businesses <span className="gradient-text-animate">Across Pakistan</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              SEO, web development, and digital marketing — delivered remote-first to businesses across the country.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {cities.map((city, i) => (
            <ScrollReveal key={city.slug} delay={i * 0.06}>
              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={18} className="text-primary" />
                  <h2 className="font-display font-bold text-white text-xl">{city.name}</h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-2xl">{city.blurb}</p>
                <div className="flex flex-wrap gap-3">
                  {serviceOfferings.map(o => (
                    <Link
                      key={o.key}
                      href={`/locations/${o.slugPrefix}-${city.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm hover:border-primary/40 hover:bg-primary/10 hover:text-white transition-colors"
                    >
                      {o.label} in {city.name}
                      <ArrowRight size={13} />
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
