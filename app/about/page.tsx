import type { Metadata } from 'next'
import { Target, Eye, Heart, Rocket, Users, Code2, Sparkles, ArrowRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'
import TechConstellation from '@/components/TechConstellation'
import { buildMetadata, SITE_URL as BASE } from '@/lib/seo'

const aboutFaqs = [
  {
    q: 'Who is behind Aiventra Labs?',
    a: 'Aiventra Labs is a Pakistan-based AI, software, and digital growth company founded and led by Alishah, with engineering, SEO, and design specialists brought in project by project as scope requires.',
  },
  {
    q: 'Does Aiventra Labs only work with clients in Pakistan?',
    a: 'No. Aiventra Labs is based in Pakistan but serves businesses worldwide, with client communication available in both English and Urdu.',
  },
  {
    q: 'What makes Aiventra Labs different from other IT agencies?',
    a: 'Four things: measuring success by client outcomes rather than deliverables, radical transparency in reporting and pricing, a client-first culture, and staying ahead of shifts like AI search and GEO rather than reacting to them late.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE}/about` },
      ],
    },
    {
      '@type': 'AboutPage',
      '@id': `${BASE}/about#webpage`,
      url: `${BASE}/about`,
      name: 'About Aiventra Labs — AI, Software & Digital Growth Company',
      description: 'Learn about Aiventra Labs — our mission, team, values, and approach as an AI, software, and digital growth company based in Pakistan, serving businesses worldwide.',
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': `${BASE}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE}/about#faq`,
      mainEntity: aboutFaqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

export const metadata: Metadata = buildMetadata({
  title: 'About Aiventra Labs',
  description:
    'Learn about Aiventra Labs — our mission, values, and approach to SEO, web development, and AI development for businesses in Pakistan and worldwide.',
  path: '/about',
  keywords: [
    'about Aiventra Labs', 'Aiventra Labs team',
    'IT agency values Pakistan', 'AI software company Pakistan',
  ],
})

const values = [
  {
    icon: Target,
    title: 'Results-Obsessed',
    desc: 'Every strategy, every line of code, every campaign is tied to measurable business outcomes.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    desc: 'Real-time reporting, honest timelines, and zero hidden fees. You always know exactly what\'s happening.',
  },
  {
    icon: Heart,
    title: 'Client-First Culture',
    desc: 'Your success is our success. We go beyond the brief to ensure you achieve your goals.',
  },
  {
    icon: Rocket,
    title: 'Innovation-Driven',
    desc: 'We stay ahead of technology shifts — AI, GEO, Web3 — so you\'re always on the cutting edge.',
  },
]

const team = [
  {
    name: 'Alishah',
    role: 'Founder & CEO',
    expertise: 'Full-Stack Development, Business Strategy',
    gradient: 'from-primary to-secondary',
  },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 -right-32 w-[600px] h-[600px] opacity-25 animate-float" />
        <div className="orb orb-blue absolute bottom-0 -left-32 w-[400px] h-[400px] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl">
            <div className="section-tag">
              <Sparkles size={12} />
              Our Story
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white mt-4 mb-6 leading-tight">
              We Are{' '}
              <span className="gradient-text-animate">Aiventra Labs</span>
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-8">
              Born from a passion for technology and a relentless drive for results, Aiventra Labs
              is a Pakistan-based partner for businesses that refuse to settle for average.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We combine Silicon Valley-level engineering with deep local market knowledge to
              deliver IT services that truly move the needle — whether you&apos;re a local startup
              or scaling globally.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MISSION / VISION ──────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="glass-card p-6 sm:p-10 h-full gradient-border">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                  <Target size={24} className="text-white" />
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">Our Mission</h2>
                <p className="text-slate-400 leading-relaxed">
                  To empower businesses of all sizes with premium IT solutions — making
                  enterprise-grade SEO, development, and marketing accessible, affordable,
                  and impactful. We measure success only when our clients succeed.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="glass-card p-6 sm:p-10 h-full" style={{ border: '1px solid rgba(37,99,235,0.25)' }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6">
                  <Eye size={24} className="text-white" />
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">Our Vision</h2>
                <p className="text-slate-400 leading-relaxed">
                  To be the #1 IT services partner for South Asian businesses competing on the
                  global stage — known for innovation, integrity, and delivering results that
                  redefine what&apos;s possible in digital transformation.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="orb orb-cyan absolute top-0 left-1/2 w-[400px] h-[400px] opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="section-tag mx-auto inline-flex">
              <Heart size={12} />
              Our Core Values
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4">
              Principles That <span className="gradient-text">Drive Us</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <ScrollReveal key={v.title} delay={i * 0.1}>
                  <div className="glass-card glass-card-hover p-8 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                      <Icon size={26} className="text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-3">{v.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dark-2/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="section-tag mx-auto inline-flex">
              <Users size={12} />
              Leadership
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4">
              Founder-Led, <span className="gradient-text">Client-Obsessed</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Aiventra Labs is led directly by its founder, with specialists brought in project by project as scope requires.
            </p>
          </ScrollReveal>

          <div className="max-w-xs mx-auto">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="glass-card glass-card-hover p-6 text-center">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 text-3xl font-display font-black text-white`}
                    style={{ boxShadow: '0 8px 30px rgba(124,58,237,0.3)' }}
                  >
                    {member.name[0]}
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{member.expertise}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dark-2/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <div className="section-tag mx-auto inline-flex">
              <Code2 size={12} />
              Our Tech Stack
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-4">
              Technologies We <span className="gradient-text">Master</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <TechConstellation />
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-2/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <div className="section-tag mx-auto inline-flex">
              <HelpCircle size={12} />
              Common Questions
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-4">
              About Us <span className="gradient-text">FAQ</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {aboutFaqs.map((faq, i) => (
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
              Ready to Work <span className="gradient-text">Together?</span>
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Let&apos;s have a conversation about your project goals.
              No pressure, no commitment — just good ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="/contact" className="btn-primary px-8 py-4 text-base">
                <span>Start the Conversation</span>
                <ArrowRight size={16} />
              </MagneticButton>
              <Link href="/services" className="btn-secondary px-8 py-4 text-base">
                See Our Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
