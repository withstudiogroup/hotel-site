import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ReservationState {
  checkIn: Date | null
  checkOut: Date | null
  adults: number
  children: number
  selectedRoom: string | null
  selectedPackage: string
  promoCode: string
  setDates: (checkIn: Date, checkOut: Date) => void
  setGuests: (adults: number, children: number) => void
  setRoom: (roomSlug: string) => void
  setPackage: (packageId: string) => void
  setPromoCode: (code: string) => void
  reset: () => void
}

const initialState = {
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  selectedRoom: null,
  selectedPackage: 'standard',
  promoCode: '',
}

export const useReservationStore = create<ReservationState>()(
  persist(
    (set) => ({
      ...initialState,
      setDates: (checkIn: Date, checkOut: Date) =>
        set({ checkIn, checkOut }),
      setGuests: (adults: number, children: number) =>
        set({ adults, children }),
      setRoom: (roomSlug: string) =>
        set({ selectedRoom: roomSlug }),
      setPackage: (packageId: string) =>
        set({ selectedPackage: packageId }),
      setPromoCode: (code: string) =>
        set({ promoCode: code }),
      reset: () => set(initialState),
    }),
    {
      name: 'reservation-storage',
      partialize: (state) => ({
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        adults: state.adults,
        children: state.children,
        selectedRoom: state.selectedRoom,
        selectedPackage: state.selectedPackage,
        promoCode: state.promoCode,
      }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const parsed = JSON.parse(str)
          if (parsed.state) {
            if (parsed.state.checkIn) {
              parsed.state.checkIn = new Date(parsed.state.checkIn)
            }
            if (parsed.state.checkOut) {
              parsed.state.checkOut = new Date(parsed.state.checkOut)
            }
          }
          return parsed
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
    }
  )
)
