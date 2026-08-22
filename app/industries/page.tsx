import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { industries } from '@/lib/industriesData'
import { buildMetadata, buildBreadcrumbSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve — E-commerce, SaaS & More',
  description:
    'Aiventra Labs builds SEO, web development, and AI solutions tailored to e-commerce, SaaS, real estate, healthcare, and education businesses.',
  path: '/industries',
  keywords: ['IT solutions by industry', 'e-commerce SEO Pakistan', 'SaaS marketing site', 'real estate website Pakistan'],
})

const schema = buildSchemaGraph([
  buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }]),
  {
    '@type': 'CollectionPage',
    '@id': `${BASE}/industries#webpage`,
    url: `${BASE}/industries`,
    name: 'Industries We Serve | Aiventra Labs',
    isPartOf: { '@id': `${BASE}/#website` },
  },
])

export default function IndustriesPage() {
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
              Industries We Serve
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white mt-4 mb-6 leading-tight">
              Solutions Built for <span className="gradient-text-animate">Your Industry</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Every industry searches, buys, and converts differently. We tailor SEO, web development,
              and AI strategy to how your specific market actually works.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 0.08}>
                <Link href={`/industries/${ind.slug}`} className="glass-card glass-card-hover p-7 flex flex-col h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <ind.icon size={22} className="text-primary-light" />
                  </div>
                  <h2 className="font-display font-bold text-white text-xl mb-2">{ind.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{ind.intro}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary-light group-hover:text-white transition-colors">
                    See how we help
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
