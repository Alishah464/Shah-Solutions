'use client'

import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Search, ArrowRight, Home, Layers, Briefcase, BookOpen, Users, Mail, Calendar,
  Bot, MessageSquare, Code2, Smartphone, TrendingUp, Globe,
  ShoppingCart, Boxes, Building2, HeartPulse,
  type LucideIcon,
} from 'lucide-react'

interface CommandItem {
  label: string
  href: string
  icon: LucideIcon
  group: string
}

const items: CommandItem[] = [
  { label: 'Home', href: '/', icon: Home, group: 'Pages' },
  { label: 'Services', href: '/services', icon: Layers, group: 'Pages' },
  { label: 'Industries', href: '/industries', icon: Briefcase, group: 'Pages' },
  { label: 'Portfolio', href: '/portfolio', icon: Code2, group: 'Pages' },
  { label: 'Blog', href: '/blog', icon: BookOpen, group: 'Pages' },
  { label: 'About', href: '/about', icon: Users, group: 'Pages' },
  { label: 'Contact', href: '/contact', icon: Mail, group: 'Pages' },
  { label: 'Book a Consultation', href: '/book', icon: Calendar, group: 'Pages' },
  { label: 'SEO', href: '/services/seo', icon: Search, group: 'Services' },
  { label: 'GEO / AI Search', href: '/services/geo', icon: Globe, group: 'Services' },
  { label: 'Web Development', href: '/services/web-development', icon: Code2, group: 'Services' },
  { label: 'AI Development', href: '/services/ai-development', icon: Bot, group: 'Services' },
  { label: 'AI Chatbots', href: '/services/ai-chatbots', icon: MessageSquare, group: 'Services' },
  { label: 'Mobile App Development', href: '/services/mobile-app-development', icon: Smartphone, group: 'Services' },
  { label: 'Digital Marketing', href: '/services/digital-marketing', icon: TrendingUp, group: 'Services' },
  { label: 'E-commerce', href: '/industries/ecommerce', icon: ShoppingCart, group: 'Industries' },
  { label: 'SaaS', href: '/industries/saas', icon: Boxes, group: 'Industries' },
  { label: 'Real Estate', href: '/industries/real-estate', icon: Building2, group: 'Industries' },
  { label: 'Healthcare', href: '/industries/healthcare', icon: HeartPulse, group: 'Industries' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q))
  }, [query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape') {
        close()
      }
    }
    const handleCustomOpen = () => setOpen(true)
    window.addEventListener('keydown', handleKey)
    window.addEventListener('open-command-palette', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('open-command-palette', handleCustomOpen)
    }
  }, [close])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => { setActiveIndex(0) }, [query])

  const navigate = (href: string) => {
    close()
    router.push(href)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filtered[activeIndex]
      if (item) navigate(item.href)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
          onClick={close}
        >
          <motion.div
            className="w-full max-w-xl glass-card border border-white/10 overflow-hidden"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search size={18} className="text-slate-400 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search Aiventra Labs..."
                aria-label="Search"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400 text-sm sm:text-base"
              />
              <kbd className="hidden sm:inline text-[10px] px-2 py-1 rounded border border-white/10 text-slate-400">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-center text-slate-400 text-sm py-8">No results for &ldquo;{query}&rdquo;</p>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${
                      i === activeIndex ? 'bg-primary/15 text-white' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} className="flex-shrink-0 text-primary-light" />
                    <span className="flex-1">{item.label}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">{item.group}</span>
                    <ArrowRight size={12} className="text-slate-600" />
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
