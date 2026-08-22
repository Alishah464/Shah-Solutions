'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Search, FileText, Code2, Rocket, type LucideIcon } from 'lucide-react'

interface Step {
  step: string
  title: string
  desc: string
}

const ICONS: LucideIcon[] = [Search, FileText, Code2, Rocket]

export default function ProcessStoryteller({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const activeIcon = ICONS[active] ?? ICONS[0]
  const activeStep = steps[active] ?? steps[0]
  const ActiveIcon = activeIcon

  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-8 lg:gap-12">
      {/* Sticky visual — desktop only, transforms as you scroll through steps */}
      <div className="hidden lg:block">
        <div className="sticky top-32 glass-card p-10 text-center gradient-border">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
            <ActiveIcon size={36} className="text-white" />
          </div>
          <div className="text-5xl font-display font-black gradient-text mb-2">{activeStep?.step}</div>
          <h3 className="font-display font-bold text-white text-xl mb-3">{activeStep?.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{activeStep?.desc}</p>
        </div>
      </div>

      {/* Step list — each one reports when it's centered in view */}
      <div className="space-y-6">
        {steps.map((s, i) => (
          <StepCard key={s.step} step={s} icon={ICONS[i] ?? ICONS[0]} isActive={active === i} onActive={() => setActive(i)} />
        ))}
      </div>
    </div>
  )
}

function StepCard({
  step,
  icon: Icon,
  isActive,
  onActive,
}: {
  step: Step
  icon: LucideIcon
  isActive: boolean
  onActive: () => void
}) {
  const { ref, inView } = useInView({ threshold: 0.5, rootMargin: '-20% 0px -20% 0px' })

  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])

  return (
    <div
      ref={ref}
      className={`glass-card p-8 relative transition-colors duration-300 ${
        isActive ? 'border-primary/40 bg-primary/5' : ''
      }`}
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 lg:hidden">
          <Icon size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-display font-black text-2xl text-white/40" aria-hidden="true">{step.step}</span>
            <h3 className="font-display font-bold text-white text-lg">{step.title}</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </div>
  )
}
