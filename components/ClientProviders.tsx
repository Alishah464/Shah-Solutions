'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const ProtectionScript = dynamic(() => import('@/components/ProtectionScript'), { ssr: false })
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false })

export default function ClientProviders() {
  return (
    <>
      <CustomCursor />
      <ProtectionScript />
      <ParticleBackground />
    </>
  )
}
