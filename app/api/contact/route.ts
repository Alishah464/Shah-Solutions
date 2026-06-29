import { NextRequest, NextResponse } from 'next/server'

/* ── In-memory rate limiter ────────────────────────────────────────────────
   5 requests per IP per 60 seconds. Resets per function instance — good
   enough to block automated bursts from a single source on a marketing site. */
const ipMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

/* ── Cloudflare Turnstile verification ──────────────────────────────────── */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret || secret === 'your_turnstile_secret_key') return true // skip in dev

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  })
  const data = await res.json() as { success: boolean }
  return data.success === true
}

/* ── Route handler ──────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    // Resolve real IP (Vercel forwards via x-forwarded-for)
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      '0.0.0.0'

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, email, phone, service, budget, message, turnstileToken } = body

    // Basic field validation
    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Turnstile verification
    if (!turnstileToken) {
      return NextResponse.json({ error: 'Please complete the CAPTCHA.' }, { status: 400 })
    }
    const captchaOk = await verifyTurnstile(turnstileToken, ip)
    if (!captchaOk) {
      return NextResponse.json({ error: 'CAPTCHA verification failed. Please try again.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'amaherwani@gmail.com'

    if (!apiKey || apiKey === 're_placeholder_replace_with_real_key') {
      console.log('=== CONTACT FORM (no Resend key) ===')
      console.log({ name, email, phone, service, budget, message })
      return NextResponse.json({ success: true })
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family:Inter,sans-serif;background:#050510;color:#F8FAFC;padding:40px;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#7C3AED,#2563EB);padding:3px;border-radius:16px;">
            <div style="background:#0A0A1A;border-radius:14px;padding:32px;">
              <h1 style="margin:0 0 24px;font-size:24px;background:linear-gradient(135deg,#7C3AED,#2563EB,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                New Contact from Shah Solutions
              </h1>
              <table style="width:100%;border-collapse:collapse;">
                ${[
                  ['Name', name],
                  ['Email', email],
                  ['Phone', phone || 'Not provided'],
                  ['Service', service],
                  ['Budget', budget || 'Not specified'],
                ].map(([k, v]) => `
                  <tr>
                    <td style="padding:10px 0;color:#94A3B8;font-size:13px;width:120px;vertical-align:top;">${k}</td>
                    <td style="padding:10px 0;color:#F8FAFC;font-size:14px;font-weight:600;">${v}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td style="padding:10px 0;color:#94A3B8;font-size:13px;vertical-align:top;">Message</td>
                  <td style="padding:10px 0;color:#F8FAFC;font-size:14px;white-space:pre-wrap;">${message}</td>
                </tr>
              </table>
              <div style="margin-top:32px;padding:16px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.3);border-radius:12px;">
                <p style="margin:0;color:#94A3B8;font-size:12px;">Reply directly to: <a href="mailto:${email}" style="color:#7C3AED;">${email}</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Shah Solutions <onboarding@resend.dev>',
        to: [toEmail],
        replyTo: email,
        subject: `New Inquiry: ${service} — ${name}`,
        html,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Email failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
