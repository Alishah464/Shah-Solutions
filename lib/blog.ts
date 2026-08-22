import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type ArticleCategory = 'GEO / AEO' | 'SEO' | 'Web Development' | 'Business'

export const CATEGORY_SLUGS: Record<ArticleCategory, string> = {
  'GEO / AEO': 'geo-aeo',
  'SEO': 'seo',
  'Web Development': 'web-development',
  'Business': 'business',
}

export const CATEGORY_DESCRIPTIONS: Record<ArticleCategory, string> = {
  'GEO / AEO': 'Guides on Generative Engine Optimization and Answer Engine Optimization — getting your brand cited by ChatGPT, Google AI Overviews, Perplexity, and Copilot.',
  'SEO': 'Guides on technical SEO, keyword strategy, and what to actually expect when you hire an SEO service or agency.',
  'Web Development': 'Guides on choosing a web development approach — platforms, pricing models, and developer vs. agency tradeoffs.',
  'Business': 'Guides on evaluating and hiring the right IT partner for your business.',
}

const SLUG_TO_CATEGORY: Record<string, ArticleCategory> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([category, slug]) => [slug, category as ArticleCategory])
)

export function categoryFromSlug(slug: string): ArticleCategory | null {
  return SLUG_TO_CATEGORY[slug] ?? null
}

export interface ArticleMeta {
  slug: string
  title: string
  /** Shorter title for the <title> tag / SERP display. Article `title`s are
   * written to be fully descriptive on-page (H1, blog listing), which often
   * runs well past the ~60 characters Google displays before truncating.
   * Falls back to `title` when not set. */
  seoTitle?: string
  description: string
  date: string
  category: ArticleCategory
}

export type Article = ArticleMeta

/** Reciprocal blog -> service link, sourced from each article's frontmatter. */
export const ARTICLE_SERVICE_LINK: Record<string, { href: string; label: string }> = Object.fromEntries(
  fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')).flatMap(file => {
    const slug = file.replace(/\.mdx$/, '')
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'))
    return data.relatedServiceHref
      ? [[slug, { href: data.relatedServiceHref as string, label: data.relatedServiceLabel as string }]]
      : []
  })
)

function fileToMeta(file: string): ArticleMeta {
  const slug = file.replace(/\.mdx$/, '')
  const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'))
  return {
    slug,
    title: data.title as string,
    seoTitle: data.seoTitle as string | undefined,
    description: data.description as string,
    date: data.date as string,
    category: (data.category as ArticleCategory) ?? 'Business',
  }
}

export function getAllArticles(): ArticleMeta[] {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(fileToMeta)
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  return {
    slug,
    title: data.title as string,
    seoTitle: data.seoTitle as string | undefined,
    description: data.description as string,
    date: data.date as string,
    category: (data.category as ArticleCategory) ?? 'Business',
  }
}
