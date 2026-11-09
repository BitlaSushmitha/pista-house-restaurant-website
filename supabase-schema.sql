-- ==============================================================================
-- PISTA HOUSE RESERVATION SYSTEM - SUPABASE SQL SCHEMA
-- Run this complete script in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- ==============================================================================

-- 1. Create the bookings table
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

-- 3. Drop existing policies if any to avoid duplication errors on re-run
DROP POLICY IF EXISTS "Public can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can delete bookings" ON public.bookings;

-- 4. Create RLS policies allowing public read, insert, update, and delete for this application
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

-- 5. Seed initial realistic demo records if table is fresh
INSERT INTO public.bookings (id, customer_name, phone_number, service_name, booking_date, time_slot, guest_count, status, notes, dining_area, estimated_bill)
VALUES 
    ('PH-BK-9102', 'Mirza Tanveer Baig', '+91 98490 12345', 'Zafrani Mutton Dum Biryani & Royal Tandoori Platter', '2026-11-06', '08:00 PM', 6, 'confirmed', 'Celebrating 25th wedding anniversary. Kindly arrange quiet corner table and dessert surprise.', 'Main AC Family Hall', 2840),
    ('PH-BK-9103', 'Kavitha Ramesh', '+91 99891 54321', 'Zafrani Special Chicken Dum Biryani', '2026-11-06', '01:30 PM', 4, 'pending', 'High chair required for toddler. Less spicy salan preferred.', 'Main AC Family Hall', 1680),
    ('PH-BK-9104', 'Sanjay Deshmukh', '+91 97012 34567', 'World-Famous Hyderabadi Haleem & Zafrani Dum Biryani', '2026-11-07', '08:30 PM', 8, 'confirmed', 'Diwan seating required with extra cushions. Office team dinner.', 'Royal Diwan Seating', 3960)
ON CONFLICT (id) DO NOTHING;

-- 6. Enable real-time replication for bookings
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
