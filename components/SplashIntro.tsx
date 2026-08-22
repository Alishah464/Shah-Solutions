'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SEEN_KEY = 'aiventra-intro-seen'

/** A brief (~0.8s) logo reveal on first homepage visit per browser session —
 * not on every navigation, not for reduced-motion users, and not on deep
 * links into content pages. `show` starts false on both server and client
 * (nothing renders until a post-mount effect decides to), so there's no
 * hydration risk here. */
export default function SplashIntro() {
  const [show, setShow] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    if (sessionStorage.getItem(SEEN_KEY)) return
    sessionStorage.setItem(SEEN_KEY, '1')
    setShow(true)
    const timer = setTimeout(() => setShow(false), 800)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          data-testid="splash-intro"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight"
          >
            AIVENTRA <span className="gradient-text-animate">LABS</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.25 }}
            className="mt-3 text-xs tracking-[0.3em] text-slate-400 uppercase"
          >
            AI &bull; Software &bull; Digital Growth
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
