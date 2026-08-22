'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles, Send, ArrowRight, Bot } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { MagneticSubmitButton } from '@/components/MagneticButton'
import { trackEvent } from '@/lib/analytics'

interface Answer {
  summary: string
  points: string[]
  ctaLabel: string
  ctaHref: string
}

const rules: { test: RegExp; answer: Answer }[] = [
  {
    test: /\b(seo|rank|google|search engine|organic traffic)\b/i,
    answer: {
      summary: 'Sounds like search visibility is the goal. Here\'s where we\'d start:',
      points: [
        'A technical SEO audit to find what\'s currently costing you rankings',
        'Keyword mapping tied to what your actual buyers search for',
        'A content and link-building plan built around that map',
      ],
      ctaLabel: 'See our SEO approach',
      ctaHref: '/services/seo',
    },
  },
  {
    test: /\b(app|mobile|ios|android|flutter)\b/i,
    answer: {
      summary: 'A mobile app for your business — here\'s the shape of that project:',
      points: [
        'Scope: native iOS/Android vs. cross-platform (Flutter/React Native)',
        'A UX pass focused on the 2-3 things users actually do most',
        'Backend and App Store/Play Store submission handled end-to-end',
      ],
      ctaLabel: 'See our app development approach',
      ctaHref: '/services/mobile-app-development',
    },
  },
  {
    test: /\b(chatbot|chat bot|support bot|whatsapp bot)\b/i,
    answer: {
      summary: 'A chatbot trained on your own content — here\'s how we\'d build it:',
      points: [
        'Trained on your actual services, FAQs, and policies — not generic scripts',
        'Deployed on your site, WhatsApp, or Slack',
        'Hands off to your team the moment a conversation needs a human',
      ],
      ctaLabel: 'See our AI chatbot approach',
      ctaHref: '/services/ai-chatbots',
    },
  },
  {
    test: /\b(ai|automat|agent|workflow)\b/i,
    answer: {
      summary: 'AI automation for your business — here\'s where that usually starts:',
      points: [
        'Map the multi-step task you want handled, not just a single question',
        'Connect it to the tools/data you already use',
        'Human-in-the-loop checkpoints wherever oversight actually matters',
      ],
      ctaLabel: 'See our AI development approach',
      ctaHref: '/services/ai-development',
    },
  },
  {
    test: /\b(market|ads|advertis|social media|ppc|campaign)\b/i,
    answer: {
      summary: 'Marketing that\'s meant to convert, not just impress — here\'s the framework:',
      points: [
        'Google/Meta campaigns targeted to your actual buyers, not broad reach',
        'Landing pages built to convert that specific traffic',
        'Transparent, full-funnel attribution reporting',
      ],
      ctaLabel: 'See our marketing approach',
      ctaHref: '/services/digital-marketing',
    },
  },
  {
    test: /\b(website|web ?site|redesign|landing page)\b/i,
    answer: {
      summary: 'A new or redesigned website — here\'s our starting checklist:',
      points: [
        'Sub-2s load times as a hard requirement, not an afterthought',
        'Mobile-first design and an SEO-ready foundation from day one',
        'A build in Next.js, React, and TypeScript for speed and reliability',
      ],
      ctaLabel: 'See our web development approach',
      ctaHref: '/services/web-development',
    },
  },
]

const fallback: Answer = {
  summary: 'Here\'s a starting point based on what most businesses ask us first:',
  points: [
    'SEO and GEO to get found in Google and AI search',
    'A fast, modern website or app as the foundation',
    'AI development to automate the repetitive parts of your workflow',
  ],
  ctaLabel: 'Explore all services',
  ctaHref: '/services',
}

const suggestions = [
  'How can AI help my e-commerce store?',
  'Do I need SEO or GEO?',
  'Should I build a mobile app?',
  'How do I get an AI chatbot on WhatsApp?',
]

function matchAnswer(query: string): Answer {
  const rule = rules.find((r) => r.test.test(query))
  return rule ? rule.answer : fallback
}

export default function AIPlayground() {
  const [query, setQuery] = useState('')
  const [thinking, setThinking] = useState(false)
  const [answer, setAnswer] = useState<Answer | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const ask = (q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    setThinking(true)
    setAnswer(null)
    trackEvent('ai_playground_used')
    const delay = prefersReducedMotion ? 150 : 700
    setTimeout(() => {
      setAnswer(matchAnswer(trimmed))
      setThinking(false)
    }, delay)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(query)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="orb orb-cyan absolute top-0 right-1/4 w-[500px] h-[500px] opacity-15" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <div className="section-tag mx-auto inline-flex">
            <Bot size={12} />
            AI Playground &middot; Preview
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4">
            Ask <span className="gradient-text">Aiventra</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tell us what you&apos;re trying to solve — get a preview of how we&apos;d approach it.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card p-6 sm:p-8 gradient-border">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-5">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. How can AI help my business?"
                aria-label="Ask Aiventra"
                className="form-input flex-1"
              />
              <MagneticSubmitButton
                type="submit"
                disabled={thinking || !query.trim()}
                className="btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Ask</span>
                <Send size={15} />
              </MagneticSubmitButton>
            </form>

            <div className="flex flex-wrap gap-2 mb-6">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setQuery(s); ask(s) }}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs hover:border-primary/40 hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {thinking && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-slate-400 text-sm py-4"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary-light animate-bounce-subtle"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  Sketching an approach...
                </motion.div>
              )}

              {!thinking && answer && (
                <motion.div
                  key="answer"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.4 }}
                  className="border-t border-white/10 pt-6"
                >
                  <p className="text-white font-medium mb-4 flex items-start gap-2">
                    <Sparkles size={16} className="text-primary-light flex-shrink-0 mt-0.5" />
                    {answer.summary}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {answer.points.map((p) => (
                      <li key={p} className="text-slate-400 text-sm leading-relaxed pl-4 relative">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={answer.ctaHref} className="btn-secondary text-sm inline-flex">
                    {answer.ctaLabel}
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-slate-600 text-xs mt-6 pt-4 border-t border-white/5">
              This is a curated preview, not a live AI connection — real strategy takes a real conversation.{' '}
              <Link href="/contact" className="text-slate-400 hover:text-primary-light underline underline-offset-2">
                Book a free consultation
              </Link>{' '}
              for that.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
