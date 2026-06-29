import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isWeekday, isPastDate, ALL_SLOTS, formatDate, formatSlot } from '@/lib/timeSlots'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const rateLimitMap = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || entry.reset < now) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 })
  }

  let body: {
    name?: string; email?: string; phone?: string
    service?: string; message?: string; date?: string; timeSlot?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, phone, service, message, date, timeSlot } = body

  if (!name || !email || !service || !date || !timeSlot) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!isWeekday(date) || isPastDate(date)) {
    return NextResponse.json({ error: 'Invalid date. Only future weekdays are allowed.' }, { status: 400 })
  }

  if (!ALL_SLOTS.includes(timeSlot)) {
    return NextResponse.json({ error: 'Invalid time slot.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  try {
    await sql`
      INSERT INTO bookings (name, email, phone, service, message, date, time_slot)
      VALUES (${name}, ${email}, ${phone ?? ''}, ${service}, ${message ?? ''}, ${date}, ${timeSlot})
    `
  } catch (err: unknown) {
    const pgErr = err as { code?: string }
    if (pgErr?.code === '23505') {
      return NextResponse.json(
        { error: 'That time slot was just taken. Please pick another.' },
        { status: 409 }
      )
    }
    console.error('DB insert error:', err)
    return NextResponse.json({ error: 'Failed to save booking.' }, { status: 500 })
  }

  const formattedDate = formatDate(date)
  const formattedTime = formatSlot(timeSlot)

  await Promise.allSettled([
    resend.emails.send({
      from: 'Shah Solutions <noreply@shahsolutions.com>',
      to: email,
      subject: `Consultation Confirmed — ${formattedDate} at ${formattedTime}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#7c3aed">Your consultation is booked!</h2>
          <p>Hi ${name},</p>
          <p>Your consultation with <strong>Shah Solutions</strong> has been scheduled.</p>
          <table style="border-collapse:collapse;width:100%;margin:20px 0">
            <tr><td style="padding:8px;color:#666;width:120px">Date</td><td style="padding:8px;font-weight:600">${formattedDate}</td></tr>
            <tr><td style="padding:8px;color:#666">Time</td><td style="padding:8px;font-weight:600">${formattedTime} PKT</td></tr>
            <tr><td style="padding:8px;color:#666">Service</td><td style="padding:8px;font-weight:600">${service}</td></tr>
          </table>
          <p>We'll reach out shortly to confirm details. You can also contact us at <a href="tel:03032818320">0303 2818320</a>.</p>
          <p style="color:#666;font-size:13px">Shah Solutions — amaherwani@gmail.com</p>
        </div>
      `,
    }),
    resend.emails.send({
      from: 'Shah Solutions Bookings <noreply@shahsolutions.com>',
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `New Consultation: ${name} — ${formattedDate} ${formattedTime}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#7c3aed">New Consultation Booked</h2>
          <table style="border-collapse:collapse;width:100%;margin:20px 0">
            <tr><td style="padding:8px;color:#666;width:100px">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px">${email}</td></tr>
            <tr><td style="padding:8px;color:#666">Phone</td><td style="padding:8px">${phone ?? 'N/A'}</td></tr>
            <tr><td style="padding:8px;color:#666">Service</td><td style="padding:8px">${service}</td></tr>
            <tr><td style="padding:8px;color:#666">Date</td><td style="padding:8px">${formattedDate}</td></tr>
            <tr><td style="padding:8px;color:#666">Time</td><td style="padding:8px">${formattedTime} PKT</td></tr>
            <tr><td style="padding:8px;color:#666">Message</td><td style="padding:8px">${message ?? 'None'}</td></tr>
          </table>
        </div>
      `,
    }),
  ])

  return NextResponse.json({ success: true })
}
