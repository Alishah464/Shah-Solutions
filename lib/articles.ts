import fs from 'fs'
import path from 'path'
import { marked, type Tokens } from 'marked'

const ARTICLES_DIR = path.join(process.cwd(), 'articles')

// Source articles inconsistently use `#` for section headings instead of `##`.
// The page renders its own single <h1> from the title, so every heading found
// in the body is demoted one level — keeps a valid, single-H1 hierarchy
// regardless of how the source markdown was authored.
marked.use({
  renderer: {
    heading({ tokens, depth }: Tokens.Heading) {
      const level = Math.min(depth + 1, 6)
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`
    },
  },
})

// Verified via `git log --follow --diff-filter=A` — the date every current
// article was actually added to the repo, not a placeholder.
const PUBLISHED_DATE = '2026-07-06'

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
}

export interface Article extends ArticleMeta {
  contentHtml: string
}

function slugToFilePath(slug: string): string {
  return path.join(ARTICLES_DIR, `${slug}.md`)
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .trim()
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

/** Parses `# Title` + the first prose paragraph out of a raw article markdown string. */
function parseMeta(slug: string, raw: string): ArticleMeta {
  const lines = raw.split('\n')
  const titleLine = lines.find(l => l.startsWith('# '))
  const title = titleLine ? stripMarkdown(titleLine.replace(/^#\s+/, '')) : slug

  const afterTitle = lines.slice(lines.indexOf(titleLine ?? '') + 1)
  const firstParagraph = afterTitle.find(l => l.trim() && !l.trim().startsWith('#') && !l.trim().startsWith('---'))
  const description = firstParagraph ? truncate(stripMarkdown(firstParagraph.trim()), 156) : ''

  return { slug, title, description, date: PUBLISHED_DATE }
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8')
      return parseMeta(slug, raw)
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = slugToFilePath(slug)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const meta = parseMeta(slug, raw)

  // Drop the leading `# Title` line — the page renders its own <h1>.
  const body = raw.replace(/^#\s+.*(\r?\n)+/, '')
  const contentHtml = marked.parse(body, { async: false }) as string

  return { ...meta, contentHtml }
}
