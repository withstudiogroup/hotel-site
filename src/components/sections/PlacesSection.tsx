'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const places = [
  {
    id: 'suite',
    title: 'LUXURY SUITE',
    titleKo: '럭셔리 스위트',
    description: '최상의 휴식과 품격있는 서비스. 도심 속 프라이빗 리트릿에서 완벽한 여유를 경험하세요.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
    href: '/rooms?category=suite',
    stats: { rooms: 12, size: '68-150㎡' },
  },
  {
    id: 'spa',
    title: 'SPA & WELLNESS',
    titleKo: '스파 & 웰니스',
    description: '전문 테라피스트의 시그니처 트리트먼트로 몸과 마음을 재충전하세요.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200',
    href: '/facilities/spa',
    stats: { rooms: 8, size: '60분~' },
  },
  {
    id: 'pool',
    title: 'INFINITY POOL',
    titleKo: '인피니티 풀',
    description: '하늘과 맞닿은 듯한 인피니티 풀에서 도시의 스카이라인을 감상하세요.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
    href: '/facilities/outdoor-pool',
    stats: { hours: '06:00-22:00' },
  },
  {
    id: 'dining',
    title: 'FINE DINING',
    titleKo: '파인 다이닝',
    description: '미쉐린 스타 셰프가 선보이는 예술적인 요리의 세계로 초대합니다.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    href: '/dining',
    stats: { restaurants: 5 },
  },
]

const quickLinks = [
  { name: 'SPA', nameKo: '스파', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', href: '/facilities/spa' },
  { name: 'POOL', nameKo: '수영장', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400', href: '/facilities/outdoor-pool' },
  { name: 'DINING', nameKo: '다이닝', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400', href: '/dining' },
  { name: 'LOUNGE', nameKo: '라운지', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400', href: '/facilities/club-lounge' },
]

export default function PlacesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentPlace, setCurrentPlace] = useState(0)

  const nextPlace = () => {
    setCurrentPlace((prev) => (prev + 1) % places.length)
  }

  const prevPlace = () => {
    setCurrentPlace((prev) => (prev - 1 + places.length) % places.length)
  }

  return (
    <section ref={sectionRef} className="section-luxe bg-luxe-charcoal relative overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xs tracking-[0.4em] font-accent">DISCOVER</span>
            <span className="w-12 h-px bg-gold/30" />
          </div>

          <h2 className="font-display text-display-md text-cream mb-4">
            Special Places
          </h2>

          <p className="text-cream/60 max-w-2xl mx-auto">
            럭셔리한 객실부터 월드클래스 스파, 미쉐린 다이닝까지
            잊지 못할 경험이 당신을 기다립니다.
          </p>
        </motion.div>

        {/* Main Place Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-0">
            {/* Image Side */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlace}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={places[currentPlace].image}
                    alt={places[currentPlace].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-luxe-charcoal/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxe-charcoal to-transparent lg:hidden" />
                </motion.div>
              </AnimatePresence>

              {/* Slide Counter */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4 z-10">
                <span className="text-gold text-4xl font-display">
                  {String(currentPlace + 1).padStart(2, '0')}
                </span>
                <span className="text-cream/40 text-sm">/</span>
                <span className="text-cream/40 text-sm">
                  {String(places.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 flex items-center">
              <div className="w-full p-8 lg:p-16 lg:pl-24">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPlace}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-gold text-xs tracking-[0.3em] font-accent mb-4 block">
                      {places[currentPlace].titleKo}
                    </span>

                    <h3 className="font-display text-4xl lg:text-5xl text-cream mb-6">
                      {places[currentPlace].title}
                    </h3>

                    <p className="text-cream/60 text-lg mb-8 max-w-md">
                      {places[currentPlace].description}
                    </p>

                    <Link
                      href={places[currentPlace].href}
                      className="btn-luxe"
                    >
                      자세히 보기
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center gap-4 mt-12">
                  <button
                    onClick={prevPlace}
                    className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPlace}
                    className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Progress Bars */}
                  <div className="flex-1 flex gap-2 ml-4">
                    {places.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPlace(index)}
                        className={`h-1 flex-1 transition-all duration-300 ${
                          index === currentPlace ? 'bg-gold' : 'bg-white/10 hover:bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {quickLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={link.image}
                alt={link.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-luxe-black/50 group-hover:bg-luxe-black/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gold text-xs tracking-[0.3em] font-accent mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  {link.nameKo}
                </span>
                <span className="font-display text-xl lg:text-2xl text-cream">
                  {link.name}
                </span>
                <ArrowRight className="w-5 h-5 text-gold mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
              </div>
              {/* Border Animation */}
              <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/30 transition-colors" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
