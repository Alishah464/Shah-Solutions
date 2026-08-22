import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="orb orb-purple absolute top-1/4 -left-32 w-[500px] h-[500px] opacity-20 animate-float" />
      <div className="orb orb-blue absolute bottom-1/4 -right-32 w-[400px] h-[400px] opacity-15 animate-float-delay" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="section-tag mx-auto inline-flex mb-6">
          <Search size={12} />
          404
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl text-white mb-4 leading-tight">
          Signal <span className="gradient-text-animate">Lost</span>
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist, or it moved somewhere we haven&apos;t mapped yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary text-base px-8 py-4">
            <Home size={16} />
            <span>Return Home</span>
          </Link>
          <Link href="/services" className="btn-secondary text-base px-8 py-4">
            Explore Services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
