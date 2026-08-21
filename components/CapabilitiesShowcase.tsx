'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { serviceCategories } from '@/lib/servicesData'

const PRIMARY_SLUGS = ['seo', 'geo', 'web-development', 'ai-development', 'ai-chatbots', 'mobile-app-development', 'digital-marketing']
const featured = PRIMARY_SLUGS.map((slug) => serviceCategories.find((s) => s.slug === slug)).filter(
  (s): s is (typeof serviceCategories)[number] => Boolean(s)
)

/** Hovering (or tapping) a capability swaps the whole detail panel — icon,
 * description, and real feature list from lib/servicesData — rather than
 * just highlighting a static card. `active` starts at 0 on both server and
 * client, so there's no hydration risk here. */
export default function CapabilitiesShowcase() {
  const [active, setActive] = useState(0)
  const svc = featured[active]
  const Icon = svc.icon

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
        {featured.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`text-left px-5 py-3.5 rounded-xl whitespace-nowrap lg:whitespace-normal transition-colors duration-200 border flex-shrink-0 ${
              active === i
                ? 'bg-primary/15 border-primary/30 text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="glass-card p-8 sm:p-10 gradient-border">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6`}
          style={{ boxShadow: `0 8px 30px ${svc.glowColor}` }}
        >
          <Icon size={30} className="text-white" />
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-3">{svc.title}</h3>
        <p className="text-slate-400 mb-7 leading-relaxed">{svc.longDesc}</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {svc.features.map((f) => {
            const FIcon = f.icon
            return (
              <div key={f.label} className="flex items-center gap-2.5 text-slate-300 text-sm">
                <FIcon size={15} className="text-primary-light flex-shrink-0" />
                {f.label}
              </div>
            )
          })}
        </div>
        <Link href={`/services/${svc.slug}`} className="btn-secondary text-sm inline-flex">
          Explore {svc.title}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
