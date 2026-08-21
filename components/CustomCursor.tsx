'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/** Desktop-only glowing cursor with a hover state — hidden on touch devices
 * and whenever the user has requested reduced motion. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 })
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 })

  useEffect(() => {
    if (prefersReducedMotion) return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFinePointer)
    if (!isFinePointer) return

    document.body.classList.add('custom-cursor-active')

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-cursor]'))
      const textEl = target.closest('[data-cursor-text]') as HTMLElement | null
      setLabel(textEl?.dataset.cursorText ?? '')
    }
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [prefersReducedMotion, cursorX, cursorY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white"
        style={{ x: cursorX, y: cursorY, width: 8, height: 8, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary-light flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 64 : 36, height: hovering ? 64 : 36 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white">{label}</span>
        )}
      </motion.div>
    </>
  )
}
