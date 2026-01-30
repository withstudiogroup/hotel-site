// Room Types
export interface Room {
  id: string
  slug: string
  name: string
  nameEn: string
  category: 'deluxe' | 'suite' | 'villa'
  description: string
  shortDescription: string
  size: number
  maxGuests: number
  bedType: string[]
  viewType: string[]
  price: number
  images: string[]
  amenities: string[]
  services: string[]
  features: string[]
}

export interface RoomCategory {
  id: string
  name: string
  nameEn: string
  description: string
  rooms: Room[]
}

// Offer Types
export interface Offer {
  id: string
  slug: string
  title: string
  titleEn: string
  subtitle: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  validFrom: string
  validTo: string
  includes: string[]
  roomTypes: string[]
  tags: string[]
  featured: boolean
}

// Event Types
export interface HotelEvent {
  id: string
  slug: string
  title: string
  titleEn: string
  description: string
  image: string
  startDate: string
  endDate: string
  location: string
  category: 'promotion' | 'exhibition' | 'dining' | 'entertainment'
}

// Facility Types
export interface Facility {
  id: string
  slug: string
  name: string
  nameEn: string
  description: string
  shortDescription: string
  image: string
  images: string[]
  hours: string
  location: string
  features: string[]
  category: 'spa' | 'fitness' | 'pool' | 'garden' | 'shopping' | 'kids' | 'wellness' | 'dining' | 'entertainment' | 'business'
}

// Dining Types
export interface Restaurant {
  id: string
  slug: string
  name: string
  nameEn: string
  cuisine: string
  description: string
  shortDescription: string
  image: string
  images: string[]
  hours: string
  priceRange: string
  location: string
  capacity: number
  features: string[]
  specialties: string[]
  michelinStars?: number
  reservationRequired: boolean
}

// Reservation Types
export interface ReservationItem {
  id: string
  type: 'room' | 'dining' | 'spa'
  itemId: string
  name: string
  image: string
  checkIn?: string
  checkOut?: string
  date?: string
  time?: string
  guests: {
    adults: number
    children: number
  }
  price: number
  options: string[]
}

export interface Reservation {
  id: string
  items: ReservationItem[]
  totalPrice: number
  discount: number
  finalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  guestInfo: GuestInfo
  paymentInfo?: PaymentInfo
  specialRequests?: string
  createdAt: string
}

export interface GuestInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
}

export interface PaymentInfo {
  method: 'card' | 'bank' | 'paypal'
  cardNumber?: string
  status: 'pending' | 'completed' | 'failed'
}

// Hero Slide
export interface HeroSlide {
  id: string
  image: string
  video?: string
  title: string
  subtitle: string
  cta?: {
    text: string
    href: string
  }
}
