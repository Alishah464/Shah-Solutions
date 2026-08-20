import {
  ShoppingCart, Boxes, Building2, HeartPulse, GraduationCap,
  type LucideIcon,
} from 'lucide-react'

export interface Industry {
  slug: string
  title: string
  icon: LucideIcon
  tagline: string
  intro: string
  painPoints: string[]
  solutions: { title: string; desc: string; serviceHref: string }[]
  faqs: { q: string; a: string }[]
}

export const industries: Industry[] = [
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    icon: ShoppingCart,
    tagline: 'Turn Browsers Into Buyers.',
    intro:
      'Online stores live or die on speed, trust, and findability. We build and grow e-commerce sites that load fast, rank for buyer-intent keywords, and convert at every stage of the funnel — from product page to checkout.',
    painPoints: [
      'Slow product pages that lose mobile shoppers before they scroll',
      'Cart abandonment with no recovery flow in place',
      'Product pages that don\'t rank for the exact terms buyers search',
      'Platform lock-in making simple changes expensive and slow',
    ],
    solutions: [
      { title: 'SEO for Product & Category Pages', desc: 'Keyword-mapped product and category pages, structured data (Product, Offer, Review schema), and technical fixes that get you found by ready-to-buy searchers.', serviceHref: '/services/seo' },
      { title: 'High-Converting Storefronts', desc: 'Next.js storefronts with sub-2s load times, optimized checkout flows, and mobile-first design that turns traffic into revenue.', serviceHref: '/services/web-development' },
      { title: 'Retargeting & Email Automation', desc: 'Abandoned-cart recovery sequences, PPC retargeting, and lifecycle email campaigns that bring shoppers back.', serviceHref: '/services/digital-marketing' },
    ],
    faqs: [
      { q: 'Can you migrate our existing store without losing SEO rankings?', a: 'Yes. We handle platform migrations with a full 301 redirect map, preserved URL structure where possible, and post-migration monitoring to catch ranking drops early.' },
      { q: 'Do you work with Shopify, WooCommerce, or custom builds?', a: 'We build custom Next.js storefronts for full control and performance, and also work within Shopify and WooCommerce when that\'s the right fit for your team and budget.' },
      { q: 'How long until we see SEO results for product pages?', a: 'Technical fixes and indexing improvements often show within weeks. Meaningful ranking movement for competitive product terms typically takes 3–6 months of sustained work.' },
    ],
  },
  {
    slug: 'saas',
    title: 'SaaS',
    icon: Boxes,
    tagline: 'Content and Product That Sell Themselves.',
    intro:
      'SaaS growth depends on being found by the right searchers at the right stage — comparison shoppers, problem-aware researchers, and free-trial-ready buyers. We build marketing sites and content systems that capture all three.',
    painPoints: [
      'A marketing site that doesn\'t explain the product fast enough to keep visitors',
      'No content strategy targeting comparison and "alternative to" searches',
      'Free trial signups that don\'t translate into activated, paying users',
      'Documentation and landing pages that AI search tools never cite',
    ],
    solutions: [
      { title: 'Conversion-Focused Marketing Sites', desc: 'Fast, clear marketing sites built in Next.js — feature pages, pricing pages, and comparison pages engineered to move visitors toward a trial or demo.', serviceHref: '/services/web-development' },
      { title: 'GEO for AI-Era Discovery', desc: 'Structured content and E-E-A-T signals that get your product mentioned when someone asks ChatGPT or Perplexity for tool recommendations in your category.', serviceHref: '/services/geo' },
      { title: 'Content & SEO for the Full Funnel', desc: 'Comparison pages, integration pages, and use-case content mapped to buyer-journey keywords — not just top-of-funnel blog posts.', serviceHref: '/services/seo' },
    ],
    faqs: [
      { q: 'Do you build product marketing sites, or just the app itself?', a: 'We focus on the marketing site, landing pages, and content layer — the part that drives signups and search visibility. We also build full web applications when a project needs one.' },
      { q: 'Can you help us compete with bigger, better-funded competitors on SEO?', a: 'Yes — through comparison and alternative-to pages, integration pages, and long-tail use-case content that larger competitors often neglect while chasing head terms.' },
      { q: 'What is GEO and why does it matter for SaaS specifically?', a: 'Buyers increasingly ask AI tools "what\'s the best software for X" before ever hitting Google. GEO is how you make sure your product is the one that gets named in that answer.' },
    ],
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    icon: Building2,
    tagline: 'Get Found by Buyers, Sellers & Renters.',
    intro:
      'Real estate is one of the most local-search-driven industries there is. We build listing sites and local SEO strategies that put your agency in front of people searching for properties in your specific market.',
    painPoints: [
      'Losing local search visibility to bigger portals like Zillow or Zameen',
      'Listing pages that aren\'t indexed or don\'t rank for neighborhood-specific searches',
      'No system for capturing and following up with website leads',
      'A slow, outdated site that undermines trust with high-value buyers',
    ],
    solutions: [
      { title: 'Local SEO & Google Business Optimization', desc: 'Neighborhood and city-level SEO, Google Business Profile optimization, and local citation building to dominate "real estate agent near me" and city-specific searches.', serviceHref: '/services/seo' },
      { title: 'Listing Sites That Convert', desc: 'Fast, searchable property listing sites with lead-capture forms on every listing, built to make browsing effortless on mobile.', serviceHref: '/services/web-development' },
      { title: 'AI Chatbot for Instant Inquiries', desc: 'A chatbot trained on your listings and FAQs that answers buyer questions instantly and captures leads outside business hours.', serviceHref: '/services/ai-chatbots' },
    ],
    faqs: [
      { q: 'Can you help us rank for specific neighborhoods or cities?', a: 'Yes. Local GEO and SEO targeting by city and neighborhood is one of the highest-leverage things we do for real estate clients — it\'s how independent agencies compete with large portals.' },
      { q: 'Do you integrate with our existing MLS or listing feed?', a: 'Yes, we integrate with standard MLS/listing feeds and property data APIs so your site stays current without manual re-entry.' },
      { q: 'How do you handle lead capture from property listings?', a: 'Every listing page includes an inquiry form that routes directly to your team via email, with optional chatbot-based capture for after-hours inquiries.' },
    ],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: HeartPulse,
    tagline: 'Trustworthy, Compliant, Easy to Find.',
    intro:
      'Healthcare searches are high-stakes and trust-sensitive — for patients and for Google\'s E-E-A-T standards. We build clean, fast, accessible sites and content that earn both patient trust and search visibility.',
    painPoints: [
      'Content that doesn\'t meet the E-E-A-T bar Google holds health sites to',
      'Appointment booking friction that costs patient conversions',
      'Low visibility for "near me" and condition-specific local searches',
      'Accessibility gaps that exclude patients and risk compliance issues',
    ],
    solutions: [
      { title: 'E-E-A-T-Focused Content & SEO', desc: 'Author credentials, medically accurate content structure, and technical SEO built around the standards Google and AI search hold healthcare content to.', serviceHref: '/services/seo' },
      { title: 'Accessible, Fast Patient-Facing Sites', desc: 'WCAG-conscious, mobile-first websites with clear appointment booking paths and fast load times, built with Next.js.', serviceHref: '/services/web-development' },
      { title: 'Local Search for Clinics & Practices', desc: 'Google Business Profile optimization and local SEO for "near me" and condition-specific searches across every location you serve.', serviceHref: '/services/geo' },
    ],
    faqs: [
      { q: 'Do you understand the compliance considerations for healthcare marketing?', a: 'We build the technical and content foundation — structure, accessibility, and E-E-A-T signals. We work alongside your compliance team on anything requiring clinical or regulatory sign-off.' },
      { q: 'Can you help a multi-location clinic rank in every city it serves?', a: 'Yes — dedicated, genuinely differentiated location pages per clinic site, paired with local Google Business optimization, are exactly the kind of work we do for multi-location healthcare clients.' },
      { q: 'Do you build patient intake or appointment booking integrations?', a: 'We build the website and booking-flow UX, and integrate with the scheduling or EHR system your practice already uses.' },
    ],
  },
  {
    slug: 'education',
    title: 'Education',
    icon: GraduationCap,
    tagline: 'Help Students Find and Choose You.',
    intro:
      'From schools to online course platforms, education is a research-heavy, comparison-driven category. We build sites and content strategies that help prospective students and parents find you — and enroll.',
    painPoints: [
      'Admissions pages that don\'t answer the questions prospective students actually search for',
      'Low visibility against larger institutions and course marketplaces',
      'A slow, dated site that undermines credibility with prospective families',
      'No content strategy for program-specific and "near me" searches',
    ],
    solutions: [
      { title: 'SEO for Programs & Admissions', desc: 'Program-level and location-level SEO so each course, degree, or campus has content that ranks for what prospective students actually search.', serviceHref: '/services/seo' },
      { title: 'Fast, Modern Institutional Websites', desc: 'Clean, fast websites with clear admissions paths, built to convert prospective-student research into applications.', serviceHref: '/services/web-development' },
      { title: 'AI Chatbot for Admissions Questions', desc: 'A chatbot trained on your programs, fees, and admissions process to answer common questions instantly and capture inquiry details.', serviceHref: '/services/ai-chatbots' },
    ],
    faqs: [
      { q: 'Can you build separate pages for each program or campus?', a: 'Yes — dedicated, uniquely written pages per program or campus are exactly what performs best for education SEO, rather than one generic admissions page trying to rank for everything.' },
      { q: 'Do you work with schools, universities, and online course platforms?', a: 'Yes, across all three — the content and SEO approach differs slightly by type, but the underlying principle (answer real prospective-student questions, per program/location) stays the same.' },
      { q: 'How do you help us compete with larger, better-known institutions?', a: 'Through specific, well-optimized program and location pages that larger institutions often leave thin — long-tail relevance beats generic authority for these searches.' },
    ],
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug)
}
