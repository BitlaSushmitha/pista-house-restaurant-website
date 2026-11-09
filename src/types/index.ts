export interface MenuItem {
  id: string;
  name: string;
  category: 'biryani' | 'haleem' | 'kebabs' | 'bakery' | 'desserts';
  categoryLabel: string;
  description: string;
  price: number;
  durationOrPortion: string;
  isBestseller?: boolean;
  isVegetarian?: boolean;
  highlights: string[];
  image: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  guests: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "01:30 PM"
  serviceId?: string;
  serviceName: string;
  diningArea: 'Main AC Family Hall' | 'Royal Diwan Seating' | 'Terrace Garden' | 'Quick Bakery & Tea Lounge';
  specialRequests?: string;
  status: BookingStatus;
  isDemo: boolean;
  estimatedBill: number;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  role: string;
  rating: number;
  date: string;
  reviewText: string;
  verified: boolean;
}
