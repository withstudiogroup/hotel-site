'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Award, Users, Star, Clock } from 'lucide-react'

const stats = [
  { icon: Award, value: '5', label: '성급 호텔', suffix: '' },
  { icon: Users, value: '50,000', label: '연간 고객', suffix: '+' },
  { icon: Star, value: '4.9', label: '고객 평점', suffix: '' },
  { icon: Clock, value: '24', label: '시간 서비스', suffix: 'H' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="section-luxe bg-cream relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c9a96e" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-luxe relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                alt="Luxe Haven Hotel"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 lg:-right-12 bg-luxe-black p-8 max-w-xs hidden md:block"
            >
              <blockquote className="text-cream/80 italic mb-4">
                "고객 한 분 한 분께 특별한 경험을 선사하는 것이 우리의 사명입니다."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-sm font-display">L</span>
                </div>
                <div>
                  <p className="text-cream text-sm">Luxe Haven</p>
                  <p className="text-cream/50 text-xs">General Manager</p>
                </div>
              </div>
            </motion.div>

            {/* Gold Border Accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gold/30" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">ABOUT US</span>
            </div>

            <h2 className="font-display text-display-sm text-luxe-black mb-6">
              Where Every Moment
              <br />
              <span className="text-gold-dark">Becomes a Memory</span>
            </h2>

            <p className="text-luxe-slate mb-6 leading-relaxed">
              전라남도 함평에 위치한 Luxe Haven Hotel은 현대적 럭셔리와
              전통적 환대 정신이 조화를 이루는 프리미엄 호텔입니다.
            </p>

            <p className="text-luxe-slate/70 mb-8 leading-relaxed">
              미쉐린 스타 레스토랑, 월드클래스 스파, 그리고 세심하게 디자인된 객실에서
              잊지 못할 순간을 경험하세요. 우리는 단순한 숙박을 넘어
              평생 기억될 경험을 선사합니다.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 py-8 border-y border-luxe-black/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="font-display text-3xl text-luxe-black">
                    {stat.value}
                    <span className="text-gold">{stat.suffix}</span>
                  </p>
                  <p className="text-luxe-slate/60 text-xs tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="btn-luxe border-luxe-black text-luxe-black hover:text-cream"
              >
                더 알아보기
              </Link>
              <Link
                href="/contact"
                className="text-luxe-black text-sm tracking-wider flex items-center gap-2 hover:text-gold transition-colors"
              >
                오시는 길
                <span className="w-4 h-px bg-current" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Awards & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-luxe-black/10"
        >
          <p className="text-center text-luxe-slate/50 text-xs tracking-[0.3em] mb-8">
            AWARDS & RECOGNITION
          </p>

          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['Forbes Travel Guide', 'Michelin Guide', 'Condé Nast', 'Travel + Leisure'].map(
              (award) => (
                <span
                  key={award}
                  className="text-luxe-black/60 text-sm tracking-widest font-accent"
                >
                  {award}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
