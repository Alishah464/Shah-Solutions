'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import {
  Search, Globe, Code2, Smartphone, TrendingUp, Cloud,
  ChevronRight, ArrowRight, Star, CheckCircle2, Zap,
  Shield, Users, Award, Target, Layers, Sparkles,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

/* ── Typed text hook ──────────────────────────────────────────────────────── */
function useTyped(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length === current.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((i) => i + 1)
        }
      }
    }, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, speed, pause])

  return text
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const services = [
  {
    id: 'seo',
    icon: Search,
    color: 'from-purple-600 to-purple-800',
    glow: 'rgba(124,58,237,0.4)',
    title: 'SEO Optimization',
    desc: 'Dominate search rankings with technical SEO, keyword mastery, link building, and content strategy that drives 10x organic traffic.',
    tags: ['On-Page SEO', 'Technical SEO', 'Link Building'],
  },
  {
    id: 'geo',
    icon: Globe,
    color: 'from-blue-600 to-blue-800',
    glow: 'rgba(37,99,235,0.4)',
    title: 'GEO / AI SEO',
    desc: 'Generative Engine Optimization for AI-powered search — get featured in ChatGPT, Perplexity, and Google AI Overviews.',
    tags: ['AI Search', 'GEO Strategy', 'Answer Engine'],
  },
  {
    id: 'web',
    icon: Code2,
    color: 'from-cyan-600 to-blue-700',
    glow: 'rgba(6,182,212,0.4)',
    title: 'Web Development',
    desc: 'Lightning-fast, pixel-perfect websites built with Next.js, React, and modern frameworks that convert visitors into customers.',
    tags: ['Next.js', 'React', 'E-Commerce'],
  },
  {
    id: 'app',
    icon: Smartphone,
    color: 'from-emerald-600 to-cyan-700',
    glow: 'rgba(16,185,129,0.4)',
    title: 'App Development',
    desc: 'Native iOS & Android and cross-platform Flutter apps with stunning UX that users love and businesses rely on.',
    tags: ['Flutter', 'React Native', 'iOS / Android'],
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    color: 'from-orange-600 to-red-700',
    glow: 'rgba(234,88,12,0.4)',
    title: 'Digital Marketing',
    desc: 'Full-funnel digital marketing — social media, PPC, email campaigns, and conversion optimization for measurable ROI.',
    tags: ['PPC Ads', 'Social Media', 'Email Marketing'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    color: 'from-violet-600 to-indigo-700',
    glow: 'rgba(139,92,246,0.4)',
    title: 'Cloud Solutions',
    desc: 'Scalable, secure cloud infrastructure on AWS, Azure & GCP — from deployment to monitoring and cost optimization.',
    tags: ['AWS', 'Azure', 'DevOps'],
  },
]

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 80, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

const whyUs = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-2s load times. Optimized for Core Web Vitals and real-world performance.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade security, OWASP compliance, and regular vulnerability assessments.' },
  { icon: Users, title: 'Dedicated Support', desc: '24/7 availability with a dedicated account manager for every client.' },
  { icon: Target, title: 'Results-Driven', desc: 'KPI-focused strategies with transparent reporting and measurable outcomes.' },
  { icon: Layers, title: 'Cutting-Edge Stack', desc: 'Always on the latest technology — AI, Web3, and beyond.' },
  { icon: Award, title: 'Quality First', desc: 'Rigorous QA processes ensure every delivery exceeds expectations.' },
]

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'CEO, TechVentures PK',
    rating: 5,
    text: 'Shah Solutions transformed our online presence. Our organic traffic grew 340% in just 4 months. Exceptional team!',
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director, GlobalBiz',
    rating: 5,
    text: 'The web platform they built is blazing fast and our conversion rate jumped 60%. Truly world-class development.',
  },
  {
    name: 'Usman Malik',
    role: 'Founder, StartupHub',
    rating: 5,
    text: 'Our Flutter app was delivered on time, on budget, and our users love it. Best IT partner we\'ve ever had.',
  },
]

/* ── Component ────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const typedText = useTyped(['SEO Domination', 'Stunning Websites', 'Powerful Apps', 'AI-Driven GEO', 'Digital Growth'], 80, 2200)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -120])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="orb orb-purple absolute top-1/4 -left-32 w-[600px] h-[600px] animate-float" />
        <div className="orb orb-blue absolute bottom-1/4 -right-32 w-[500px] h-[500px] animate-float-delay" />
        <div className="orb orb-cyan absolute top-3/4 left-1/2 w-[300px] h-[300px]" style={{ animationDelay: '4s' }} />

        {/* Glowing grid lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"
              style={{ left: `${(i + 1) * 16.67}%`, animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="section-tag">
              <Sparkles size={12} />
              Pakistan&apos;s Premier IT Agency
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-display font-black text-4xl sm:text-6xl lg:text-8xl leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-white">Engineering</span>
            <br />
            <span className="gradient-text-animate">Tomorrow&apos;s</span>
            <br />
            <span className="text-white">Digital World</span>
          </motion.h1>

          {/* Typed subtitle */}
          <motion.div
            className="text-lg sm:text-2xl text-slate-300 mb-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span>We specialize in</span>
            <span className="gradient-text font-bold min-h-[1.4em] min-w-0 sm:min-w-[220px] text-center sm:text-left typing-cursor">
              {typedText}
            </span>
          </motion.div>

          <motion.p
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Shah Solutions delivers cutting-edge IT services — transforming your vision into
            digital excellence with measurable, lasting results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              <span>Start Your Project</span>
              <ChevronRight size={18} />
            </Link>
            <Link href="/portfolio" className="btn-secondary text-base px-8 py-4">
              View Our Work
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {['Top-Rated Agency', '24/7 Support', 'Worldwide Delivery', 'Proven Results'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle2 size={14} className="text-emerald-400" />
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>

      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2/50 to-dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, suffix, label }, i) => (
              <ScrollReveal key={label} delay={i * 0.1}>
                <div className="stat-card group">
                  <div className="text-4xl sm:text-5xl font-display font-black gradient-text mb-2">
                    {statsInView ? (
                      <CountUp end={value} duration={2.5} suffix={suffix} />
                    ) : (
                      `0${suffix}`
                    )}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">{label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 relative">
        <div className="orb orb-purple absolute top-0 right-0 w-96 h-96 opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="section-tag mx-auto inline-flex">
              <Sparkles size={12} />
              What We Do
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4">
              Services Built for{' '}
              <span className="gradient-text">Scale & Growth</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From startups to enterprises — we architect, build, and grow your digital presence
              with technology that puts you miles ahead of the competition.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <ScrollReveal key={svc.id} delay={i * 0.08}>
                  <div
                    className="glass-card glass-card-hover p-8 h-full flex flex-col group"
                    style={{ '--glow': svc.glow } as React.CSSProperties}
                  >
                    <div
                      className={`service-icon-wrap bg-gradient-to-br ${svc.color} group-hover:scale-110 group-hover:rotate-3`}
                      style={{ boxShadow: `0 8px 30px ${svc.glow}` }}
                    >
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                      {svc.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link href="/services" className="btn-secondary inline-flex">
              Explore All Services
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-dark-2/40" />
        <div className="orb orb-blue absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="section-tag">
                <Sparkles size={12} />
                Why Shah Solutions
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-6 leading-tight">
                We Don&apos;t Just Build.
                <br />
                <span className="gradient-text">We Elevate.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Every project we touch gets treated like our own business. We bring the same
                obsession for quality, performance, and results whether you&apos;re a startup or
                a Fortune 500 company.
              </p>
              <Link href="/about" className="btn-primary inline-flex">
                <span>Meet Our Team</span>
                <ChevronRight size={16} />
              </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyUs.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.title} delay={i * 0.08} direction="right">
                    <div className="glass-card p-6 glass-card-hover">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-white mb-1.5 text-sm">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="orb orb-purple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="section-tag mx-auto inline-flex">
              <Star size={12} />
              Client Success Stories
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4">
              What Our Clients <span className="gradient-text">Say</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="glass-card p-8 glass-card-hover h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-tag mx-auto inline-flex mb-6">
              <Zap size={12} />
              Ready to Start?
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white mb-6 leading-tight">
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Extraordinary</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Join 80+ businesses that trust Shah Solutions to power their digital presence.
              Free consultation — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-10 py-4">
                <span>Get Free Consultation</span>
                <ChevronRight size={18} />
              </Link>
              <a href="tel:+923032818320" className="btn-secondary text-base px-10 py-4">
                Call: 0303 2818320
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
