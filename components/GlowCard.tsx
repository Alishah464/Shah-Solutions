'use client'

import { forwardRef, type MouseEvent, type ReactNode } from 'react'
import Link from 'next/link'

interface GlowCardProps {
  href: string
  className?: string
  children: ReactNode
  cursorText?: string
  style?: React.CSSProperties
}

/** A card-link with a subtle radial gradient that follows the cursor —
 * pure CSS custom properties updated on mousemove, no new dependency.
 * Inert (no-op) on touch, since `:hover` there is unreliable/irrelevant. */
const GlowCard = forwardRef<HTMLAnchorElement, GlowCardProps>(function GlowCard(
  { href, className, children, cursorText, style },
  forwardedRef
) {
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      ref={forwardedRef}
      href={href}
      onMouseMove={handleMouseMove}
      className={`glow-card ${className ?? ''}`}
      data-cursor-text={cursorText}
      style={style}
    >
      <span className="glow-card-overlay" aria-hidden="true" />
      {children}
    </Link>
  )
})

export default GlowCard
