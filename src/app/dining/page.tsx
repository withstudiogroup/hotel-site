'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Clock,
  MapPin,
  Phone,
  Star,
  Users,
  ChevronRight,
  Utensils,
  Wine,
  Coffee,
  Cake,
} from 'lucide-react'
import { restaurants } from '@/lib/data/facilities'

const cuisineIcons: Record<string, typeof Utensils> = {
  'Korean Fine Dining': Utensils,
  'Italian Fine Dining': Wine,
  'Japanese Omakase': Utensils,
  'All-Day Dining': Coffee,
  'Lounge & Bar': Wine,
  'Bakery & Café': Cake,
}

export default function DiningPage() {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)

  const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine)))

  const filteredRestaurants = selectedCuisine
    ? restaurants.filter((r) => r.cuisine === selectedCuisine)
    : restaurants

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
          alt="Dining"
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
              <span className="text-gold text-xs tracking-[0.4em] font-accent">CULINARY</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-6">
              다이닝
            </h1>

            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              미쉐린 스타 셰프들이 선보이는 세계 각국의 미식 여행
              <br className="hidden md:block" />
              최고의 식재료와 정성으로 준비한 특별한 맛을 경험하세요.
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

      {/* Cuisine Filter */}
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
              onClick={() => setSelectedCuisine(null)}
              className={`px-6 py-3 text-sm tracking-wider transition-all ${
                selectedCuisine === null
                  ? 'bg-gold text-luxe-black'
                  : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
              }`}
            >
              전체
            </button>
            {cuisines.map((cuisine) => {
              const Icon = cuisineIcons[cuisine] || Utensils
              return (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm tracking-wider transition-all ${
                    selectedCuisine === cuisine
                      ? 'bg-gold text-luxe-black'
                      : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cuisine}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <div className="space-y-24">
            {filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Private Dining CTA */}
      <section className="relative py-32">
        <Image
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920"
          alt="Private Dining"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-luxe-black/70" />

        <div className="relative z-10 container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-gold text-xs tracking-[0.4em] font-accent mb-4 block">
              PRIVATE DINING
            </span>
            <h2 className="font-display text-display-md text-cream mb-6">
              프라이빗 다이닝
            </h2>
            <p className="text-cream/70 mb-8">
              특별한 날을 위한 프라이빗 다이닝 서비스를 제공합니다.
              비즈니스 미팅, 가족 행사, 기념일 등 소중한 순간을
              더욱 특별하게 만들어 드립니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-luxe-filled">
                예약 문의
              </Link>
              <a href="tel:010-4708-0150" className="btn-luxe flex items-center gap-2">
                <Phone className="w-4 h-4" />
                010-4708-0150
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="py-20 bg-luxe-charcoal">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-display-sm text-cream">운영 시간</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-luxe-black p-6 border border-white/5"
              >
                <h3 className="font-display text-lg text-cream mb-1">{restaurant.name}</h3>
                <p className="text-gold text-xs tracking-wider mb-4">{restaurant.cuisine}</p>
                <div className="space-y-2">
                  {restaurant.hours.split(' / ').map((hour, i) => (
                    <div key={i} className="flex items-center gap-2 text-cream/60 text-sm">
                      <Clock className="w-4 h-4 text-gold/50" />
                      {hour}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function RestaurantCard({
  restaurant,
  index,
  isReversed,
}: {
  restaurant: (typeof restaurants)[0]
  index: number
  isReversed: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <div ref={cardRef}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          isReversed ? 'lg:direction-rtl' : ''
        }`}
      >
        {/* Image */}
        <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/60 via-transparent to-transparent" />

            {/* Badge */}
            {restaurant.michelinStars && (
              <div className="absolute top-4 right-4 bg-luxe-black/80 backdrop-blur-sm px-4 py-2 border border-gold/20">
                <div className="flex items-center gap-1">
                  {Array.from({ length: restaurant.michelinStars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-cream/60 text-xs mt-1">Michelin Star</p>
              </div>
            )}
          </div>

          {/* Decorative */}
          <div
            className={`absolute -bottom-4 ${
              isReversed ? '-left-4' : '-right-4'
            } w-32 h-32 border border-gold/20 -z-10`}
          />
        </div>

        {/* Content */}
        <div className={`${isReversed ? 'lg:order-1 lg:text-right lg:direction-ltr' : ''}`}>
          <div className={`flex items-center gap-4 mb-4 ${isReversed ? 'lg:justify-end' : ''}`}>
            <span className="text-gold text-4xl font-display">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xs tracking-[0.3em] font-accent">
              {restaurant.cuisine.toUpperCase()}
            </span>
          </div>

          <h2 className="font-display text-display-sm text-cream mb-2">{restaurant.name}</h2>
          <p className="text-cream/40 text-sm tracking-wider mb-6">{restaurant.nameEn}</p>

          <p className="text-cream/60 leading-relaxed mb-8">{restaurant.description}</p>

          {/* Info */}
          <div
            className={`flex flex-wrap gap-6 mb-8 ${isReversed ? 'lg:justify-end' : ''}`}
          >
            <div className={`flex items-center gap-2 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
              <Clock className="w-4 h-4 text-gold" />
              <span className="text-cream/70 text-sm">{restaurant.hours.split(' / ')[0]}</span>
            </div>
            <div className={`flex items-center gap-2 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-cream/70 text-sm">{restaurant.location}</span>
            </div>
            <div className={`flex items-center gap-2 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
              <Users className="w-4 h-4 text-gold" />
              <span className="text-cream/70 text-sm">최대 {restaurant.capacity}석</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-8">
            <p className="text-cream/40 text-xs tracking-wider mb-3">시그니처 메뉴</p>
            <div className={`flex flex-wrap gap-2 ${isReversed ? 'lg:justify-end' : ''}`}>
              {restaurant.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1 border border-white/10 text-cream/60 text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className={`flex flex-wrap gap-4 ${isReversed ? 'lg:justify-end' : ''}`}>
            <Link
              href={`/dining/${restaurant.slug}`}
              className="btn-luxe flex items-center gap-2"
            >
              자세히 보기
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/reservation?tab=dining" className="btn-luxe-filled">
              예약하기
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
