import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { industries, getIndustryBySlug } from '@/lib/industriesData'
import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return industries.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ind = getIndustryBySlug(slug)
  if (!ind) return {}

  return buildMetadata({
    title: `${ind.title} SEO & Web Development Services`,
    description: `${ind.intro}`,
    path: `/industries/${slug}`,
    keywords: [`${ind.title} SEO`, `${ind.title} website development`, `${ind.title} digital marketing Pakistan`],
  })
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params
  const ind = getIndustryBySlug(slug)
  if (!ind) notFound()

  const Icon = ind.icon
  const otherIndustries = industries.filter(i => i.slug !== slug).slice(0, 3)

  const schema = buildSchemaGraph([
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
      { name: ind.title, path: `/industries/${slug}` },
    ]),
    buildFaqSchema(ind.faqs, `/industries/${slug}#faq`),
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 -left-32 w-[600px] h-[600px] opacity-20 animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-primary-light transition-colors">Home</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <Link href="/industries" className="hover:text-primary-light transition-colors">Industries</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <span className="text-slate-400">{ind.title}</span>
            </nav>

            <div className="section-tag">
              <Icon size={12} />
              {ind.title}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white mt-4 mb-5 leading-tight">
              {ind.tagline}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{ind.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PAIN POINTS ───────────────────────────────────────────────────── */}
      <section className="py-12 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="glass-card p-6 sm:p-8">
              <h2 className="font-display font-bold text-white text-xl mb-6">Common Challenges We Solve</h2>
              <div className="space-y-3">
                {ind.painPoints.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <XCircle size={16} className="text-red-400/70 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SOLUTIONS ─────────────────────────────────────────────────────── */}
      <section className="py-12 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-8">
            <h2 className="font-display font-bold text-white text-2xl">How We Help {ind.title} Businesses</h2>
          </ScrollReveal>
          <div className="space-y-5">
            {ind.solutions.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <Link href={s.serviceHref} className="glass-card glass-card-hover p-6 flex items-start gap-4 group">
                  <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-base mb-1.5 group-hover:text-primary-light transition-colors">{s.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-primary/50 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-display font-black text-3xl text-white">
              {ind.title} <span className="gradient-text">FAQ</span>
            </h2>
          </ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {ind.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── OTHER INDUSTRIES ─────────────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-8">
            <h2 className="font-display font-bold text-white text-xl">Other Industries</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherIndustries.map(o => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="glass-card glass-card-hover p-5 group">
                <o.icon size={20} className="text-primary mb-3" />
                <h3 className="font-semibold text-white text-sm group-hover:text-primary-light transition-colors">{o.title}</h3>
              </Link>
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
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-6">
              Ready to Grow Your <span className="gradient-text">{ind.title}</span> Business?
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Book a free 30-minute strategy call and we&apos;ll show you exactly where you stand.
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
