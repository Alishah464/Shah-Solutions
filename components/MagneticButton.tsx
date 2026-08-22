'use client'

import { useEffect, useRef, useState, type ReactNode, type MouseEvent, type ButtonHTMLAttributes } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

interface MagneticWrapperProps {
  children: ReactNode
  strength?: number
  disabled?: boolean
  wrapperClassName?: string
}

/** Shared cursor-follow wrapper — disabled on touch devices and when the
 * user has requested reduced motion. Houses either a Link or a <button>. */
function MagneticWrapper({ children, strength = 0.25, disabled = false, wrapperClassName = 'inline-block' }: MagneticWrapperProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setEnabled(!prefersReducedMotion && !disabled && window.matchMedia('(pointer: fine)').matches)
  }, [prefersReducedMotion, disabled])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={wrapperRef}
      className={wrapperClassName}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

interface MagneticButtonProps {
  href: string
  className?: string
  children: ReactNode
  strength?: number
  target?: string
  rel?: string
  onClick?: () => void
}

/** Link version — for navigation CTAs. */
export default function MagneticButton({ href, className, children, strength, target, rel, onClick }: MagneticButtonProps) {
  return (
    <MagneticWrapper strength={strength}>
      <Link href={href} className={className} target={target} rel={rel} onClick={onClick}>
        {children}
      </Link>
    </MagneticWrapper>
  )
}

interface MagneticSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  strength?: number
  wrapperClassName?: string
}

/** <button> version — for form submits and other non-navigation actions. */
export function MagneticSubmitButton({ children, strength, disabled, className, wrapperClassName, ...rest }: MagneticSubmitButtonProps) {
  return (
    <MagneticWrapper strength={strength} disabled={disabled} wrapperClassName={wrapperClassName}>
      <button className={className} disabled={disabled} {...rest}>
        {children}
      </button>
    </MagneticWrapper>
  )
}
