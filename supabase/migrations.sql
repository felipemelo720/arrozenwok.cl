-- Run this in Supabase SQL editor

-- 1. Add delivery toggle to store_status
ALTER TABLE store_status
  ADD COLUMN IF NOT EXISTS delivery_enabled boolean NOT NULL DEFAULT true;

-- 2. Events table for analytics
CREATE TABLE IF NOT EXISTS events (
  id        bigserial PRIMARY KEY,
  type      text        NOT NULL,
  metadata  jsonb       NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS events_type_created ON events (type, created_at DESC);

-- 3. Unavailable menu items
ALTER TABLE store_status
  ADD COLUMN IF NOT EXISTS unavailable_items text[] NOT NULL DEFAULT '{}';
