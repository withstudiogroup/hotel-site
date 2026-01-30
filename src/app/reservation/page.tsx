'use client'

import { useState, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Users,
  Maximize2,
  Bed,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Coffee,
  Sparkles,
  Wifi,
  Car,
  UtensilsCrossed,
  Minus,
  Plus,
} from 'lucide-react'
import { roomCategories } from '@/lib/data/rooms'

const tabs = [
  { id: 'hotel', label: '호텔', labelEn: 'HOTEL' },
  { id: 'dining', label: '다이닝', labelEn: 'DINING' },
  { id: 'spa', label: '스파', labelEn: 'SPA' },
]

const filters = [
  { id: 'breakfast', label: '조식 포함', icon: Coffee },
  { id: 'resort-money', label: '리조트 머니', icon: Sparkles },
  { id: 'wifi', label: '무료 WiFi', icon: Wifi },
  { id: 'parking', label: '주차 포함', icon: Car },
  { id: 'dinner', label: '석식 포함', icon: UtensilsCrossed },
]

const allRooms = roomCategories.flatMap((cat) => cat.rooms)

export default function ReservationPage() {
  return (
    <Suspense fallback={<ReservationSkeleton />}>
      <ReservationContent />
    </Suspense>
  )
}

function ReservationSkeleton() {
  return (
    <div className="min-h-screen bg-luxe-black flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    </div>
  )
}

function ReservationContent() {
  const searchParams = useSearchParams()
  const preSelectedRoom = searchParams.get('room')

  const [activeTab, setActiveTab] = useState('hotel')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string | null>(preSelectedRoom)
  const [selectedPackage, setSelectedPackage] = useState<string>('standard')

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    )
  }

  const selectedRoomData = useMemo(() => {
    return allRooms.find((r) => r.slug === selectedRoom)
  }, [selectedRoom])

  const packageOptions = [
    {
      id: 'standard',
      name: '스탠다드',
      description: '객실만 제공',
      priceMultiplier: 1,
    },
    {
      id: 'breakfast',
      name: '조식 포함',
      description: '2인 조식 뷔페 포함',
      priceMultiplier: 1.15,
    },
    {
      id: 'premium',
      name: '프리미엄',
      description: '조식 + 스파 이용권 + 리조트 머니 10만원',
      priceMultiplier: 1.35,
    },
  ]

  const selectedPackageData = packageOptions.find((p) => p.id === selectedPackage)
  const totalPrice = selectedRoomData
    ? Math.round(selectedRoomData.price * (selectedPackageData?.priceMultiplier || 1))
    : 0

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }, [checkIn, checkOut])

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
          alt="Reservation"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/50 to-luxe-black/30" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">RESERVATION</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-4">
              예약
            </h1>

            <p className="text-cream/70 text-lg">
              특별한 순간을 위한 완벽한 선택
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-2 mb-12"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-sm tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-luxe-black'
                    : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
                }`}
              >
                <span className="block text-xs opacity-60 mb-1">{tab.labelEn}</span>
                <span className="font-display text-lg">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Search & Rooms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-luxe-charcoal p-6 border border-white/5"
              >
                <h2 className="font-display text-xl text-cream mb-6">날짜 및 인원 선택</h2>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Check-in */}
                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      체크인
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream focus:border-gold outline-none transition-colors"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Check-out */}
                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      체크아웃
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream focus:border-gold outline-none transition-colors"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="relative">
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      인원
                    </label>
                    <button
                      onClick={() => setShowGuestPicker(!showGuestPicker)}
                      className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream text-left flex items-center justify-between hover:border-gold/30 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cream/40" />
                        성인 {adults}명{children > 0 && `, 아동 ${children}명`}
                      </span>
                      {showGuestPicker ? (
                        <ChevronUp className="w-4 h-4 text-cream/40" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-cream/40" />
                      )}
                    </button>

                    <AnimatePresence>
                      {showGuestPicker && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-luxe-charcoal border border-white/10 p-4 z-20"
                        >
                          {/* Adults */}
                          <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <div>
                              <p className="text-cream">성인</p>
                              <p className="text-cream/40 text-xs">만 13세 이상</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream hover:border-gold transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-cream w-6 text-center">{adults}</span>
                              <button
                                onClick={() => setAdults(Math.min(6, adults + 1))}
                                className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream hover:border-gold transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex items-center justify-between py-3">
                            <div>
                              <p className="text-cream">아동</p>
                              <p className="text-cream/40 text-xs">만 12세 이하</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream hover:border-gold transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-cream w-6 text-center">{children}</span>
                              <button
                                onClick={() => setChildren(Math.min(4, children + 1))}
                                className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream hover:border-gold transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => setShowGuestPicker(false)}
                            className="w-full mt-4 py-2 bg-gold text-luxe-black text-sm font-medium"
                          >
                            완료
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Filters */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-cream/40 text-xs tracking-wider mb-3">필터</p>
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => toggleFilter(filter.id)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                          activeFilters.includes(filter.id)
                            ? 'bg-gold/20 border border-gold text-gold'
                            : 'border border-white/10 text-cream/60 hover:border-gold/30'
                        }`}
                      >
                        <filter.icon className="w-4 h-4" />
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Room List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="font-display text-2xl text-cream mb-6">객실 선택</h2>

                <div className="space-y-4">
                  {roomCategories.map((category) => (
                    <div key={category.id}>
                      <h3 className="text-gold text-sm tracking-wider mb-3">
                        {category.nameEn.toUpperCase()}
                      </h3>

                      <div className="space-y-3">
                        {category.rooms.map((room) => (
                          <div
                            key={room.id}
                            onClick={() => setSelectedRoom(room.slug)}
                            className={`group cursor-pointer border transition-all ${
                              selectedRoom === room.slug
                                ? 'border-gold bg-gold/5'
                                : 'border-white/5 hover:border-gold/30'
                            }`}
                          >
                            <div className="flex flex-col md:flex-row">
                              {/* Image */}
                              <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                                <Image
                                  src={room.images[0]}
                                  alt={room.name}
                                  fill
                                  className="object-cover"
                                />
                                {selectedRoom === room.slug && (
                                  <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                                      <Check className="w-5 h-5 text-luxe-black" />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Info */}
                              <div className="flex-1 p-4 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                  <div>
                                    <h4 className="font-display text-lg text-cream group-hover:text-gold transition-colors">
                                      {room.name}
                                    </h4>
                                    <p className="text-cream/40 text-xs mb-2">{room.nameEn}</p>
                                    <p className="text-cream/60 text-sm line-clamp-2">
                                      {room.shortDescription}
                                    </p>

                                    {/* Specs */}
                                    <div className="flex items-center gap-4 mt-3 text-cream/50 text-xs">
                                      <span className="flex items-center gap-1">
                                        <Maximize2 className="w-3 h-3" />
                                        {room.size}㎡
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        최대 {room.maxGuests}인
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Bed className="w-3 h-3" />
                                        {room.bedType[0]}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Price */}
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-gold font-display text-2xl">
                                      ₩{room.price.toLocaleString()}
                                    </p>
                                    <p className="text-cream/40 text-xs">1박 기준</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-24 bg-luxe-charcoal border border-white/5 p-6"
              >
                <h2 className="font-display text-xl text-cream mb-6">예약 정보</h2>

                {selectedRoomData ? (
                  <>
                    {/* Selected Room */}
                    <div className="pb-6 border-b border-white/5">
                      <div className="relative aspect-[16/9] mb-4 overflow-hidden">
                        <Image
                          src={selectedRoomData.images[0]}
                          alt={selectedRoomData.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-display text-lg text-cream">{selectedRoomData.name}</h3>
                      <p className="text-cream/40 text-xs">{selectedRoomData.nameEn}</p>
                    </div>

                    {/* Date Summary */}
                    <div className="py-6 border-b border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-cream/60 text-sm">체크인</span>
                        <span className="text-cream text-sm">
                          {checkIn || '날짜를 선택하세요'}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-cream/60 text-sm">체크아웃</span>
                        <span className="text-cream text-sm">
                          {checkOut || '날짜를 선택하세요'}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-cream/60 text-sm">인원</span>
                        <span className="text-cream text-sm">
                          성인 {adults}명{children > 0 && `, 아동 ${children}명`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream/60 text-sm">숙박</span>
                        <span className="text-cream text-sm">{nights}박</span>
                      </div>
                    </div>

                    {/* Package Selection */}
                    <div className="py-6 border-b border-white/5">
                      <p className="text-cream/40 text-xs tracking-wider mb-3">패키지 선택</p>
                      <div className="space-y-2">
                        {packageOptions.map((pkg) => (
                          <button
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg.id)}
                            className={`w-full text-left p-3 border transition-all ${
                              selectedPackage === pkg.id
                                ? 'border-gold bg-gold/10'
                                : 'border-white/5 hover:border-gold/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`text-sm ${
                                  selectedPackage === pkg.id ? 'text-gold' : 'text-cream'
                                }`}>
                                  {pkg.name}
                                </p>
                                <p className="text-cream/40 text-xs">{pkg.description}</p>
                              </div>
                              {selectedPackage === pkg.id && (
                                <Check className="w-4 h-4 text-gold" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="py-6 border-b border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-cream/60 text-sm">객실 요금</span>
                        <span className="text-cream text-sm">
                          ₩{selectedRoomData.price.toLocaleString()}
                        </span>
                      </div>
                      {selectedPackage !== 'standard' && (
                        <div className="flex justify-between mb-2">
                          <span className="text-cream/60 text-sm">패키지 추가</span>
                          <span className="text-cream text-sm">
                            +₩{Math.round(
                              selectedRoomData.price *
                                ((selectedPackageData?.priceMultiplier || 1) - 1)
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between mb-2">
                        <span className="text-cream/60 text-sm">숙박 ({nights}박)</span>
                        <span className="text-cream text-sm">x{nights}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-cream/60 text-sm">세금 및 수수료</span>
                        <span className="text-cream text-sm">
                          ₩{Math.round(totalPrice * nights * 0.1).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="py-6">
                      <div className="flex justify-between items-end">
                        <span className="text-cream">총 결제 금액</span>
                        <div className="text-right">
                          <p className="text-gold font-display text-3xl">
                            ₩{Math.round(totalPrice * nights * 1.1).toLocaleString()}
                          </p>
                          <p className="text-cream/40 text-xs">세금 포함</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full btn-luxe-filled py-4">
                      예약하기
                    </button>

                    <p className="text-cream/40 text-xs text-center mt-4">
                      예약 확정 전까지 요금이 청구되지 않습니다
                    </p>
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border border-white/10 rounded-full flex items-center justify-center">
                      <Bed className="w-6 h-6 text-cream/30" />
                    </div>
                    <p className="text-cream/60 mb-2">객실을 선택해주세요</p>
                    <p className="text-cream/40 text-sm">
                      원하시는 객실을 선택하면<br />
                      예약 정보가 표시됩니다
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-luxe-charcoal">
        <div className="container-luxe">
          <h2 className="text-center font-display text-2xl text-cream mb-12">
            Luxe Haven 특별 혜택
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Coffee,
                title: '조식 뷔페',
                description: '미쉐린 스타 셰프가 준비하는 프리미엄 조식',
              },
              {
                icon: Sparkles,
                title: '스파 할인',
                description: '투숙객 전용 30% 할인 혜택',
              },
              {
                icon: Car,
                title: '발레파킹',
                description: '무료 발레파킹 서비스 제공',
              },
              {
                icon: Wifi,
                title: '프리미엄 WiFi',
                description: '초고속 인터넷 무제한 이용',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 mx-auto mb-4 border border-gold/30 flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-lg text-cream mb-2">{benefit.title}</h3>
                <p className="text-cream/50 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
