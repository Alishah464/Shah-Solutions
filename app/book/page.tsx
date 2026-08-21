import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Mail, Phone, MessageSquare, CheckCircle2, ArrowRight, Sparkles, Clock } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { SITE_URL as BASE } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Book a Free Consultation',
  description:
    'Book a free 30-minute IT consultation with Aiventra Labs. Reach us by WhatsApp, phone, or email for SEO, web development, or app development.',
  alternates: { canonical: '/book' },
  keywords: [
    'book IT consultation Pakistan', 'free web development consultation', 'book SEO consultation',
    'schedule meeting Aiventra Labs', 'free consultation Pakistan IT',
  ],
  openGraph: { title: 'Book a Free IT Consultation | Aiventra Labs', url: '/book' },
}

const bookFaqs = [
  {
    q: 'How do I book a free consultation?',
    a: 'Message us on WhatsApp, call, or email — whichever is fastest for you. Tell us briefly what you need (SEO, a new website, an app, etc.) and we\'ll reply with a few time slots within a few hours.',
  },
  {
    q: 'What happens during the call?',
    a: 'A 30-minute conversation about your goals, current situation, and constraints. We\'ll ask questions, share how we\'d approach it, and give you a realistic sense of timeline and cost — no generic sales pitch.',
  },
  {
    q: 'Is the consultation really free, with no obligation?',
    a: 'Yes. There\'s no cost and no pressure to sign anything on the call. If it\'s a fit, we\'ll follow up with a written proposal you can review at your own pace.',
  },
  {
    q: 'What are your business hours?',
    a: 'Monday–Friday, 9:00 AM–8:00 PM Pakistan Standard Time (UTC+5). Messages sent outside these hours are answered the next business day.',
  },
]

const bookSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Book Consultation', item: `${BASE}/book` },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE}/book#webpage`,
      url: `${BASE}/book`,
      name: 'Book a Free IT Consultation | Aiventra Labs',
      description: 'Book a free 30-minute consultation with Aiventra Labs specialists via WhatsApp, phone, or email.',
      isPartOf: { '@id': `${BASE}/#website` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Service',
      name: 'Free IT Consultation',
      description: 'Free 30-minute consultation with Aiventra Labs IT specialists for SEO, GEO, web development, app development, and digital marketing.',
      provider: { '@id': `${BASE}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        name: 'Free 30-minute IT Consultation',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE}/book#faq`,
      mainEntity: bookFaqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

const channels = [
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: 'Fastest response',
    href: 'https://wa.me/923032818320',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Phone,
    label: '0303 2818320',
    value: 'Mon–Fri, 9 AM–8 PM PKT',
    href: 'tel:+923032818320',
    gradient: 'from-secondary to-accent',
  },
  {
    icon: Mail,
    label: 'amaherwani@gmail.com',
    value: 'Replies within 2 hours',
    href: 'mailto:amaherwani@gmail.com',
    gradient: 'from-primary to-secondary',
  },
]

export default function BookPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />

      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 -right-32 w-[500px] h-[500px] opacity-20 animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-tag mx-auto inline-flex">
              <Sparkles size={12} />
              Free Consultation
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white mt-4 mb-6 leading-tight">
              Book a Free <span className="gradient-text-animate">30-Minute Call</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Reach us directly on WhatsApp, phone, or email and we&apos;ll set up a time that works —
              usually within a few hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {channels.map((c, i) => {
              const Icon = c.icon
              return (
                <ScrollReveal key={c.label} delay={i * 0.08}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="glass-card glass-card-hover p-6 flex flex-col items-start gap-4 h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{c.label}</p>
                      <p className="text-slate-400 text-sm">{c.value}</p>
                    </div>
                  </a>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="glass-card p-8 sm:p-10">
              <h2 className="font-display font-bold text-white text-2xl mb-6 flex items-center gap-3">
                <Calendar size={22} className="text-primary" />
                How It Works
              </h2>
              <div className="space-y-5">
                {[
                  { icon: MessageSquare, text: 'Message us with a one-line summary of what you need.' },
                  { icon: Clock, text: 'We reply with a few available time slots, usually same-day.' },
                  { icon: CheckCircle2, text: 'We hop on a free 30-minute call to discuss your goals.' },
                  { icon: ArrowRight, text: 'If it\'s a fit, you get a written proposal — no pressure.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <step.icon size={16} className="text-white" />
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1.5">{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary justify-center">
                  <span>Or Use the Contact Form</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              Booking <span className="gradient-text">FAQ</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {bookFaqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.06}>
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
    </>
  )
}
