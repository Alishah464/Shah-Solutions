import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, ChevronRight, AlertTriangle, BookOpen, Sparkles } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'
import { serviceCategories, getServiceBySlug, RELATED_ARTICLES } from '@/lib/servicesData'
import { getAllArticles } from '@/lib/blog'
import { buildMetadata, buildBreadcrumbSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return serviceCategories.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) return {}

  return buildMetadata({
    title: `${svc.title} Services`,
    description: `${svc.subtitle} ${svc.title} for businesses in Pakistan and worldwide.`,
    path: `/services/${slug}`,
    keywords: [svc.title, `${svc.title} Pakistan`, svc.serviceType],
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) notFound()

  const Icon = svc.icon
  const articleTitles: Record<string, string> = Object.fromEntries(getAllArticles().map(a => [a.slug, a.title]))
  const related = RELATED_ARTICLES[slug]
  const otherServices = serviceCategories.filter(s => s.slug !== slug).slice(0, 3)

  const schema = buildSchemaGraph([
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: svc.title, path: `/services/${slug}` },
    ]),
    {
      '@type': 'Service',
      '@id': `${BASE}/services/${slug}#service`,
      name: svc.title,
      serviceType: svc.serviceType,
      description: svc.longDesc,
      provider: { '@id': `${BASE}/#organization` },
      areaServed: 'Worldwide',
      url: `${BASE}/services/${slug}`,
    },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 -left-32 w-[600px] h-[600px] opacity-20 animate-float" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-primary-light transition-colors">Home</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <Link href="/services" className="hover:text-primary-light transition-colors">Services</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <span className="text-slate-400">{svc.title}</span>
            </nav>

            <div className="section-tag">
              <Icon size={12} />
              {svc.title}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white mt-4 mb-5 leading-tight">
              {svc.subtitle}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{svc.longDesc}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-8 relative">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <ScrollReveal direction="left">
            <div className="space-y-2 mb-8">
              {svc.results.map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{r}</span>
                </div>
              ))}
              {svc.disclaimer && (
                <div className="flex items-start gap-3 pt-1">
                  <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-xs leading-relaxed italic">{svc.disclaimer}</span>
                </div>
              )}
            </div>

            <MagneticButton href="/contact" className="btn-primary inline-flex text-sm">
              <span>Get Started with {svc.title}</span>
              <ChevronRight size={16} />
            </MagneticButton>

            {related && (
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Related Reading</p>
                <div className="flex flex-col gap-2">
                  {related.map(articleSlug => {
                    const title = articleTitles[articleSlug]
                    if (!title) return null
                    return (
                      <Link
                        key={articleSlug}
                        href={`/blog/${articleSlug}`}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary-light transition-colors"
                      >
                        <BookOpen size={13} className="flex-shrink-0" />
                        <span>{title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div
              className={`glass-card p-6 sm:p-8 border ${svc.borderColor}`}
              style={{ boxShadow: `0 20px 60px ${svc.glowColor}` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-8`}>
                <Icon size={30} className="text-white" />
              </div>
              <div className="relative">
                <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-25" />
                <div className="space-y-3">
                  {svc.features.map(({ icon: FIcon, label }, i) => (
                    <ScrollReveal key={label} delay={i * 0.08} direction="left" once={false}>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center flex-shrink-0 relative z-10`}
                          style={{ boxShadow: `0 4px 16px ${svc.glowColor}` }}
                        >
                          <FIcon size={16} className="text-white" />
                        </div>
                        <span className="text-slate-200 text-sm font-medium">{label}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── OTHER SERVICES ───────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-10">
            <div className="section-tag">
              <Sparkles size={12} />
              Explore More
            </div>
            <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mt-3">Other Services</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherServices.map(s => {
              const OIcon = s.icon
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="glass-card glass-card-hover p-5 group">
                  <OIcon size={20} className="text-primary mb-3" />
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-primary-light transition-colors">{s.title}</h3>
                  <p className="text-slate-400 text-xs">{s.subtitle}</p>
                </Link>
              )
            })}
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
              Ready to Get Started with <span className="gradient-text">{svc.title}</span>?
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Book a free 30-minute strategy call and we&apos;ll show you exactly where you stand.
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
