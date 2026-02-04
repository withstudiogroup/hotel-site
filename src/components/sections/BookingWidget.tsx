'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Tag, ChevronDown, X } from 'lucide-react'
import { DatePicker, type DateRange } from '@/components/common/DatePicker'
import { GuestSelector, type GuestCount } from '@/components/common/GuestSelector'

interface RoomType {
  id: string
  name: string
  description?: string
}

interface BookingWidgetProps {
  className?: string
  showRoomSelector?: boolean
  showPromoCode?: boolean
  roomTypes?: RoomType[]
  floating?: boolean
  onSearch?: (params: BookingParams) => void
}

interface BookingParams {
  checkIn: string | null
  checkOut: string | null
  adults: number
  children: number
  roomType?: string
  promoCode?: string
}

const DEFAULT_ROOM_TYPES: RoomType[] = [
  { id: 'all', name: '모든 객실', description: '전체 객실 타입 검색' },
  { id: 'deluxe', name: '디럭스', description: '도시 전망' },
  { id: 'premier', name: '프리미어', description: '고층 파노라마 뷰' },
  { id: 'suite', name: '스위트', description: '넓은 거실 공간' },
  { id: 'presidential', name: '프레지덴셜', description: '최고급 스위트' },
]

function BookingWidget({
  className = '',
  showRoomSelector = false,
  showPromoCode = false,
  roomTypes = DEFAULT_ROOM_TYPES,
  floating = true,
  onSearch
}: BookingWidgetProps) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isRoomSelectorOpen, setIsRoomSelectorOpen] = useState(false)
  const [isPromoOpen, setIsPromoOpen] = useState(false)

  const [dateRange, setDateRange] = useState<DateRange>({
    checkIn: null,
    checkOut: null
  })

  const [guests, setGuests] = useState<GuestCount>({
    adults: 2,
    children: 0
  })

  const [selectedRoom, setSelectedRoom] = useState<string>('all')
  const [promoCode, setPromoCode] = useState('')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    today.setHours(0, 0, 0, 0)
    tomorrow.setHours(0, 0, 0, 0)

    setDateRange({
      checkIn: today,
      checkOut: tomorrow
    })
  }, [])

  const formatDateForUrl = (date: Date | null): string => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const handleSearch = () => {
    const params: BookingParams = {
      checkIn: formatDateForUrl(dateRange.checkIn),
      checkOut: formatDateForUrl(dateRange.checkOut),
      adults: guests.adults,
      children: guests.children,
      roomType: selectedRoom !== 'all' ? selectedRoom : undefined,
      promoCode: promoCode || undefined
    }

    if (onSearch) {
      onSearch(params)
      return
    }

    const searchParams = new URLSearchParams()
    if (params.checkIn) searchParams.set('checkIn', params.checkIn)
    if (params.checkOut) searchParams.set('checkOut', params.checkOut)
    searchParams.set('adults', params.adults.toString())
    searchParams.set('children', params.children.toString())
    if (params.roomType) searchParams.set('roomType', params.roomType)
    if (params.promoCode) searchParams.set('promo', params.promoCode)

    router.push(`/reservation?${searchParams.toString()}`)
  }

  const isSearchDisabled = useMemo(() => {
    return !dateRange.checkIn || !dateRange.checkOut
  }, [dateRange])

  const selectedRoomData = useMemo(() => {
    return roomTypes.find(r => r.id === selectedRoom) || roomTypes[0]
  }, [selectedRoom, roomTypes])

  const containerClasses = floating
    ? 'backdrop-blur-xl bg-luxe-black/80 border border-gold/20 shadow-luxury'
    : 'bg-luxe-charcoal border border-gold/20'

  if (isMobile) {
    return (
      <>
        <motion.button
          onClick={() => setIsExpanded(true)}
          className={`
            fixed bottom-0 left-0 right-0 z-40
            bg-luxe-black/95 backdrop-blur-xl border-t border-gold/30
            px-6 py-4 flex items-center justify-between
            ${className}
          `}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-left">
            <p className="text-xs text-gold tracking-wider mb-1">예약하기</p>
            <p className="text-cream text-sm">
              {dateRange.checkIn && dateRange.checkOut
                ? `${dateRange.checkIn.getMonth() + 1}/${dateRange.checkIn.getDate()} - ${dateRange.checkOut.getMonth() + 1}/${dateRange.checkOut.getDate()} · ${guests.adults + guests.children}명`
                : '날짜와 인원을 선택하세요'
              }
            </p>
          </div>
          <div className="bg-gold text-luxe-black px-5 py-2.5 text-sm tracking-wider font-medium">
            검색
          </div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-luxe-black/95 backdrop-blur-xl overflow-y-auto"
            >
              <div className="min-h-screen p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl text-cream">객실 검색</h2>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-cream/60 hover:border-gold/50 hover:text-gold transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs tracking-[0.2em] text-gold mb-3">
                      날짜 선택
                    </label>
                    <DatePicker
                      value={dateRange}
                      onChange={setDateRange}
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.2em] text-gold mb-3">
                      인원 선택
                    </label>
                    <GuestSelector
                      value={guests}
                      onChange={setGuests}
                      variant="inline"
                    />
                  </div>

                  {showRoomSelector && (
                    <div>
                      <label className="block text-xs tracking-[0.2em] text-gold mb-3">
                        객실 타입
                      </label>
                      <div className="space-y-2">
                        {roomTypes.map((room) => (
                          <button
                            key={room.id}
                            type="button"
                            onClick={() => setSelectedRoom(room.id)}
                            className={`
                              w-full px-4 py-3 text-left border transition-all duration-300
                              ${selectedRoom === room.id
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-white/10 text-cream hover:border-gold/50'
                              }
                            `}
                          >
                            <span className="block">{room.name}</span>
                            {room.description && (
                              <span className="block text-xs text-cream/40 mt-1">
                                {room.description}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {showPromoCode && (
                    <div>
                      <label className="block text-xs tracking-[0.2em] text-gold mb-3">
                        프로모션 코드
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="코드 입력"
                          className="w-full bg-transparent border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
                        />
                        <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
                      </div>
                    </div>
                  )}
                </div>

                <motion.button
                  onClick={() => {
                    handleSearch()
                    setIsExpanded(false)
                  }}
                  disabled={isSearchDisabled}
                  whileHover={!isSearchDisabled ? { scale: 1.02 } : {}}
                  whileTap={!isSearchDisabled ? { scale: 0.98 } : {}}
                  className={`
                    w-full mt-8 py-4 flex items-center justify-center gap-2
                    text-sm tracking-wider font-medium uppercase
                    transition-all duration-300
                    ${isSearchDisabled
                      ? 'bg-cream/10 text-cream/30 cursor-not-allowed'
                      : 'bg-gold text-luxe-black hover:bg-gold-light shadow-gold hover:shadow-gold-lg'
                    }
                  `}
                >
                  <Search className="w-4 h-4" />
                  객실 검색
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`${containerClasses} p-6 md:p-8 ${className}`}
    >
      <div className={`grid gap-4 items-end ${showRoomSelector ? 'grid-cols-5' : 'grid-cols-4'}`}>
        <div className="col-span-2">
          <DatePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>

        <div>
          <GuestSelector
            value={guests}
            onChange={setGuests}
          />
        </div>

        {showRoomSelector && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoomSelectorOpen(!isRoomSelectorOpen)}
              className="group w-full bg-transparent border border-white/10 px-4 py-3 text-left hover:border-gold/50 transition-all duration-300 ease-luxury"
            >
              <span className="block text-xs tracking-[0.15em] text-gold mb-1">객실 타입</span>
              <span className="flex items-center justify-between text-cream">
                <span>{selectedRoomData.name}</span>
                <motion.div
                  animate={{ rotate: isRoomSelectorOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-cream/40" />
                </motion.div>
              </span>
            </button>

            <AnimatePresence>
              {isRoomSelectorOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsRoomSelectorOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-luxe-charcoal border border-gold/20 z-50 shadow-luxury overflow-hidden"
                  >
                    {roomTypes.map((room) => (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => {
                          setSelectedRoom(room.id)
                          setIsRoomSelectorOpen(false)
                        }}
                        className={`
                          w-full px-4 py-3 text-left transition-all duration-200
                          ${selectedRoom === room.id
                            ? 'bg-gold/10 text-gold'
                            : 'text-cream hover:bg-white/5 hover:text-gold'
                          }
                        `}
                      >
                        <span className="block text-sm">{room.name}</span>
                        {room.description && (
                          <span className="block text-xs text-cream/40 mt-0.5">
                            {room.description}
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="flex gap-2">
          {showPromoCode && (
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setIsPromoOpen(!isPromoOpen)}
                className={`
                  w-full h-full bg-transparent border px-4 py-3
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  ${promoCode
                    ? 'border-gold/50 text-gold'
                    : 'border-white/10 text-cream/60 hover:border-gold/50 hover:text-gold'
                  }
                `}
              >
                <Tag className="w-4 h-4" />
                {promoCode && <span className="text-xs">{promoCode}</span>}
              </button>

              <AnimatePresence>
                {isPromoOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsPromoOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-luxe-charcoal border border-gold/20 p-4 z-50 shadow-luxury"
                    >
                      <label className="block text-xs tracking-[0.15em] text-gold mb-2">
                        프로모션 코드
                      </label>
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="코드 입력"
                        className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPromoOpen(false)}
                        className="w-full mt-3 py-2 bg-gold/10 text-gold text-xs tracking-wider hover:bg-gold/20 transition-colors"
                      >
                        적용
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          <motion.button
            onClick={handleSearch}
            disabled={isSearchDisabled}
            whileHover={!isSearchDisabled ? { scale: 1.02 } : {}}
            whileTap={!isSearchDisabled ? { scale: 0.98 } : {}}
            className={`
              flex-1 py-3.5 flex items-center justify-center gap-2
              text-sm tracking-wider font-medium uppercase
              transition-all duration-300
              ${isSearchDisabled
                ? 'bg-cream/10 text-cream/30 cursor-not-allowed'
                : 'bg-gold text-luxe-black hover:bg-gold-light shadow-gold hover:shadow-gold-lg'
              }
            `}
          >
            <Search className="w-4 h-4" />
            검색
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export { BookingWidget }
export type { BookingWidgetProps, BookingParams, RoomType }
