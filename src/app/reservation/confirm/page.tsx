'use client'

import { useState, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Shield,
  Check,
  ArrowLeft,
  Clock,
  Bed,
  Coffee,
  Sparkles,
} from 'lucide-react'

export default function ReservationConfirmPage() {
  return (
    <Suspense fallback={<ConfirmSkeleton />}>
      <ConfirmContent />
    </Suspense>
  )
}

function ConfirmSkeleton() {
  return (
    <div className="min-h-screen bg-luxe-black flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    </div>
  )
}

function ConfirmContent() {
  const searchParams = useSearchParams()
  const reservationId = searchParams.get('id') || 'LH-2024-001234'

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const reservationData = {
    id: reservationId,
    room: {
      name: '프레지덴셜 스위트',
      nameEn: 'Presidential Suite',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      size: 180,
      maxGuests: 4,
      bedType: '킹 베드 2개',
    },
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    nights: 3,
    adults: 2,
    children: 0,
    package: {
      name: '프리미엄',
      description: '조식 + 스파 이용권 + 리조트 머니 10만원',
    },
    pricing: {
      roomRate: 1200000,
      packageRate: 180000,
      subtotal: 1380000,
      tax: 138000,
      total: 4554000,
    },
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
  }

  return (
    <>
      <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920"
          alt="Reservation Confirmation"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/60 to-luxe-black/30" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">
                CONFIRMATION
              </span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-4">
              예약 확인
            </h1>

            <p className="text-cream/70 text-lg">
              예약 정보를 확인하고 결제를 완료해주세요
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 text-cream/60 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">예약 페이지로 돌아가기</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gold/10 border border-gold/30 p-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-gold font-display text-lg">예약 번호</p>
                <p className="text-cream text-2xl font-mono tracking-wider">
                  {reservationData.id}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-luxe-charcoal border border-white/5 p-6"
              >
                <h2 className="font-display text-xl text-cream mb-6 flex items-center gap-3">
                  <Bed className="w-5 h-5 text-gold" />
                  예약 상세
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0 overflow-hidden">
                    <Image
                      src={reservationData.room.image}
                      alt={reservationData.room.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-lg text-cream">
                      {reservationData.room.name}
                    </h3>
                    <p className="text-cream/40 text-xs mb-4">
                      {reservationData.room.nameEn}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-cream/60 text-sm">
                        <Calendar className="w-4 h-4 text-gold" />
                        <div>
                          <p className="text-cream/40 text-xs">체크인</p>
                          <p className="text-cream">{reservationData.checkIn}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-cream/60 text-sm">
                        <Calendar className="w-4 h-4 text-gold" />
                        <div>
                          <p className="text-cream/40 text-xs">체크아웃</p>
                          <p className="text-cream">{reservationData.checkOut}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-cream/60 text-sm">
                        <Clock className="w-4 h-4 text-gold" />
                        <div>
                          <p className="text-cream/40 text-xs">숙박</p>
                          <p className="text-cream">{reservationData.nights}박</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-cream/60 text-sm">
                        <Users className="w-4 h-4 text-gold" />
                        <div>
                          <p className="text-cream/40 text-xs">인원</p>
                          <p className="text-cream">
                            성인 {reservationData.adults}명
                            {reservationData.children > 0 &&
                              `, 아동 ${reservationData.children}명`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span className="text-gold text-sm">
                          {reservationData.package.name} 패키지
                        </span>
                      </div>
                      <p className="text-cream/50 text-xs mt-1">
                        {reservationData.package.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-luxe-charcoal border border-white/5 p-6"
              >
                <h2 className="font-display text-xl text-cream mb-6 flex items-center gap-3">
                  <User className="w-5 h-5 text-gold" />
                  게스트 정보
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream/40 text-xs tracking-wider mb-2">
                        성
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="홍"
                        required
                        className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-cream/40 text-xs tracking-wider mb-2">
                        이름
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="길동"
                        required
                        className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      <Mail className="w-3 h-3 inline mr-2" />
                      이메일
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                      className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      <Phone className="w-3 h-3 inline mr-2" />
                      전화번호
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-1234-5678"
                      required
                      className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      특별 요청 사항 (선택)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="특별한 요청 사항이 있으시면 입력해주세요"
                      rows={4}
                      className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold outline-none transition-colors resize-none"
                    />
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={`/reservation?room=${reservationData.room.nameEn.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex-1 py-4 text-center border border-white/10 text-cream hover:border-gold/30 hover:text-gold transition-all"
                >
                  예약 수정
                </Link>
                <button className="flex-1 py-4 text-center border border-red-500/30 text-red-400 hover:border-red-500 hover:text-red-300 transition-all">
                  예약 취소
                </button>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                <div className="bg-luxe-charcoal border border-white/5 p-6">
                  <h2 className="font-display text-xl text-cream mb-6 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gold" />
                    결제 정보
                  </h2>

                  <div className="space-y-4 pb-6 border-b border-white/5">
                    <div className="flex justify-between">
                      <span className="text-cream/60 text-sm">
                        객실 요금 ({reservationData.nights}박)
                      </span>
                      <span className="text-cream text-sm">
                        ₩
                        {(
                          reservationData.pricing.roomRate * reservationData.nights
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-cream/60 text-sm">
                        패키지 ({reservationData.nights}박)
                      </span>
                      <span className="text-cream text-sm">
                        ₩
                        {(
                          reservationData.pricing.packageRate * reservationData.nights
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-cream/60 text-sm">세금 및 수수료</span>
                      <span className="text-cream text-sm">
                        ₩{reservationData.pricing.tax.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="py-6">
                    <div className="flex justify-between items-end">
                      <span className="text-cream">총 결제 금액</span>
                      <div className="text-right">
                        <p className="text-gold font-display text-3xl">
                          ₩{reservationData.pricing.total.toLocaleString()}
                        </p>
                        <p className="text-cream/40 text-xs">세금 포함</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full btn-luxe-filled py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-luxe-black/30 border-t-luxe-black rounded-full animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        결제 진행
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-cream/40 text-xs">
                    <Shield className="w-4 h-4" />
                    <span>안전한 결제 시스템</span>
                  </div>
                </div>

                <div className="bg-luxe-charcoal/50 border border-white/5 p-4">
                  <h3 className="text-cream text-sm font-medium mb-3">예약 정책</h3>
                  <ul className="space-y-2 text-cream/50 text-xs">
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                      <span>체크인 3일 전까지 무료 취소</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                      <span>체크인: 15:00 / 체크아웃: 11:00</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                      <span>24시간 컨시어지 서비스</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-cream/40 text-xs mb-2">도움이 필요하신가요?</p>
                  <a
                    href="tel:+82-2-1234-5678"
                    className="flex items-center justify-center gap-2 text-gold hover:text-gold/80 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>02-1234-5678</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
