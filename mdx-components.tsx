import type { MDXComponents } from 'mdx/types'

// Required by @next/mdx's default provider import source for the app
// directory. Per-article heading overrides are passed directly via the
// `components` prop where each MDX file is rendered, so this just passes
// the merged component map through unchanged.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components
}
