import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, ChevronRight, Layers } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { serviceCategories, process, serviceFaqs } from '@/lib/servicesData'
import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'IT Services — SEO, GEO, Web, App & AI Development',
  description:
    'Full-stack IT services: SEO, GEO/AI search, web & app dev, digital marketing, cloud, AI agents, chatbots & trading bots. Shah Solutions, Pakistan.',
  path: '/services',
  keywords: [
    'SEO services Pakistan', 'GEO optimization', 'web development services',
    'app development Pakistan', 'digital marketing agency', 'cloud solutions Pakistan',
    'AI agent development', 'AI chatbot development', 'trading bot development',
  ],
})

const servicesPageSchema = buildSchemaGraph([
  buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
  {
    '@type': 'WebPage',
    '@id': `${BASE}/services#webpage`,
    url: `${BASE}/services`,
    name: 'IT Services — SEO, GEO, Web & App Development | Shah Solutions',
    description: 'Explore Shah Solutions IT services: SEO optimization, GEO/AI search optimization, web development, app development, digital marketing, cloud solutions, AI agents, AI chatbots, and trading bots.',
    isPartOf: { '@id': `${BASE}/#website` },
  },
  ...serviceCategories.map(svc => ({
    '@type': 'Service',
    name: svc.title,
    serviceType: svc.serviceType,
    description: svc.longDesc,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: 'Worldwide',
    url: `${BASE}/services/${svc.slug}`,
  })),
  buildFaqSchema(serviceFaqs, '/services#faq'),
])

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 -left-32 w-[600px] h-[600px] opacity-20 animate-float" />
        <div className="orb orb-blue absolute bottom-0 -right-32 w-[400px] h-[400px] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-tag mx-auto inline-flex">
              <Sparkles size={12} />
              What We Offer
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white mt-4 mb-6 leading-tight">
              Services That{' '}
              <span className="gradient-text-animate">Drive Results</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Every service we offer is built around one question: <em className="text-slate-300">&ldquo;What outcome does this create for the client?&rdquo;</em>
              {' '}If it doesn&apos;t move your metrics, we don&apos;t offer it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICE GRID ──────────────────────────────────────────────────── */}
      <section className="py-8 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((svc, i) => {
              const Icon = svc.icon
              return (
                <ScrollReveal key={svc.slug} delay={Math.min(i * 0.05, 0.3)}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className={`glass-card glass-card-hover p-6 sm:p-7 h-full flex flex-col border ${svc.borderColor} group`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <h2 className="font-display font-bold text-white text-xl mb-2">{svc.title}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{svc.subtitle}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary-light group-hover:text-white transition-colors">
                      Learn more
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="orb orb-blue absolute top-1/2 right-0 w-96 h-96 opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="section-tag mx-auto inline-flex">
              <Layers size={12} />
              How We Work
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4">
              Our Proven <span className="gradient-text">Process</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.1}>
                <div className="glass-card glass-card-hover p-8 relative">
                  <div className="text-6xl font-display font-black text-white/5 absolute top-4 right-6 select-none">
                    {p.step}
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 font-display font-bold text-white text-sm">
                    {p.step}
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={16} className="text-primary/50" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <div className="section-tag mx-auto inline-flex">
              <ChevronRight size={12} />
              Got Questions?
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-4">
              Services <span className="gradient-text">FAQ</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {serviceFaqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.05}>
                <details className="glass-card overflow-hidden group">
                  <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none hover:bg-white/3 transition-colors">
                    <span className="font-semibold text-white text-sm sm:text-base pr-4">{faq.q}</span>
                    <span className="text-primary text-2xl flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
              Not Sure Which Service{' '}
              <span className="gradient-text">You Need?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Book a free 30-minute strategy call. We&apos;ll analyze your current digital presence
              and recommend exactly what will move the needle for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-4 text-base">
                <span>Book Free Strategy Call</span>
                <ArrowRight size={16} />
              </Link>
              <a href="tel:+923032818320" className="btn-secondary px-8 py-4 text-base">
                Call Now: 0303 2818320
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
