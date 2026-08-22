'use client'

import { useEffect, useState } from 'react'

interface TypedTextProps {
  words: string[]
  speed?: number
  pause?: number
  disabled?: boolean
  className?: string
}

/** Isolated in its own leaf component so the ~50-100ms interval driving the
 * typewriter effect only re-renders this small span, not the entire
 * homepage — that was previously the single largest source of main-thread
 * cost on the page (every keystroke re-ran the whole page's render function). */
export default function TypedText({ words, speed = 100, pause = 2000, disabled = false, className }: TypedTextProps) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (disabled) {
      // Runs post-hydration only, so this never diverges from the SSR
      // markup (which always renders the empty initial state) — avoids a
      // hydration mismatch while still skipping the animation for users
      // who requested reduced motion.
      setText(words[0])
      return
    }
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
  }, [text, isDeleting, wordIndex, words, speed, pause, disabled])

  return <span className={className}>{text}</span>
}
