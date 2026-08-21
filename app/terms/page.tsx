import type { Metadata } from 'next'
import { buildMetadata, buildBreadcrumbSchema, buildSchemaGraph, SITE_URL as BASE } from '@/lib/seo'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Terms of service governing use of the Aiventra Labs website and engagement of Aiventra Labs services.',
  path: '/terms',
})

const schema = buildSchemaGraph([
  buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path: '/terms' },
  ]),
  {
    '@type': 'WebPage',
    '@id': `${BASE}/terms#webpage`,
    url: `${BASE}/terms`,
    name: 'Terms of Service | Aiventra Labs',
    inLanguage: 'en-US',
  },
])

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By using this website, you agree to these terms of service. If you do not agree, please do not use this site.',
    ],
  },
  {
    title: 'Use of This Website',
    body: [
      'The content on this website is provided for general informational purposes about Aiventra Labs and its services. You may not copy, reproduce, or redistribute content from this site without permission, except for personal, non-commercial use.',
    ],
  },
  {
    title: 'Services & Engagements',
    body: [
      'Any specific project — scope, timeline, deliverables, and pricing — is governed by a separate written proposal or agreement between Aiventra Labs and the client, not by this website. Nothing on this website constitutes a binding offer or guarantee of specific results.',
      'Where a service page discusses typical timelines, technologies, or outcomes, this is descriptive of our general approach and is not a guarantee for any individual project.',
    ],
  },
  {
    title: 'No Financial or Investment Advice',
    body: [
      'Any custom software we build, including algorithmic trading software, is a development service only. Nothing on this website or in our services constitutes financial, investment, or trading advice, and we do not guarantee any financial outcome or return.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'Unless otherwise agreed in a project contract, deliverables created for a client become the client\'s property upon full payment. The Aiventra Labs name, logo, and website content remain the property of Aiventra Labs.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'This website and its content are provided "as is" without warranties of any kind. Aiventra Labs is not liable for any indirect, incidental, or consequential damages arising from use of this website.',
    ],
  },
  {
    title: 'Changes to These Terms',
    body: [
      'We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'Questions about these terms can be sent to amaherwani@gmail.com.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
              Terms of <span className="gradient-text-animate">Service</span>
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
