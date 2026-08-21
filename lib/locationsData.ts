export interface City {
  slug: string
  name: string
  blurb: string
}

export const cities: City[] = [
  {
    slug: 'pakistan',
    name: 'Pakistan',
    blurb: 'We work remote-first with businesses across Pakistan — from Karachi and Lahore to Islamabad and beyond — competing for the same search terms as bigger, better-funded competitors.',
  },
]

export interface ServiceOffering {
  key: string
  slugPrefix: string
  label: string
  servicePageHref: string
  pitch: string
  deliverables: string[]
}

export const serviceOfferings: ServiceOffering[] = [
  {
    key: 'seo',
    slugPrefix: 'seo-company',
    label: 'SEO Company',
    servicePageHref: '/services/seo',
    pitch: 'We help local businesses rank for the searches that actually drive customers — technical SEO, local citation building, Google Business Profile optimization, and content built around how people in your city actually search.',
    deliverables: [
      'Local technical SEO audit and fixes',
      'Google Business Profile optimization for local pack rankings',
      'City and neighborhood-level keyword targeting',
      'Monthly ranking and traffic reporting',
    ],
  },
  {
    key: 'web-development',
    slugPrefix: 'web-development-company',
    label: 'Web Development Company',
    servicePageHref: '/services/web-development',
    pitch: 'We design and build fast, modern websites for local businesses — built with Next.js for sub-2-second load times, mobile-first design, and a foundation that\'s SEO-ready from day one.',
    deliverables: [
      'Custom website design and development',
      'Mobile-first, sub-2s-load-time builds',
      'E-commerce and web application development',
      '30 days of free post-launch support',
    ],
  },
  {
    key: 'digital-marketing',
    slugPrefix: 'digital-marketing-agency',
    label: 'Digital Marketing Agency',
    servicePageHref: '/services/digital-marketing',
    pitch: 'Full-funnel digital marketing for local businesses — Google and Meta ads targeted to your city, social media management, and email campaigns that turn local attention into paying customers.',
    deliverables: [
      'Google & Meta PPC campaigns geo-targeted to your city',
      'Social media management and content',
      'Email marketing automation',
      'Transparent monthly performance reporting',
    ],
  },
]

export interface LocationPage {
  slug: string
  city: City
  offering: ServiceOffering
}

export const locationPages: LocationPage[] = cities.flatMap(city =>
  serviceOfferings.map(offering => ({
    slug: `${offering.slugPrefix}-${city.slug}`,
    city,
    offering,
  }))
)

export function getLocationPageBySlug(slug: string): LocationPage | undefined {
  return locationPages.find(l => l.slug === slug)
}
