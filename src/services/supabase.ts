import { createClient } from '@supabase/supabase-js';

// Default project credentials provided by user
const DEFAULT_SUPABASE_URL = 'https://ovqaazreepckumgfnqpm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_IuRw7SZMXXL0YiXYP63PRg_FEY4os6J';

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || DEFAULT_SUPABASE_URL;
export const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false
  }
});

// The exact SQL script required to run in Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- 1. Create the bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    service_name TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    guest_count INTEGER DEFAULT 2 NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    notes TEXT,
    dining_area TEXT DEFAULT 'Main AC Family Hall',
    estimated_bill NUMERIC DEFAULT 0
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if any to avoid duplicates
DROP POLICY IF EXISTS "Public can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can delete bookings" ON public.bookings;

-- 4. Create RLS policies for demo & management
CREATE POLICY "Public can view bookings" 
ON public.bookings 
FOR SELECT 
USING (true);

CREATE POLICY "Public can insert bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update bookings" 
ON public.bookings 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can delete bookings" 
ON public.bookings 
FOR DELETE 
USING (true);

-- 5. Enable real-time for the bookings table
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
`;
