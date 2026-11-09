import { Booking, BookingStatus } from '../types';
import { supabase } from './supabase';

const STORAGE_KEY = 'pista_house_bookings_v1';

export const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'PH-BK-9102',
    customerName: 'Mirza Tanveer Baig',
    phone: '+91 98490 12345',
    email: 'tanveer.baig@example.com',
    guests: 6,
    date: '2026-11-06',
    timeSlot: '08:00 PM',
    serviceName: 'Zafrani Mutton Dum Biryani & Royal Tandoori Platter',
    diningArea: 'Main AC Family Hall',
    specialRequests: 'Celebrating 25th wedding anniversary. Kindly arrange quiet corner table and dessert surprise.',
    status: 'confirmed',
    isDemo: true,
    estimatedBill: 2840,
    createdAt: '2026-11-05T14:30:00.000Z'
  },
  {
    id: 'PH-BK-9103',
    customerName: 'Kavitha Ramesh',
    phone: '+91 99891 54321',
    email: 'kavitha.r@example.com',
    guests: 4,
    date: '2026-11-06',
    timeSlot: '01:30 PM',
    serviceName: 'Zafrani Special Chicken Dum Biryani',
    diningArea: 'Main AC Family Hall',
    specialRequests: 'High chair required for toddler. Less spicy salan preferred.',
    status: 'pending',
    isDemo: true,
    estimatedBill: 1680,
    createdAt: '2026-11-06T09:15:00.000Z'
  },
  {
    id: 'PH-BK-9104',
    customerName: 'Sanjay Deshmukh',
    phone: '+91 97012 34567',
    guests: 8,
    date: '2026-11-07',
    timeSlot: '08:30 PM',
    serviceName: 'World-Famous Hyderabadi Haleem & Zafrani Dum Biryani',
    diningArea: 'Royal Diwan Seating',
    specialRequests: 'Diwan seating required with extra cushions. Office team dinner.',
    status: 'confirmed',
    isDemo: true,
    estimatedBill: 3960,
    createdAt: '2026-11-06T10:00:00.000Z'
  },
  {
    id: 'PH-BK-9105',
    customerName: 'Ayesha Fatima',
    phone: '+91 94400 88990',
    guests: 2,
    date: '2026-11-05',
    timeSlot: '07:30 PM',
    serviceName: 'Irani Dum Chai, Osmania Biscuits & Apricot Delight',
    diningArea: 'Quick Bakery & Tea Lounge',
    specialRequests: 'Window table near bakery display.',
    status: 'completed',
    isDemo: true,
    estimatedBill: 580,
    createdAt: '2026-11-04T18:20:00.000Z'
  }
];

// Helper to map Supabase database row to Booking model
export function mapSupabaseRowToBooking(row: any): Booking {
  return {
    id: row.id,
    customerName: row.customer_name || 'Valued Guest',
    phone: row.phone_number || '',
    serviceName: row.service_name || 'Dining Reservation',
    date: row.booking_date || new Date().toISOString().split('T')[0],
    timeSlot: row.time_slot || '08:00 PM',
    guests: Number(row.guest_count) || 2,
    status: (row.status as BookingStatus) || 'pending',
    specialRequests: row.notes || undefined,
    diningArea: (row.dining_area as Booking['diningArea']) || 'Main AC Family Hall',
    estimatedBill: Number(row.estimated_bill) || 0,
    createdAt: row.created_at || new Date().toISOString(),
    isDemo: row.id?.startsWith('PH-BK-910') ?? false
  };
}

// Local storage fallback helpers
export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_BOOKINGS));
      return INITIAL_DEMO_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_BOOKINGS));
      return INITIAL_DEMO_BOOKINGS;
    }
    return parsed;
  } catch {
    return INITIAL_DEMO_BOOKINGS;
  }
}

export function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent('bookings-changed', { detail: bookings }));
  } catch (err) {
    console.error('Failed to save bookings to localStorage:', err);
  }
}

// ==============================================================================
// LIVE SUPABASE BACKEND INTEGRATION
// ==============================================================================

/**
 * Fetch all bookings from Supabase, falling back to local cache if table is not yet created
 */
export async function fetchLiveBookings(): Promise<{
  data: Booking[];
  source: 'supabase' | 'local';
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch returned error (using local storage fallback):', error.message);
      const fallback = getStoredBookings();
      return { data: fallback, source: 'local', error: error.message };
    }

    if (!data || data.length === 0) {
      // If table exists but is empty, seed or return empty
      return { data: [], source: 'supabase' };
    }

    const mapped = data.map(mapSupabaseRowToBooking);
    // Sync to local cache for offline/instant resume
    saveBookings(mapped);
    return { data: mapped, source: 'supabase' };
  } catch (err: any) {
    console.warn('Network exception querying Supabase:', err);
    return { data: getStoredBookings(), source: 'local', error: err.message || 'Network error' };
  }
}

/**
 * Insert a new customer booking directly into Supabase
 */
export async function createLiveBooking(
  input: Omit<Booking, 'id' | 'createdAt' | 'status' | 'isDemo'>
): Promise<{ booking: Booking; source: 'supabase' | 'local'; error?: string }> {
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `PH-BK-${idNum}`;
  const nowIso = new Date().toISOString();

  const localBooking: Booking = {
    ...input,
    id: bookingId,
    status: 'pending',
    isDemo: false,
    createdAt: nowIso
  };

  try {
    const dbPayload = {
      id: bookingId,
      customer_name: input.customerName.trim(),
      phone_number: input.phone.trim(),
      service_name: input.serviceName,
      booking_date: input.date,
      time_slot: input.timeSlot,
      guest_count: input.guests,
      status: 'pending',
      notes: input.specialRequests ? input.specialRequests.trim() : null,
      dining_area: input.diningArea,
      estimated_bill: input.estimatedBill || 0
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([dbPayload])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert failed, saving to local cache:', error.message);
      const current = getStoredBookings();
      saveBookings([localBooking, ...current]);
      return { booking: localBooking, source: 'local', error: error.message };
    }

    const confirmed = mapSupabaseRowToBooking(data);
    const current = getStoredBookings().filter(b => b.id !== confirmed.id);
    saveBookings([confirmed, ...current]);
    return { booking: confirmed, source: 'supabase' };
  } catch (err: any) {
    console.warn('Exception during Supabase insert:', err);
    const current = getStoredBookings();
    saveBookings([localBooking, ...current]);
    return { booking: localBooking, source: 'local', error: err.message };
  }
}

/**
 * Update booking status live in Supabase (e.g. 'confirmed', 'cancelled', 'completed')
 */
export async function updateLiveBookingStatus(
  id: string,
  newStatus: BookingStatus
): Promise<{ success: boolean; source: 'supabase' | 'local'; error?: string }> {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.warn('Supabase status update failed, updating local state:', error.message);
      updateBookingStatusLocal(id, newStatus);
      return { success: true, source: 'local', error: error.message };
    }

    updateBookingStatusLocal(id, newStatus);
    return { success: true, source: 'supabase' };
  } catch (err: any) {
    updateBookingStatusLocal(id, newStatus);
    return { success: true, source: 'local', error: err.message };
  }
}

/**
 * Delete a booking row live in Supabase
 */
export async function deleteLiveBooking(
  id: string
): Promise<{ success: boolean; source: 'supabase' | 'local'; error?: string }> {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      deleteBookingLocal(id);
      return { success: true, source: 'local', error: error.message };
    }

    deleteBookingLocal(id);
    return { success: true, source: 'supabase' };
  } catch (err: any) {
    deleteBookingLocal(id);
    return { success: true, source: 'local', error: err.message };
  }
}

function updateBookingStatusLocal(id: string, status: BookingStatus): void {
  const current = getStoredBookings();
  const updated = current.map(item => (item.id === id ? { ...item, status } : item));
  saveBookings(updated);
}

function deleteBookingLocal(id: string): void {
  const current = getStoredBookings();
  const filtered = current.filter(item => item.id !== id);
  saveBookings(filtered);
}

export function resetToDemoBookings(): Booking[] {
  saveBookings(INITIAL_DEMO_BOOKINGS);
  return INITIAL_DEMO_BOOKINGS;
}

export function computeKPIs(bookings: Booking[]) {
  const totalBookings = bookings.length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const completed = bookings.filter(b => b.status === 'completed').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;
  
  const estimatedRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (b.estimatedBill || 1200), 0);

  return {
    totalBookings,
    pending,
    confirmed,
    completed,
    cancelled,
    estimatedRevenue
  };
}
