import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import CommandPalette from '@/components/CommandPalette'
import PageTransition from '@/components/PageTransition'
import { SITE_URL } from '@/lib/site'
import { inter, syne, jetbrainsMono } from './fonts'

export const metadata: Metadata = {
  title: {
    default: 'Aiventra Labs — SEO, GEO, Web, App & AI Services',
    template: '%s | Aiventra Labs',
  },
  description:
    'Aiventra Labs delivers SEO, GEO, web & app development, and AI development (agents and chatbots) for businesses worldwide — based in Pakistan.',
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
    'Aiventra Labs',
    'IT company Pakistan',
    'best IT company Pakistan',
    'website design Pakistan',
    'mobile app development Pakistan',
    'generative engine optimization',
    'AI SEO services',
    'e-commerce development Pakistan',
    'AI agent development',
    'AI chatbot development',
    'AI development company Pakistan',
  ],
  authors: [{ name: 'Aiventra Labs', url: process.env.NEXT_PUBLIC_SITE_URL }],
  creator: 'Aiventra Labs',
  publisher: 'Aiventra Labs',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Aiventra Labs',
    title: 'Aiventra Labs — SEO, GEO, Web, App & AI Services',
    description:
      'AI, software, and digital growth: SEO, GEO, web & app development, and AI development. Transforming businesses worldwide.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Aiventra Labs — SEO, GEO, Web, App & AI Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aiventra Labs — SEO, GEO, Web, App & AI Services',
    description:
      'AI, software, and digital growth: SEO, GEO, web & app development, AI agents, AI chatbots & digital marketing.',
    images: ['/opengraph-image'],
    creator: '@aiventralabs',
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
  verification: {
    google: 'k88qfXOQrT6FoieJEIDxeKfkWOxrbUsfGIRsSBo9esY',
  },
}

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  colorScheme: 'dark',
}

const BASE = SITE_URL

const siteSchemas = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'Aiventra Labs',
      url: BASE,
      logo: {
        '@type': 'ImageObject',
        '@id': `${BASE}/#logo`,
        url: `${BASE}/favicon.svg`,
        contentUrl: `${BASE}/favicon.svg`,
        width: 512,
        height: 512,
        caption: 'Aiventra Labs',
      },
      image: `${BASE}/opengraph-image`,
      description: 'Aiventra Labs is an AI, software, and digital growth company providing SEO optimization, GEO/AI search optimization, custom web development, mobile app development, digital marketing, AI agents, and AI chatbots to businesses worldwide.',
      telephone: '+92-303-2818320',
      email: 'amaherwani@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PK',
        addressLocality: 'Pakistan',
      },
      areaServed: 'Worldwide',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+92-303-2818320',
          contactType: 'customer service',
          email: 'amaherwani@gmail.com',
          availableLanguage: ['English', 'Urdu'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '20:00',
          },
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'amaherwani@gmail.com',
          availableLanguage: ['English', 'Urdu'],
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services Catalog',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimization', description: 'Technical SEO, keyword research, link building, and on-page optimization to rank higher on Google and Bing.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEO / AI Search Optimization', description: 'Generative Engine Optimization — get cited in ChatGPT, Google AI Overviews, Perplexity, and AI-powered search.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', description: 'Custom websites and web applications using Next.js, React, and TypeScript.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development', description: 'Native iOS and Android apps and cross-platform Flutter/React Native applications.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing', description: 'Full-funnel marketing: PPC ads, social media management, email campaigns, and conversion optimization.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Development', description: 'Custom autonomous AI agents that plan and take action across your tools and data, with human-in-the-loop controls.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Chatbots', description: 'Custom AI chatbots trained on your business content, deployable on web, WhatsApp, or Slack.' } },
        ],
      },
      knowsAbout: [
        'Search Engine Optimization', 'Generative Engine Optimization', 'AI Search Optimization',
        'Answer Engine Optimization', 'Google AI Overviews', 'Core Web Vitals', 'Technical SEO',
        'Semantic Search', 'Entity Optimization', 'Structured Data', 'Schema.org',
        'Web Development', 'Next.js', 'React', 'TypeScript',
        'Mobile App Development', 'Flutter', 'React Native',
        'Digital Marketing', 'PPC Advertising', 'Social Media Marketing',
        'Zero-click Optimization', 'Multimodal Search',
        'AI Agent Development', 'AI Chatbot Development', 'Conversational AI', 'Large Language Models',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      name: 'Aiventra Labs',
      url: BASE,
      description: 'AI, software, and digital growth: SEO, GEO/AI Search Optimization, Web Development, Mobile App Development, AI Development, and Digital Marketing.',
      publisher: { '@id': `${BASE}/#organization` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/services#{search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${BASE}/#business`,
      name: 'Aiventra Labs',
      description: 'Aiventra Labs provides SEO optimization, GEO/AI search optimization, custom web development, mobile app development, digital marketing, AI agents, and AI chatbots.',
      url: BASE,
      telephone: '+92-303-2818320',
      email: 'amaherwani@gmail.com',
      priceRange: '$$-$$$',
      currenciesAccepted: 'USD, PKR',
      paymentAccepted: 'Bank Transfer, PayPal, Wise',
      address: { '@type': 'PostalAddress', addressCountry: 'PK', addressLocality: 'Pakistan' },
      areaServed: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'AdministrativeArea', name: 'Worldwide' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      serviceType: [
        'SEO Optimization', 'Generative Engine Optimization', 'AI Search Optimization',
        'Web Development', 'Mobile App Development', 'Digital Marketing', 'IT Consulting',
        'AI Agent Development', 'AI Chatbot Development',
      ],
      parentOrganization: { '@id': `${BASE}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-58F9JKWW');` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemas) }}
        />
      </head>
      <body className="bg-dark text-white antialiased noise-overlay">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-58F9JKWW" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-8EQ10MNNGP" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8EQ10MNNGP');
        `}</Script>
        <CustomCursor />
        <CommandPalette />
        <Navbar />
        <main className="relative z-10 overflow-x-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
