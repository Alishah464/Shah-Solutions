/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => {
    const isDev = process.env.NODE_ENV === 'development'

    const csp = [
      "default-src 'self'",
      // dev: React needs eval() for callstack reconstruction; prod: strict
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
      // Tailwind inline styles + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Images: allow self, data URIs and blob for canvas/particle
      "img-src 'self' data: blob:",
      // API calls: Resend + Turnstile
      "connect-src 'self' https://api.resend.com https://challenges.cloudflare.com",
      // Turnstile iframe
      "frame-src https://challenges.cloudflare.com",
      // Block all framing of this site
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // only force HTTPS in production — localhost is HTTP
      ...(!isDev ? ["upgrade-insecure-requests"] : []),
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
      // Allow Turnstile iframe to embed without COEP restriction
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
        ],
      },
    ]
  },
}

export default nextConfig
