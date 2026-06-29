import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { ALL_SLOTS, isWeekday, isPastDate } from '@/lib/timeSlots'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')

  if (!date || !isWeekday(date) || isPastDate(date)) {
    return NextResponse.json({ available: [] })
  }

  try {
    const db = getSql()
    const rows = await db`
      SELECT time_slot FROM bookings
      WHERE date = ${date}
        AND status != 'cancelled'
    `
    const booked = new Set(rows.map((r) => r.time_slot as string))
    const available = ALL_SLOTS.filter((s) => !booked.has(s))
    return NextResponse.json({ available, booked: [...booked] })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
