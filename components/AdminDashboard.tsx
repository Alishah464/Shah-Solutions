'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Mail, Phone, Briefcase, CheckCircle, XCircle, AlertCircle, LogOut, RefreshCw } from 'lucide-react'
import { formatDate, formatSlot } from '@/lib/timeSlots'
import { useRouter } from 'next/navigation'

type Status = 'pending' | 'confirmed' | 'cancelled'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  date: string
  time_slot: string
  status: Status
  created_at: string
}

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   icon: AlertCircle,   color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  confirmed: { label: 'Confirmed', icon: CheckCircle,   color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  cancelled: { label: 'Cancelled', icon: XCircle,       color: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | Status>('all')
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings')
      if (res.status === 401) { router.replace('/admin/login'); return }
      const data = await res.json()
      setBookings(data.bookings ?? [])
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  async function updateStatus(id: string, status: Status) {
    setUpdating(id)
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b))
    } finally {
      setUpdating(null)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)
  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  const today = new Date().toISOString().split('T')[0]
  const todayCount = bookings.filter(b => b.date === today).length

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Consultations</h1>
            <p className="text-gray-500 mt-1">Shah Solutions Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 border border-gray-700 hover:border-red-400/30 rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: counts.all, color: 'text-purple-400' },
            { label: "Today's", value: todayCount, color: 'text-blue-400' },
            { label: 'Pending', value: counts.pending, color: 'text-yellow-400' },
            { label: 'Confirmed', value: counts.confirmed, color: 'text-green-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#12121a] border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-sm">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#12121a] border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? `All (${counts.all})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})`}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading bookings…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No {filter !== 'all' ? filter : ''} bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => {
              const cfg = STATUS_CONFIG[booking.status]
              const StatusIcon = cfg.icon
              const isPast = booking.date < today
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`bg-[#12121a] border rounded-xl p-5 ${isPast ? 'border-gray-800/50 opacity-70' : 'border-gray-800'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    {/* Left: info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white font-semibold text-lg">{booking.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                        {isPast && <span className="text-xs text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded-full">Past</span>}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          {formatSlot(booking.time_slot)} PKT
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                          {booking.service}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          <a href={`mailto:${booking.email}`} className="hover:text-purple-400 transition-colors">
                            {booking.email}
                          </a>
                        </span>
                        {booking.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            <a href={`tel:${booking.phone}`} className="hover:text-purple-400 transition-colors">
                              {booking.phone}
                            </a>
                          </span>
                        )}
                      </div>

                      {booking.message && (
                        <p className="text-gray-600 text-sm italic">"{booking.message}"</p>
                      )}
                    </div>

                    {/* Right: actions */}
                    <div className="flex gap-2 shrink-0">
                      {booking.status !== 'confirmed' && (
                        <button
                          disabled={updating === booking.id}
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          Confirm
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button
                          disabled={updating === booking.id}
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      )}
                      {booking.status !== 'pending' && (
                        <button
                          disabled={updating === booking.id}
                          onClick={() => updateStatus(booking.id, 'pending')}
                          className="px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
