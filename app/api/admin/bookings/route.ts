import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const rows = await sql`
      SELECT id, name, email, phone, service, message,
             date::text, time_slot, status, created_at
      FROM bookings
      ORDER BY date ASC, time_slot ASC
    `
    return NextResponse.json({ bookings: rows })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
