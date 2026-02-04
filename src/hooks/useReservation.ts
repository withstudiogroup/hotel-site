import { useMemo, useCallback } from 'react'
import { useReservationStore } from '@/stores/reservationStore'

const ROOM_PRICES: Record<string, number> = {
  'deluxe-room': 350000,
  'premier-suite': 550000,
  'executive-suite': 850000,
  'presidential-suite': 1500000,
}

const PACKAGE_MULTIPLIERS: Record<string, number> = {
  standard: 1,
  breakfast: 1.15,
  premium: 1.35,
  luxury: 1.6,
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

interface PriceBreakdown {
  basePrice: number
  packageMultiplier: number
  nights: number
  subtotal: number
  discount: number
  total: number
}

export function useReservation() {
  const store = useReservationStore()

  const validateDates = useCallback((): ValidationResult => {
    const errors: string[] = []
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    if (!store.checkIn) {
      errors.push('체크인 날짜를 선택해주세요')
    } else if (store.checkIn < now) {
      errors.push('체크인 날짜는 오늘 이후여야 합니다')
    }

    if (!store.checkOut) {
      errors.push('체크아웃 날짜를 선택해주세요')
    }

    if (store.checkIn && store.checkOut) {
      if (store.checkOut <= store.checkIn) {
        errors.push('체크아웃은 체크인 이후여야 합니다')
      }

      const maxStay = 30
      const diffTime = store.checkOut.getTime() - store.checkIn.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays > maxStay) {
        errors.push(`최대 ${maxStay}박까지 예약 가능합니다`)
      }
    }

    return { isValid: errors.length === 0, errors }
  }, [store.checkIn, store.checkOut])

  const validateGuests = useCallback((): ValidationResult => {
    const errors: string[] = []
    const maxGuests = 4
    const totalGuests = store.adults + store.children

    if (store.adults < 1) {
      errors.push('최소 1명의 성인이 필요합니다')
    }

    if (store.children < 0) {
      errors.push('어린이 수는 0명 이상이어야 합니다')
    }

    if (totalGuests > maxGuests) {
      errors.push(`최대 ${maxGuests}명까지 예약 가능합니다`)
    }

    return { isValid: errors.length === 0, errors }
  }, [store.adults, store.children])

  const isReservationValid = useMemo((): boolean => {
    const datesValid = validateDates().isValid
    const guestsValid = validateGuests().isValid
    const roomSelected = store.selectedRoom !== null

    return datesValid && guestsValid && roomSelected
  }, [validateDates, validateGuests, store.selectedRoom])

  const nights = useMemo((): number => {
    if (!store.checkIn || !store.checkOut) return 0
    const diffTime = store.checkOut.getTime() - store.checkIn.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [store.checkIn, store.checkOut])

  const calculatePrice = useCallback((): PriceBreakdown => {
    const basePrice = store.selectedRoom
      ? ROOM_PRICES[store.selectedRoom] || 0
      : 0
    const packageMultiplier = PACKAGE_MULTIPLIERS[store.selectedPackage] || 1
    const subtotal = basePrice * packageMultiplier * nights

    let discount = 0
    if (nights >= 7) {
      discount = subtotal * 0.15
    } else if (nights >= 3) {
      discount = subtotal * 0.1
    }

    if (store.promoCode.toUpperCase() === 'LUXE2024') {
      discount += (subtotal - discount) * 0.05
    }

    return {
      basePrice,
      packageMultiplier,
      nights,
      subtotal,
      discount: Math.round(discount),
      total: Math.round(subtotal - discount),
    }
  }, [store.selectedRoom, store.selectedPackage, store.promoCode, nights])

  const formatPrice = useCallback((price: number): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
  }, [])

  const checkAvailability = useCallback(
    async (roomSlug: string): Promise<boolean> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return Math.random() > 0.2
    },
    []
  )

  return {
    ...store,
    validateDates,
    validateGuests,
    isReservationValid,
    nights,
    calculatePrice,
    formatPrice,
    checkAvailability,
  }
}
