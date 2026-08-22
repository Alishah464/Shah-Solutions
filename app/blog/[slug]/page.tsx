import type { Metadata } from 'next'
import type { ComponentProps, ReactElement } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight, Calendar, BookOpen, Briefcase } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'
import { getAllArticles, getArticleBySlug, ARTICLE_SERVICE_LINK, CATEGORY_SLUGS } from '@/lib/blog'
import { SITE_URL as BASE } from '@/lib/seo'

// Source MDX bodies inconsistently use `#` for section headings instead of
// `##`. The page renders its own single <h1> from the title, so every
// heading found in the body is demoted one level here.
const mdxComponents = {
  h1: (props: ComponentProps<'h2'>) => <h2 {...props} />,
  h2: (props: ComponentProps<'h3'>) => <h3 {...props} />,
  h3: (props: ComponentProps<'h4'>) => <h4 {...props} />,
  h4: (props: ComponentProps<'h5'>) => <h5 {...props} />,
  h5: (props: ComponentProps<'h6'>) => <h6 {...props} />,
  h6: (props: ComponentProps<'h6'>) => <h6 {...props} />,
}

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  const ogImage = [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: article.title }]
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: ['Aiventra Labs'],
      tags: [article.category],
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ogImage,
    },
  }
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const all = getAllArticles()
  const sameCategory = all.filter(a => a.slug !== slug && a.category === article.category)
  const others = all.filter(a => a.slug !== slug && a.category !== article.category)
  const related = [...sameCategory, ...others].slice(0, 3)
  const serviceLink = ARTICLE_SERVICE_LINK[slug]

  const { default: ArticleBody } = (await import(`@/content/blog/${slug}.mdx`)) as {
    default: (props: { components?: typeof mdxComponents }) => ReactElement
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
          { '@type': 'ListItem', position: 3, name: article.category, item: `${BASE}/blog/category/${CATEGORY_SLUGS[article.category]}` },
          { '@type': 'ListItem', position: 4, name: article.title, item: `${BASE}/blog/${slug}` },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${BASE}/blog/${slug}#article`,
        headline: article.title,
        description: article.description,
        image: `${BASE}/opengraph-image`,
        url: `${BASE}/blog/${slug}`,
        datePublished: article.date,
        dateModified: article.date,
        articleSection: article.category,
        author: { '@id': `${BASE}/#organization` },
        publisher: { '@id': `${BASE}/#organization` },
        mainEntityOfPage: `${BASE}/blog/${slug}`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="relative pt-40 pb-24">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="orb orb-purple absolute top-10 -left-32 w-[500px] h-[500px] opacity-15" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-primary-light transition-colors">Home</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <Link href="/blog" className="hover:text-primary-light transition-colors">Blog</Link>
              <ChevronRight size={13} className="text-slate-600" />
              <Link href={`/blog/category/${CATEGORY_SLUGS[article.category]}`} className="hover:text-primary-light transition-colors">{article.category}</Link>
            </nav>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-white mb-5 leading-tight text-balance">
              {article.title}
            </h1>

            <div className="flex items-center gap-2 text-slate-400 text-sm mb-10">
              <Calendar size={14} />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="mx-1">·</span>
              <span>Aiventra Labs</span>
              <span className="mx-1">·</span>
              <Link
                href={`/blog/category/${CATEGORY_SLUGS[article.category]}`}
                className="px-2 py-0.5 rounded-full bg-primary/10 text-primary-light text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                {article.category}
              </Link>
            </div>

            <div className="article-body">
              <ArticleBody components={mdxComponents} />
            </div>

            {serviceLink && (
              <Link
                href={serviceLink.href}
                className="inline-flex items-center gap-2 mt-8 text-sm text-primary-light hover:text-white transition-colors"
              >
                <Briefcase size={14} />
                See our {serviceLink.label} service
                <ArrowRight size={14} />
              </Link>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-card p-6 sm:p-8 mt-14 border border-primary/20 text-center">
              <h2 className="font-display font-bold text-white text-xl mb-3">Want this done for your business?</h2>
              <p className="text-slate-400 text-sm mb-6 max-w-lg mx-auto">
                Aiventra Labs builds SEO, GEO, and AI-search strategy into every project. Book a free 30-minute
                consultation and we&apos;ll show you exactly where you stand.
              </p>
              <MagneticButton href="/book" className="btn-primary inline-flex text-sm">
                <span>Book a Free Consultation</span>
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </ScrollReveal>

          {related.length > 0 && (
            <ScrollReveal delay={0.15}>
              <div className="mt-14">
                <h2 className="font-display font-bold text-white text-lg mb-5">More from our blog</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map(a => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className="glass-card glass-card-hover p-5 group"
                    >
                      <BookOpen size={16} className="text-primary mb-3" />
                      <h3 className="font-semibold text-white text-sm leading-snug group-hover:text-primary-light transition-colors">
                        {a.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </article>
    </>
  )
}
