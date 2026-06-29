'use client'

import { useEffect } from 'react'

export default function ProtectionScript() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'K'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S')
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (!['INPUT', 'TEXTAREA'].includes(target.tagName) && !target.isContentEditable) {
        e.preventDefault()
      }
    }

    const handleDragStart = (e: DragEvent) => e.preventDefault()

    // Capture the actual page title set by Next.js metadata before we touch it
    const originalTitle = document.title
    let warningShown = false
    const devtoolsCheck = setInterval(() => {
      const threshold = 160
      const widthDiff = window.outerWidth - window.innerWidth > threshold
      const heightDiff = window.outerHeight - window.innerHeight > threshold
      if ((widthDiff || heightDiff) && !warningShown) {
        warningShown = true
        document.title = '⚠️ Unauthorized Access'
      } else if (!widthDiff && !heightDiff && warningShown) {
        warningShown = false
        document.title = originalTitle
      }
    }, 1000)

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)

    return () => {
      clearInterval(devtoolsCheck)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return null
}
