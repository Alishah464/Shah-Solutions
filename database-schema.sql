-- Run this in your Neon SQL Editor after creating the project
-- neon.tech -> your project -> SQL Editor -> paste & run

CREATE TABLE IF NOT EXISTS bookings (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  service     TEXT        NOT NULL,
  message     TEXT,
  date        DATE        NOT NULL,
  time_slot   TEXT        NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at  TIMESTAMPTZ DEFAULT now(),

  -- This constraint is what prevents clashes at the database level.
  -- Even if two people submit at the exact same millisecond, the DB
  -- will reject the second insert with a unique violation error.
  CONSTRAINT no_slot_clash UNIQUE (date, time_slot)
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings (created_at DESC);
