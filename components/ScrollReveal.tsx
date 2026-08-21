'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}: ScrollRevealProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: once })
  const prefersReducedMotion = useReducedMotion()

  // `initial` must stay identical between server and client's first render —
  // useReducedMotion() resolves synchronously on the client (unlike SSR,
  // where it's always null/false), so branching this value on it causes a
  // hydration mismatch. Reduced motion is instead accommodated by making the
  // transition to `animate` fast enough to be imperceptible.
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, delay: prefersReducedMotion ? 0 : delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
