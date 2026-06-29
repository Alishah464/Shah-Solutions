import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClientProviders from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: {
    default: 'Shah Solutions — Premium IT Services | SEO, GEO, Web & App Development',
    template: '%s | Shah Solutions',
  },
  description:
    'Shah Solutions delivers expert IT services: SEO optimization, GEO/local SEO, custom web development, mobile app development, digital marketing, and cloud solutions. Serving businesses worldwide from Pakistan.',
  keywords: [
    'IT services Pakistan',
    'SEO services Pakistan',
    'GEO optimization',
    'web development Pakistan',
    'app development Pakistan',
    'digital marketing Pakistan',
    'custom website development',
    'React Next.js developer Pakistan',
    'Flutter app developer',
    'cloud solutions Pakistan',
    'Shah Solutions',
    'IT company Pakistan',
    'best IT company Pakistan',
    'website design Pakistan',
    'mobile app development Pakistan',
    'generative engine optimization',
    'AI SEO services',
    'e-commerce development Pakistan',
  ],
  authors: [{ name: 'Shah Solutions', url: process.env.NEXT_PUBLIC_SITE_URL }],
  creator: 'Shah Solutions',
  publisher: 'Shah Solutions',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shahsolutions.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Shah Solutions',
    title: 'Shah Solutions — Premium IT Services',
    description:
      'Expert IT services: SEO, GEO, Web Development, App Development & Digital Marketing. Transforming businesses worldwide.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Shah Solutions — Premium IT Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shah Solutions — Premium IT Services',
    description:
      'Expert IT services: SEO, GEO, Web Development, App Development & Digital Marketing.',
    images: ['/og-image.svg'],
    creator: '@shahsolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  colorScheme: 'dark',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shah Solutions',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shahsolutions.vercel.app',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shahsolutions.vercel.app'}/favicon.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-303-2818320',
    contactType: 'customer service',
    email: 'amaherwani@gmail.com',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [],
  description:
    'Shah Solutions is a premium IT services company offering SEO, GEO optimization, web development, app development, and digital marketing services worldwide.',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimization' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEO / AI Search Optimization' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Solutions' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark text-white antialiased noise-overlay">
        <ClientProviders />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
