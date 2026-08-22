import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'
import { locationPages, getLocationPageBySlug, serviceOfferings } from '@/lib/locationsData'
import { buildMetadata, buildBreadcrumbSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return locationPages.map(l => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocationPageBySlug(slug)
  if (!loc) return {}

  const title = `${loc.offering.label} in ${loc.city.name}`
  return buildMetadata({
    title,
    description: `Aiventra Labs — ${loc.offering.label} serving businesses across ${loc.city.name}, remote-first with transparent pricing.`,
    path: `/locations/${slug}`,
    keywords: [
      `${loc.offering.label} ${loc.city.name}`,
      `${loc.offering.label} in ${loc.city.name}`,
      `${loc.offering.key} services ${loc.city.name}`,
    ],
  })
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const loc = getLocationPageBySlug(slug)
  if (!loc) notFound()

  const { city, offering } = loc
  const otherServicesInCity = serviceOfferings.filter(o => o.key !== offering.key)

  const faqs = [
    {
      q: `Does Aiventra Labs have a team based in ${city.name}?`,
      a: `Aiventra Labs is based in Pakistan and works remote-first with clients across the country, with flexible calls scheduled around your timezone. Most clients work with us entirely online — from discovery call to launch.`,
    },
    {
      q: `How much does ${offering.label.toLowerCase()} cost in ${city.name}?`,
      a: `Pricing depends on scope. We provide a transparent, itemized proposal after a free consultation, so you know exactly what you're paying for before committing — no hidden fees.`,
    },
    {
      q: `How is Aiventra Labs different from other ${offering.label.toLowerCase()} options in ${city.name}?`,
      a: `We combine technical depth with straightforward communication and transparent reporting. ${offering.pitch}`,
    },
  ]

  const schema = buildSchemaGraph([
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations' },
      { name: `${offering.label} in ${city.name}`, path: `/locations/${slug}` },
    ]),
    {
      '@type': 'Service',
      name: `${offering.label} in ${city.name}`,
      serviceType: offering.label,
      description: offering.pitch,
      provider: { '@id': `${BASE}/#organization` },
      areaServed: { '@type': 'Country', name: city.name },
      url: `${BASE}/locations/${slug}`,
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE}/locations/${slug}#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 -left-32 w-[600px] h-[600px] opacity-20 animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-primary-light transition-colors">Home</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <Link href="/locations" className="hover:text-primary-light transition-colors">Locations</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <span className="text-slate-400">{city.name}</span>
            </nav>

            <div className="section-tag">
              <MapPin size={12} />
              {city.name}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white mt-4 mb-5 leading-tight">
              {offering.label} in <span className="gradient-text-animate">{city.name}</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mb-4">{offering.pitch}</p>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">{city.blurb}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <MagneticButton href="/contact" className="btn-primary text-sm">
                <span>Get a Free Consultation</span>
                <ArrowRight size={16} />
              </MagneticButton>
              <Link href={offering.servicePageHref} className="btn-secondary text-sm">
                See Full {offering.label.replace(' Company', '')} Details
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <section className="py-12 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="glass-card p-6 sm:p-8">
              <h2 className="font-display font-bold text-white text-xl mb-6">
                What You Get, {city.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {offering.deliverables.map((d) => (
                  <div key={d} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {city.name} <span className="gradient-text">FAQ</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="glass-card overflow-hidden group">
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none hover:bg-white/3 transition-colors">
                  <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                  <span className="text-primary text-2xl flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS LINKS ───────────────────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h3 className="font-display font-bold text-white text-lg mb-4">Other Services in {city.name}</h3>
            <div className="flex flex-col gap-2">
              {otherServicesInCity.map(o => (
                <Link
                  key={o.key}
                  href={`/locations/${o.slugPrefix}-${city.slug}`}
                  className="text-sm text-slate-400 hover:text-primary-light transition-colors inline-flex items-center gap-2"
                >
                  <ArrowRight size={12} />
                  {o.label} in {city.name}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-6">
              Let&apos;s Grow Your Business in {city.name}
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Book a free 30-minute strategy call — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="/contact" className="btn-primary px-8 py-4 text-base">
                <span>Book Free Strategy Call</span>
                <ArrowRight size={16} />
              </MagneticButton>
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
