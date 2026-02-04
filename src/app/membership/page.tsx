'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Crown, Star, Gem, Award, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'

const membershipTiers = [
  {
    name: 'Classic',
    icon: Star,
    color: 'text-cream/80',
    bgColor: 'from-luxe-charcoal to-luxe-graphite',
    borderColor: 'border-cream/20',
    requirement: '가입 시 자동 부여',
    benefits: [
      '객실 예약 시 5% 포인트 적립',
      '생일 축하 웰컴 드링크',
      '뉴스레터 회원 전용 프로모션',
      '온라인 체크인 서비스',
    ],
    discount: '5%',
    pointRate: '1%',
  },
  {
    name: 'Gold',
    icon: Award,
    color: 'text-gold',
    bgColor: 'from-gold/10 to-luxe-charcoal',
    borderColor: 'border-gold/30',
    requirement: '연간 3회 이상 투숙 또는 100만원 이상 결제',
    benefits: [
      '객실 예약 시 10% 포인트 적립',
      '객실 업그레이드 (가능 시)',
      '레이트 체크아웃 (14:00)',
      '조식 10% 할인',
      '스파 이용 10% 할인',
    ],
    discount: '10%',
    pointRate: '2%',
    popular: true,
  },
  {
    name: 'Platinum',
    icon: Gem,
    color: 'text-blue-300',
    bgColor: 'from-blue-900/20 to-luxe-charcoal',
    borderColor: 'border-blue-400/30',
    requirement: '연간 7회 이상 투숙 또는 300만원 이상 결제',
    benefits: [
      '객실 예약 시 15% 포인트 적립',
      '보장된 객실 업그레이드',
      '레이트 체크아웃 (16:00)',
      '조식 20% 할인',
      '스파 20% 할인',
      '무료 발렛파킹',
      '전용 라운지 이용',
    ],
    discount: '15%',
    pointRate: '3%',
  },
  {
    name: 'Diamond',
    icon: Crown,
    color: 'text-purple-300',
    bgColor: 'from-purple-900/20 to-luxe-charcoal',
    borderColor: 'border-purple-400/30',
    requirement: '연간 15회 이상 투숙 또는 700만원 이상 결제',
    benefits: [
      '객실 예약 시 20% 포인트 적립',
      '최상위 객실 업그레이드',
      '얼리 체크인 & 레이트 체크아웃',
      '조식 무료 제공',
      '스파 30% 할인',
      '무료 발렛파킹',
      'VIP 라운지 무제한 이용',
      '전담 컨시어지 서비스',
      '연간 무료 숙박권 1매',
    ],
    discount: '20%',
    pointRate: '5%',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-luxe-black">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxe-charcoal/50 to-luxe-black" />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />

        <div className="container-luxe relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Membership
            </span>
            <h1 className="font-display text-display-md text-cream mb-6">
              Exclusive Benefits
            </h1>
            <p className="text-cream/60 text-lg leading-relaxed">
              Luxe Haven Hotel 멤버십에 가입하고 특별한 혜택을 누려보세요.
              등급이 올라갈수록 더욱 풍성한 혜택이 기다리고 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {membershipTiers.map((tier, index) => {
              const Icon = tier.icon
              return (
                <motion.div
                  key={tier.name}
                  variants={cardVariants}
                  transition={{ duration: 0.5 }}
                  className={`relative bg-gradient-to-b ${tier.bgColor} border ${tier.borderColor} p-6 lg:p-8
                    ${tier.popular ? 'ring-2 ring-gold' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-luxe-black text-xs font-medium px-4 py-1 tracking-wider uppercase">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 flex items-center justify-center border ${tier.borderColor} bg-luxe-black/30`}>
                      <Icon className={`w-6 h-6 ${tier.color}`} />
                    </div>
                    <div>
                      <h3 className={`font-display text-2xl ${tier.color}`}>{tier.name}</h3>
                      <p className="text-cream/40 text-xs mt-0.5">{tier.requirement}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-6 pb-6 border-b border-gold/10">
                    <div className="flex-1 text-center">
                      <p className="text-cream/40 text-xs mb-1">할인율</p>
                      <p className={`font-display text-2xl ${tier.color}`}>{tier.discount}</p>
                    </div>
                    <div className="w-px bg-gold/10" />
                    <div className="flex-1 text-center">
                      <p className="text-cream/40 text-xs mb-1">포인트</p>
                      <p className={`font-display text-2xl ${tier.color}`}>{tier.pointRate}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-cream/60 text-xs uppercase tracking-wider mb-4">Benefits</p>
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 ${tier.color} shrink-0 mt-0.5`} />
                        <span className="text-cream/80 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-gold/10">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="font-display text-display-sm text-cream mb-4">포인트 안내</h2>
              <p className="text-cream/60">적립된 포인트는 다양한 서비스에서 현금처럼 사용 가능합니다</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-luxe-charcoal/50 border border-gold/10 p-6 text-center">
                <p className="text-gold font-display text-4xl mb-2">1P = 1원</p>
                <p className="text-cream/60 text-sm">포인트 적용</p>
              </div>
              <div className="bg-luxe-charcoal/50 border border-gold/10 p-6 text-center">
                <p className="text-gold font-display text-4xl mb-2">2년</p>
                <p className="text-cream/60 text-sm">포인트 유효기간</p>
              </div>
              <div className="bg-luxe-charcoal/50 border border-gold/10 p-6 text-center">
                <p className="text-gold font-display text-4xl mb-2">10,000P</p>
                <p className="text-cream/60 text-sm">최소 사용 가능 포인트</p>
              </div>
            </div>

            <div className="mt-8 bg-luxe-charcoal/30 border border-gold/10 p-6">
              <h3 className="font-display text-xl text-cream mb-4">포인트 사용처</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['객실 예약', '레스토랑', '스파 & 웰니스', '기프트샵'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold" />
                    <span className="text-cream/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-luxe-black to-luxe-charcoal/30">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-display-sm text-cream mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-cream/60 mb-8">
              무료 회원가입 후 Classic 멤버로 시작하여<br />
              더 높은 등급의 혜택을 누려보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/auth/register"
                variant="gold"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                회원가입
              </Button>
              <Button
                href="/auth/login"
                variant="outline"
                size="lg"
              >
                로그인
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
