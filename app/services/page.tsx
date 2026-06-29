import type { Metadata } from 'next'
import {
  Search, Globe, Code2, Smartphone, TrendingUp, Cloud,
  CheckCircle2, ArrowRight, Sparkles, ChevronRight,
  BarChart3, Link2, FileSearch, Bot, Map, Store,
  Layout, ShoppingCart, Cpu, Database, Lock, Server,
  Activity, Share2, Mail, MousePointerClick,
  Layers, GitBranch, Terminal, Gauge,
} from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'IT Services — SEO, GEO, Web & App Development',
  description:
    'Full-stack IT services: SEO optimization, GEO/AI search, custom web development, mobile app development, digital marketing, and cloud solutions. Shah Solutions Pakistan.',
  alternates: { canonical: '/services' },
  keywords: [
    'SEO services Pakistan', 'GEO optimization', 'web development services',
    'app development Pakistan', 'digital marketing agency', 'cloud solutions Pakistan',
  ],
}

const serviceCategories = [
  {
    id: 'seo',
    icon: Search,
    color: 'from-purple-600 to-violet-800',
    borderColor: 'border-purple-500/20',
    glowColor: 'rgba(124,58,237,0.3)',
    title: 'SEO Optimization',
    subtitle: 'Rank Higher. Get Found. Grow Faster.',
    longDesc:
      'Our data-driven SEO strategies are built on deep technical audits, competitive analysis, and content frameworks that get you to page 1 — and keep you there. We don\'t chase rankings; we build authority.',
    features: [
      { icon: FileSearch, label: 'Technical SEO Audit & Fix' },
      { icon: BarChart3, label: 'Keyword Research & Mapping' },
      { icon: Link2, label: 'Authority Link Building' },
      { icon: Layout, label: 'On-Page Optimization' },
      { icon: Gauge, label: 'Core Web Vitals Optimization' },
      { icon: Activity, label: 'SEO Analytics & Reporting' },
    ],
    results: ['300% average traffic increase', 'Page 1 rankings in 90 days', 'Measurable ROI tracking'],
  },
  {
    id: 'geo',
    icon: Globe,
    color: 'from-blue-600 to-cyan-700',
    borderColor: 'border-blue-500/20',
    glowColor: 'rgba(37,99,235,0.3)',
    title: 'GEO / AI Search Optimization',
    subtitle: 'Own the AI-Powered Search Landscape.',
    longDesc:
      'Generative Engine Optimization (GEO) is the next frontier of search. We position your brand to be cited, featured, and recommended by AI systems like ChatGPT, Perplexity, Google AI Overview, and Gemini — where millions of users are now getting their answers.',
    features: [
      { icon: Bot, label: 'AI Citation Strategy' },
      { icon: FileSearch, label: 'Structured Data & Schema' },
      { icon: Globe, label: 'E-E-A-T Authority Building' },
      { icon: Map, label: 'Local GEO Targeting' },
      { icon: Store, label: 'Google Business Optimization' },
      { icon: Activity, label: 'AI Search Monitoring' },
    ],
    results: ['Featured in AI search results', 'Authority E-E-A-T signals', 'Local pack dominance'],
  },
  {
    id: 'web',
    icon: Code2,
    color: 'from-cyan-600 to-blue-700',
    borderColor: 'border-cyan-500/20',
    glowColor: 'rgba(6,182,212,0.3)',
    title: 'Web Development',
    subtitle: 'Websites That Perform Like Products.',
    longDesc:
      'We build high-performance websites and web applications using modern tech stacks — Next.js, React, TypeScript, and more. Every project is engineered for speed, accessibility, and conversion from day one.',
    features: [
      { icon: Layout, label: 'Custom Website Design' },
      { icon: ShoppingCart, label: 'E-Commerce Platforms' },
      { icon: Cpu, label: 'Web App Development' },
      { icon: Database, label: 'CMS Integration' },
      { icon: Gauge, label: 'Performance Optimization' },
      { icon: Lock, label: 'Security Hardening' },
    ],
    results: ['Sub-2s load times', '99.9% uptime SLA', 'Mobile-first responsive'],
  },
  {
    id: 'app',
    icon: Smartphone,
    color: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-500/20',
    glowColor: 'rgba(16,185,129,0.3)',
    title: 'App Development',
    subtitle: 'Apps That Users Love. Businesses Rely On.',
    longDesc:
      'From concept to App Store launch, we build native iOS & Android and cross-platform mobile applications with Flutter and React Native. Intuitive UX, robust architecture, and seamless backend integration.',
    features: [
      { icon: Smartphone, label: 'Flutter Cross-Platform' },
      { icon: Layers, label: 'React Native Apps' },
      { icon: Server, label: 'Backend API Development' },
      { icon: Database, label: 'Real-time Database' },
      { icon: Lock, label: 'App Store Submission' },
      { icon: Activity, label: 'Performance Monitoring' },
    ],
    results: ['4.8+ App Store ratings', '50ms response APIs', 'Offline-first architecture'],
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    color: 'from-orange-600 to-red-700',
    borderColor: 'border-orange-500/20',
    glowColor: 'rgba(234,88,12,0.3)',
    title: 'Digital Marketing',
    subtitle: 'Marketing That Converts, Not Just Impresses.',
    longDesc:
      'Full-funnel digital marketing backed by data, not gut feeling. We run targeted PPC campaigns, build engaged social followings, and create email sequences that nurture leads into paying customers.',
    features: [
      { icon: MousePointerClick, label: 'Google & Meta PPC Ads' },
      { icon: Share2, label: 'Social Media Management' },
      { icon: Mail, label: 'Email Marketing & Automation' },
      { icon: BarChart3, label: 'Conversion Rate Optimization' },
      { icon: Activity, label: 'Marketing Analytics' },
      { icon: GitBranch, label: 'A/B Testing & Optimization' },
    ],
    results: ['Average 4.5x ROAS', '60% higher conversion rates', 'Full attribution reporting'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    color: 'from-violet-600 to-indigo-700',
    borderColor: 'border-violet-500/20',
    glowColor: 'rgba(139,92,246,0.3)',
    title: 'Cloud Solutions',
    subtitle: 'Infrastructure Built to Scale Infinitely.',
    longDesc:
      'Architect, deploy, and manage cloud infrastructure on AWS, Azure, or GCP with DevOps best practices. We handle everything from containerization to CI/CD pipelines, monitoring, and cost optimization.',
    features: [
      { icon: Server, label: 'AWS / Azure / GCP Setup' },
      { icon: Terminal, label: 'DevOps & CI/CD Pipelines' },
      { icon: Lock, label: 'Cloud Security & Compliance' },
      { icon: Database, label: 'Database Management' },
      { icon: Activity, label: 'Monitoring & Alerting' },
      { icon: Gauge, label: 'Cost Optimization' },
    ],
    results: ['99.99% uptime', '40% average cost reduction', 'Auto-scaling architecture'],
  },
]

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We learn your goals, constraints, and success metrics. No templates — pure listening.' },
  { step: '02', title: 'Strategy & Proposal', desc: 'Custom strategy document with timeline, deliverables, and transparent pricing.' },
  { step: '03', title: 'Design & Build', desc: 'Iterative development with weekly check-ins and live preview environments.' },
  { step: '04', title: 'Launch & Grow', desc: 'Launch with confidence. Then ongoing optimization to keep scaling your results.' },
]

export default function ServicesPage() {
  return (
    <>
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

      {/* ── SERVICE CARDS ─────────────────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {serviceCategories.map((svc, i) => {
            const Icon = svc.icon
            const isEven = i % 2 === 0
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
              >
                <ScrollReveal direction={isEven ? 'left' : 'right'} className={!isEven ? 'lg:order-2' : ''}>
                  <div className="section-tag">
                    <Icon size={12} />
                    {svc.title}
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-4 mb-3 leading-tight">
                    {svc.subtitle}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-8">{svc.longDesc}</p>

                  <div className="space-y-2 mb-8">
                    {svc.results.map((r) => (
                      <div key={r} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{r}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="btn-primary inline-flex text-sm">
                    <span className="hidden sm:inline">Get Started with {svc.title}</span>
                    <span className="sm:hidden">Get Started</span>
                    <ChevronRight size={16} />
                  </Link>
                </ScrollReveal>

                <ScrollReveal direction={isEven ? 'right' : 'left'} delay={0.1} className={!isEven ? 'lg:order-1' : ''}>
                  <div
                    className={`glass-card p-6 sm:p-8 border ${svc.borderColor}`}
                    style={{ boxShadow: `0 20px 60px ${svc.glowColor}` }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-8`}>
                      <Icon size={30} className="text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {svc.features.map(({ icon: FIcon, label }) => (
                        <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/6 transition-colors duration-200">
                          <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                            <FIcon size={14} className="text-slate-300" />
                          </div>
                          <span className="text-slate-300 text-xs font-medium">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )
          })}
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
