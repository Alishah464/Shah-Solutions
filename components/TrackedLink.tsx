'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  eventName: string
  eventParams?: Record<string, unknown>
}

/** A plain <a> that fires a GA4 event on click — for wiring analytics into
 * otherwise-server-rendered pages without converting the whole page to a
 * client component. */
export default function TrackedLink({ children, eventName, eventParams, onClick, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(eventName, eventParams)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
