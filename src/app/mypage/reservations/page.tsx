'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  Users,
  ChevronRight,
  Filter,
  Search,
  X,
  MapPin,
  Clock,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Breadcrumb, BreadcrumbItem } from '@/components/common/Breadcrumb'

type ReservationStatus = 'all' | 'confirmed' | 'completed' | 'cancelled'

interface Reservation {
  id: string
  roomName: string
  roomSlug: string
  roomImage: string
  checkIn: string
  checkOut: string
  nights: number
  guests: { adults: number; children: number }
  status: 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
  createdAt: string
}

const mockReservations: Reservation[] = [
  {
    id: 'RSV-2024-001234',
    roomName: 'Grand Deluxe Suite',
    roomSlug: 'grand-deluxe-suite',
    roomImage: '/images/rooms/suite-1.jpg',
    checkIn: '2024-02-15',
    checkOut: '2024-02-17',
    nights: 2,
    guests: { adults: 2, children: 0 },
    status: 'confirmed',
    totalPrice: 1200000,
    createdAt: '2024-01-20',
  },
  {
    id: 'RSV-2024-001235',
    roomName: 'Ocean View Premium',
    roomSlug: 'ocean-view-premium',
    roomImage: '/images/rooms/ocean-1.jpg',
    checkIn: '2024-03-20',
    checkOut: '2024-03-22',
    nights: 2,
    guests: { adults: 2, children: 1 },
    status: 'confirmed',
    totalPrice: 980000,
    createdAt: '2024-02-01',
  },
  {
    id: 'RSV-2023-009876',
    roomName: 'Presidential Suite',
    roomSlug: 'presidential-suite',
    roomImage: '/images/rooms/presidential-1.jpg',
    checkIn: '2023-12-24',
    checkOut: '2023-12-26',
    nights: 2,
    guests: { adults: 2, children: 0 },
    status: 'completed',
    totalPrice: 2400000,
    createdAt: '2023-11-15',
  },
  {
    id: 'RSV-2023-008765',
    roomName: 'Garden Terrace Room',
    roomSlug: 'garden-terrace-room',
    roomImage: '/images/rooms/garden-1.jpg',
    checkIn: '2023-11-10',
    checkOut: '2023-11-12',
    nights: 2,
    guests: { adults: 2, children: 0 },
    status: 'completed',
    totalPrice: 560000,
    createdAt: '2023-10-20',
  },
  {
    id: 'RSV-2023-007654',
    roomName: 'Deluxe Double Room',
    roomSlug: 'deluxe-double-room',
    roomImage: '/images/rooms/deluxe-1.jpg',
    checkIn: '2023-09-05',
    checkOut: '2023-09-07',
    nights: 2,
    guests: { adults: 2, children: 0 },
    status: 'cancelled',
    totalPrice: 480000,
    createdAt: '2023-08-15',
  },
]

const statusConfig: Record<
  string,
  { label: string; className: string; bgClassName: string }
> = {
  confirmed: {
    label: '예약완료',
    className: 'text-emerald-400',
    bgClassName: 'bg-emerald-500/20',
  },
  completed: {
    label: '투숙완료',
    className: 'text-blue-400',
    bgClassName: 'bg-blue-500/20',
  },
  cancelled: {
    label: '취소됨',
    className: 'text-red-400',
    bgClassName: 'bg-red-500/20',
  },
}

const filterOptions: { value: ReservationStatus; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'confirmed', label: '예약완료' },
  { value: 'completed', label: '투숙완료' },
  { value: 'cancelled', label: '취소' },
]

export default function ReservationsPage() {
  const [filter, setFilter] = useState<ReservationStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReservations = mockReservations.filter((reservation) => {
    const matchesFilter = filter === 'all' || reservation.status === filter
    const matchesSearch =
      searchQuery === '' ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.roomName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: '홈', href: '/' },
    { label: '마이페이지', href: '/mypage' },
    { label: '예약 내역' },
  ]

  return (
    <div className="min-h-screen bg-luxe-black py-32">
      <div className="container-luxe">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-display-sm text-cream">예약 내역</h1>
              <p className="text-cream/60 mt-2">
                총 {filteredReservations.length}건의 예약이 있습니다
              </p>
            </div>
            <Button href="/reservation" variant="gold" size="sm">
              새 예약하기
            </Button>
          </div>

          <div className="bg-luxe-charcoal/50 border border-gold/10 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
                <input
                  type="text"
                  placeholder="예약번호 또는 객실명으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-luxe-black/50 border border-gold/20 text-cream pl-11 pr-4 py-3 text-sm
                    placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-cream/40" />
                <div className="flex gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value)}
                      className={`px-4 py-2 text-sm transition-colors ${
                        filter === option.value
                          ? 'bg-gold text-luxe-black'
                          : 'bg-luxe-black/50 text-cream/60 hover:text-cream border border-gold/20'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredReservations.length > 0 ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredReservations.map((reservation, index) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-luxe-charcoal/50 border border-gold/10 hover:border-gold/30 transition-colors overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
                        <Image
                          src={reservation.roomImage}
                          alt={reservation.roomName}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-luxe-charcoal/50 md:block hidden" />
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`text-xs px-3 py-1 ${
                                  statusConfig[reservation.status].bgClassName
                                } ${statusConfig[reservation.status].className}`}
                              >
                                {statusConfig[reservation.status].label}
                              </span>
                              <span className="text-cream/40 text-xs">
                                예약번호: {reservation.id}
                              </span>
                            </div>
                            <h3 className="font-display text-xl lg:text-2xl text-cream">
                              {reservation.roomName}
                            </h3>
                          </div>
                          <div className="text-right hidden sm:block">
                            <p className="text-cream/40 text-xs">결제 금액</p>
                            <p className="font-display text-xl text-gold">
                              ₩{formatPrice(reservation.totalPrice)}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold/60" />
                            <div>
                              <p className="text-cream/40 text-xs">체크인</p>
                              <p className="text-cream text-sm">
                                {formatDate(reservation.checkIn)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold/60" />
                            <div>
                              <p className="text-cream/40 text-xs">체크아웃</p>
                              <p className="text-cream text-sm">
                                {formatDate(reservation.checkOut)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gold/60" />
                            <div>
                              <p className="text-cream/40 text-xs">투숙 기간</p>
                              <p className="text-cream text-sm">{reservation.nights}박</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gold/60" />
                            <div>
                              <p className="text-cream/40 text-xs">인원</p>
                              <p className="text-cream text-sm">
                                성인 {reservation.guests.adults}명
                                {reservation.guests.children > 0 &&
                                  `, 아동 ${reservation.guests.children}명`}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="sm:hidden mb-4">
                          <p className="text-cream/40 text-xs">결제 금액</p>
                          <p className="font-display text-xl text-gold">
                            ₩{formatPrice(reservation.totalPrice)}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/10">
                          <Button
                            href={`/mypage/reservations/${reservation.id}`}
                            size="sm"
                            variant="outline"
                            rightIcon={<ChevronRight className="w-3 h-3" />}
                          >
                            상세보기
                          </Button>
                          {reservation.status === 'confirmed' && (
                            <>
                              <Button size="sm" variant="ghost">
                                예약 변경
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:text-red-300"
                              >
                                예약 취소
                              </Button>
                            </>
                          )}
                          {reservation.status === 'completed' && (
                            <Button
                              href={`/rooms/${reservation.roomSlug}`}
                              size="sm"
                              variant="ghost"
                            >
                              다시 예약하기
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-luxe-charcoal/50 border border-gold/10 py-20"
              >
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-cream/20 mx-auto mb-6" />
                  <h3 className="font-display text-2xl text-cream mb-2">
                    {filter === 'all'
                      ? '예약 내역이 없습니다'
                      : `${
                          filterOptions.find((f) => f.value === filter)?.label
                        } 상태의 예약이 없습니다`}
                  </h3>
                  <p className="text-cream/60 mb-8">
                    {filter === 'all'
                      ? '새로운 여행을 계획해보세요'
                      : '다른 필터를 선택해보세요'}
                  </p>
                  {filter === 'all' ? (
                    <Button href="/reservation" variant="gold">
                      객실 예약하기
                    </Button>
                  ) : (
                    <Button onClick={() => setFilter('all')} variant="outline">
                      전체 보기
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-center">
            <Link
              href="/mypage"
              className="text-cream/60 text-sm hover:text-cream transition-colors"
            >
              ← 마이페이지로 돌아가기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
