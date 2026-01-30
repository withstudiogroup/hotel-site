'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Dumbbell,
  Waves,
  TreePine,
  ShoppingBag,
  Users,
} from 'lucide-react'
import { facilities } from '@/lib/data/facilities'

const categoryIcons: Record<string, typeof Sparkles> = {
  spa: Sparkles,
  fitness: Dumbbell,
  pool: Waves,
  garden: TreePine,
  shopping: ShoppingBag,
  kids: Users,
}

export default function FacilitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')

  const categories = Array.from(new Set(facilities.map((f) => f.category)))

  const filteredFacilities = selectedCategory
    ? facilities.filter((f) => f.category === selectedCategory)
    : facilities

  const openLightbox = (image: string) => {
    setLightboxImage(image)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920"
          alt="Facilities"
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
              <span className="text-gold text-xs tracking-[0.4em] font-accent">EXPERIENCE</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-6">
              부대시설
            </h1>

            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              럭셔리 스파부터 피트니스, 수영장까지
              <br className="hidden md:block" />
              프리미엄 시설에서 완벽한 휴식을 즐기세요.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border border-gold/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-luxe-black border-b border-white/5">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 text-sm tracking-wider transition-all ${
                selectedCategory === null
                  ? 'bg-gold text-luxe-black'
                  : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
              }`}
            >
              전체
            </button>
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Sparkles
              const categoryName =
                category === 'spa'
                  ? '스파'
                  : category === 'fitness'
                  ? '피트니스'
                  : category === 'pool'
                  ? '수영장'
                  : category === 'garden'
                  ? '정원'
                  : category === 'shopping'
                  ? '쇼핑'
                  : category === 'kids'
                  ? '키즈'
                  : category

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm tracking-wider transition-all ${
                    selectedCategory === category
                      ? 'bg-gold text-luxe-black'
                      : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {categoryName}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredFacilities.map((facility, index) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                index={index}
                onImageClick={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured: Spa */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920"
          alt="Spa"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxe-black via-luxe-black/80 to-transparent" />

        <div className="relative z-10 container-luxe">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-gold text-xs tracking-[0.4em] font-accent mb-4 block">
              LUXE SPA
            </span>
            <h2 className="font-display text-display-md text-cream mb-6">
              최고의 휴식을 선사하는<br />
              프리미엄 스파
            </h2>
            <p className="text-cream/70 mb-8 leading-relaxed">
              세계적인 스파 브랜드와 협업하여 선보이는 시그니처 트리트먼트로
              몸과 마음의 균형을 되찾으세요. 전문 테라피스트가 제공하는
              맞춤형 케어로 진정한 힐링을 경험할 수 있습니다.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-white/10">
              <div>
                <p className="font-display text-3xl text-gold">12</p>
                <p className="text-cream/50 text-sm">트리트먼트 룸</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">50+</p>
                <p className="text-cream/50 text-sm">스파 프로그램</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">24H</p>
                <p className="text-cream/50 text-sm">운영시간</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/facilities/spa" className="btn-luxe-filled">
                스파 알아보기
              </Link>
              <Link href="/reservation?tab=spa" className="btn-luxe">
                스파 예약
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-luxe-charcoal">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-display-sm text-cream mb-6">
              멤버십 혜택
            </h2>
            <p className="text-cream/60 mb-8">
              Luxe Haven 멤버십 회원이 되시면 스파, 피트니스, 수영장 등
              모든 부대시설을 특별 할인가로 이용하실 수 있습니다.
              지금 멤버십에 가입하고 다양한 혜택을 누려보세요.
            </p>
            <Link href="/membership" className="btn-luxe-filled">
              멤버십 안내
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="py-20 bg-luxe-black">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-display-sm text-cream">운영 안내</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {facilities.slice(0, 6).map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-luxe-charcoal p-6 border border-white/5"
              >
                <h3 className="font-display text-lg text-cream mb-1">{facility.name}</h3>
                <p className="text-gold text-xs tracking-wider mb-4">{facility.nameEn}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cream/60 text-sm">
                    <Clock className="w-4 h-4 text-gold/50" />
                    {facility.hours}
                  </div>
                  <div className="flex items-center gap-2 text-cream/60 text-sm">
                    <MapPin className="w-4 h-4 text-gold/50" />
                    {facility.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxe-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 flex items-center justify-center text-cream hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Facility"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FacilityCard({
  facility,
  index,
  onImageClick,
}: {
  facility: (typeof facilities)[0]
  index: number
  onImageClick: (image: string) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % facility.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + facility.images.length) % facility.images.length)
  }

  const Icon = categoryIcons[facility.category] || Sparkles

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="card-luxe overflow-hidden">
        {/* Image Slider */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={facility.images[currentImage]}
            alt={facility.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
            onClick={() => onImageClick(facility.images[currentImage])}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/60 via-transparent to-transparent" />

          {/* Navigation */}
          {facility.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:border-gold"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:border-gold"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {facility.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImage(i)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-luxe-black/80 backdrop-blur-sm px-3 py-1.5 border border-gold/20 flex items-center gap-2">
            <Icon className="w-4 h-4 text-gold" />
            <span className="text-cream text-xs tracking-wider">
              {facility.category === 'spa'
                ? '스파'
                : facility.category === 'fitness'
                ? '피트니스'
                : facility.category === 'pool'
                ? '수영장'
                : facility.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl text-cream mb-1 group-hover:text-gold transition-colors">
            {facility.name}
          </h3>
          <p className="text-cream/40 text-xs tracking-wider mb-4">{facility.nameEn}</p>

          <p className="text-cream/60 text-sm mb-6 line-clamp-2">{facility.description}</p>

          {/* Info */}
          <div className="flex items-center gap-4 text-cream/50 text-xs mb-6">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {facility.hours}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {facility.location}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {facility.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 border border-white/10 text-cream/60 text-xs"
              >
                {feature}
              </span>
            ))}
            {facility.features.length > 3 && (
              <span className="px-3 py-1 text-cream/40 text-xs">
                +{facility.features.length - 3}
              </span>
            )}
          </div>

          {/* CTA */}
          <Link
            href={`/facilities/${facility.slug}`}
            className="btn-luxe w-full justify-center flex items-center gap-2"
          >
            자세히 보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
