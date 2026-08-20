import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // remark-frontmatter parses the leading `---` YAML block out of the
    // MDX AST; remark-mdx-frontmatter turns it into `export const frontmatter`
    // so callers can read it without a separate parse pass.
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    // Static export has no server to run Next's Image Optimization API —
    // Cloudflare Pages serves the originals directly instead.
    unoptimized: true,
  },
  // `headers()` isn't honored by `output: 'export'` (no server to run it).
  // The equivalent CSP/security headers live in public/_headers, which
  // Cloudflare Pages applies to the static build automatically.
}

export default withMDX(nextConfig)
