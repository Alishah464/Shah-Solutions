'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { serviceCategories } from '@/lib/servicesData'

const featured = serviceCategories.filter(s => s.slug !== 'trading-bots')

export default function PortfolioClient() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-purple absolute top-20 right-0 w-[600px] h-[600px] opacity-20 animate-float" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-tag mx-auto inline-flex">
              <Sparkles size={12} />
              What We Build
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mt-4 mb-6 leading-tight">
              Capabilities, <span className="gradient-text-animate">Not Just Claims</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              We&apos;re building out this page with real client case studies as projects launch.
              In the meantime, here&apos;s exactly what we build and how we approach it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────────────────── */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((svc, i) => {
              const Icon = svc.icon
              return (
                <ScrollReveal key={svc.slug} delay={i * 0.06}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="glass-card glass-card-hover p-8 h-full flex flex-col group"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                      style={{ boxShadow: `0 8px 30px ${svc.glowColor}` }}
                    >
                      <Icon size={26} className="text-white" />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{svc.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{svc.longDesc}</p>
                    <span className="inline-flex items-center gap-1.5 text-primary-light text-sm font-medium">
                      See how we approach it
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
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
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
              Your Project Could Be <span className="gradient-text">Next</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Let&apos;s build something remarkable together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-4 text-base">
                <span>Start Your Project</span>
                <ChevronRight size={16} />
              </Link>
              <Link href="/services" className="btn-secondary px-8 py-4 text-base">
                Explore Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
