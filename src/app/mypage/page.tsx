'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  User,
  Calendar,
  CreditCard,
  Settings,
  Lock,
  LogOut,
  ChevronRight,
  Crown,
  Gift,
  Bell,
} from 'lucide-react'
import { Button } from '@/components/common/Button'

const mockUser = {
  name: '홍길동',
  email: 'hong@example.com',
  membershipTier: 'Gold',
  points: 125000,
  totalStays: 12,
  upcomingReservations: 2,
  memberSince: '2023-05-15',
}

const menuItems = [
  {
    icon: Calendar,
    label: '예약 내역',
    href: '/mypage/reservations',
    description: '예약 확인 및 관리',
  },
  {
    icon: CreditCard,
    label: '포인트 내역',
    href: '/mypage/points',
    description: '포인트 적립/사용 내역',
  },
  {
    icon: Gift,
    label: '쿠폰함',
    href: '/mypage/coupons',
    description: '보유 쿠폰 확인',
  },
  {
    icon: Bell,
    label: '알림 설정',
    href: '/mypage/notifications',
    description: '알림 및 마케팅 수신 설정',
  },
  {
    icon: Settings,
    label: '회원정보 수정',
    href: '/mypage/profile',
    description: '개인정보 수정',
  },
  {
    icon: Lock,
    label: '비밀번호 변경',
    href: '/mypage/password',
    description: '비밀번호 재설정',
  },
]

const recentReservations = [
  {
    id: 'RSV-2024-001234',
    roomName: 'Grand Deluxe Suite',
    checkIn: '2024-02-15',
    checkOut: '2024-02-17',
    status: 'confirmed',
    guests: 2,
  },
  {
    id: 'RSV-2024-001235',
    roomName: 'Ocean View Premium',
    checkIn: '2024-03-20',
    checkOut: '2024-03-22',
    status: 'pending',
    guests: 2,
  },
]

const statusLabels: Record<string, { label: string; className: string }> = {
  confirmed: { label: '예약완료', className: 'bg-emerald-500/20 text-emerald-400' },
  pending: { label: '대기중', className: 'bg-amber-500/20 text-amber-400' },
  completed: { label: '투숙완료', className: 'bg-blue-500/20 text-blue-400' },
  cancelled: { label: '취소됨', className: 'bg-red-500/20 text-red-400' },
}

const tierColors: Record<string, string> = {
  Classic: 'text-cream/80',
  Gold: 'text-gold',
  Platinum: 'text-blue-300',
  Diamond: 'text-purple-300',
}

export default function MyPage() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPoints = (points: number) => {
    return new Intl.NumberFormat('ko-KR').format(points)
  }

  return (
    <div className="min-h-screen bg-luxe-black py-32">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-luxe-charcoal/50 border border-gold/10 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gold/10">
                  <div className="w-16 h-16 bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <User className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-cream">{mockUser.name}</h2>
                    <p className="text-cream/60 text-sm">{mockUser.email}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-cream/60 text-sm">멤버십 등급</span>
                    <div className="flex items-center gap-2">
                      <Crown className={`w-4 h-4 ${tierColors[mockUser.membershipTier]}`} />
                      <span className={`font-display text-lg ${tierColors[mockUser.membershipTier]}`}>
                        {mockUser.membershipTier}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cream/60 text-sm">보유 포인트</span>
                    <span className="font-display text-lg text-gold">
                      {formatPoints(mockUser.points)} P
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cream/60 text-sm">총 투숙 횟수</span>
                    <span className="text-cream">{mockUser.totalStays}회</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cream/60 text-sm">가입일</span>
                    <span className="text-cream/80 text-sm">
                      {formatDate(mockUser.memberSince)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/membership"
                  className="block text-center text-sm text-gold hover:text-gold-light transition-colors"
                >
                  멤버십 혜택 보기 →
                </Link>
              </div>

              <div className="bg-luxe-charcoal/50 border border-gold/10 divide-y divide-gold/10">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between p-4 hover:bg-gold/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" />
                        <div>
                          <p className="text-cream text-sm group-hover:text-gold transition-colors">
                            {item.label}
                          </p>
                          <p className="text-cream/40 text-xs">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-cream/40 group-hover:text-gold transition-colors" />
                    </Link>
                  )
                })}
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-luxe-charcoal/50 border border-red-500/20
                text-red-400 py-3 px-4 hover:bg-red-500/10 transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="text-sm">로그아웃</span>
              </button>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-luxe-charcoal/50 border border-gold/10 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl text-cream">예약 현황</h3>
                  <Link
                    href="/mypage/reservations"
                    className="text-sm text-gold hover:text-gold-light transition-colors"
                  >
                    전체보기 →
                  </Link>
                </div>

                {mockUser.upcomingReservations > 0 ? (
                  <div className="space-y-4">
                    {recentReservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="bg-luxe-black/50 border border-gold/10 p-4 hover:border-gold/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-display text-lg text-cream">
                              {reservation.roomName}
                            </h4>
                            <p className="text-cream/40 text-xs mt-1">
                              예약번호: {reservation.id}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-3 py-1 ${
                              statusLabels[reservation.status].className
                            }`}
                          >
                            {statusLabels[reservation.status].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-cream/60">
                          <span>
                            {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                          </span>
                          <span>|</span>
                          <span>성인 {reservation.guests}명</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            상세보기
                          </Button>
                          {reservation.status === 'confirmed' && (
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                              예약취소
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-cream/20 mx-auto mb-4" />
                    <p className="text-cream/60 mb-4">예정된 예약이 없습니다</p>
                    <Button href="/reservation" variant="gold" size="sm">
                      객실 예약하기
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-luxe-charcoal/50 border border-gold/10 p-6">
                  <h3 className="font-display text-lg text-cream mb-4">포인트 요약</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cream/60 text-sm">총 적립 포인트</span>
                      <span className="text-cream">+{formatPoints(180000)} P</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream/60 text-sm">총 사용 포인트</span>
                      <span className="text-cream">-{formatPoints(55000)} P</span>
                    </div>
                    <div className="pt-3 border-t border-gold/10 flex justify-between">
                      <span className="text-cream text-sm">잔여 포인트</span>
                      <span className="text-gold font-display text-xl">
                        {formatPoints(mockUser.points)} P
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/mypage/points"
                    className="block text-center text-sm text-gold mt-4 hover:text-gold-light transition-colors"
                  >
                    상세 내역 보기 →
                  </Link>
                </div>

                <div className="bg-luxe-charcoal/50 border border-gold/10 p-6">
                  <h3 className="font-display text-lg text-cream mb-4">보유 쿠폰</h3>
                  <div className="flex items-center justify-center py-6">
                    <div className="text-center">
                      <span className="font-display text-5xl text-gold">3</span>
                      <p className="text-cream/60 text-sm mt-2">사용 가능한 쿠폰</p>
                    </div>
                  </div>
                  <Link
                    href="/mypage/coupons"
                    className="block text-center text-sm text-gold hover:text-gold-light transition-colors"
                  >
                    쿠폰함 보기 →
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 p-6">
                <div className="flex items-center gap-4">
                  <Crown className="w-10 h-10 text-gold" />
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-cream">다음 등급까지</h3>
                    <p className="text-cream/60 text-sm">
                      Platinum 등급까지 3회 더 투숙하세요
                    </p>
                  </div>
                  <Link
                    href="/membership"
                    className="text-gold text-sm hover:text-gold-light transition-colors"
                  >
                    혜택 보기 →
                  </Link>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-luxe-black/50 overflow-hidden">
                    <div className="h-full bg-gold w-[60%]" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-cream/40 text-xs">Gold</span>
                    <span className="text-cream/40 text-xs">12/15회</span>
                    <span className="text-cream/40 text-xs">Platinum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
