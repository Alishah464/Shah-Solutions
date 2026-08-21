import type { Metadata } from 'next'
import { buildMetadata, buildBreadcrumbSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Aiventra Labs collects, uses, and protects information submitted through this website.',
  path: '/privacy-policy',
})

const schema = buildSchemaGraph([
  buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ]),
  {
    '@type': 'WebPage',
    '@id': `${BASE}/privacy-policy#webpage`,
    url: `${BASE}/privacy-policy`,
    name: 'Privacy Policy | Aiventra Labs',
    inLanguage: 'en-US',
  },
])

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'When you submit a form on this website (contact form, booking request, or newsletter signup), we collect the information you provide directly — such as your name, email address, phone number, company name, and project details.',
      'We also use standard analytics tools that collect anonymized usage data, such as pages visited and general location (country/city level), to understand how visitors use the site.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'We use the information you submit to respond to your inquiry, prepare proposals, and deliver services you request. We do not sell, rent, or trade your personal information to third parties.',
      'We may use your email address to follow up on an inquiry or project. You can ask us to stop contacting you at any time.',
    ],
  },
  {
    title: 'Data Storage & Security',
    body: [
      'Form submissions are transmitted and stored using reputable third-party services (such as our email and form-handling providers). We take reasonable technical measures to protect the information you share with us, but no method of transmission over the internet is 100% secure.',
    ],
  },
  {
    title: 'Cookies & Analytics',
    body: [
      'This site may use cookies and analytics tools to understand aggregate traffic patterns and improve the site. You can disable cookies in your browser settings, though some site features may not function as intended.',
    ],
  },
  {
    title: 'Third-Party Links',
    body: [
      'This site may link to third-party websites (such as social media profiles). We are not responsible for the privacy practices of those external sites.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You may request access to, correction of, or deletion of the personal information you have submitted to us by emailing amaherwani@gmail.com.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'Questions about this privacy policy can be sent to amaherwani@gmail.com.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
              Privacy <span className="gradient-text-animate">Policy</span>
            </h1>
            <p className="text-slate-400">Last updated: August 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.05}>
              <div>
                <h2 className="font-display font-bold text-white text-xl mb-3">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="text-slate-400 leading-relaxed mb-3">{p}</p>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
