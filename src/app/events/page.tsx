'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Utensils, Palette, Gift, Music } from 'lucide-react'
import { events } from '@/lib/data/offers'
import { Card, CardImage, CardContent, CardBadge } from '@/components/common/Card'

const categories = [
  { id: 'all', name: '전체', icon: null },
  { id: 'dining', name: '다이닝', icon: Utensils },
  { id: 'exhibition', name: '전시', icon: Palette },
  { id: 'promotion', name: '프로모션', icon: Gift },
  { id: 'entertainment', name: '엔터테인먼트', icon: Music },
]

const categoryBadgeVariant: Record<string, 'gold' | 'new' | 'sale' | 'limited'> = {
  dining: 'gold',
  exhibition: 'new',
  promotion: 'sale',
  entertainment: 'limited',
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredEvents =
    selectedCategory === 'all'
      ? events
      : events.filter((event) => event.category === selectedCategory)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
          alt="Events"
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
              <span className="text-gold text-xs tracking-[0.4em] font-accent">EVENTS & EXHIBITIONS</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-6">
              이벤트
            </h1>

            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              럭스 헤이븐 호텔에서 진행되는 다양한 이벤트와
              <br className="hidden md:block" />
              문화 프로그램을 경험해 보세요.
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
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm tracking-wider transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gold text-luxe-black'
                      : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {category.name}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-cream/50 text-lg">
                해당 카테고리의 이벤트가 없습니다.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-32">
        <Image
          src="https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1920"
          alt="Stay Updated"
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
              STAY UPDATED
            </span>
            <h2 className="font-display text-display-md text-cream mb-6">
              뉴스레터 구독
            </h2>
            <p className="text-cream/70 mb-8">
              럭스 헤이븐 호텔의 최신 이벤트와 특별 프로모션 소식을
              가장 먼저 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button className="btn-luxe-filled whitespace-nowrap">
                구독하기
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function EventCard({
  event,
  index,
}: {
  event: (typeof events)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    if (startDate === endDate) {
      return formatDate(startDate)
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  const getCategoryName = (category: string) => {
    const cat = categories.find((c) => c.id === category)
    return cat?.name || category
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dining':
        return Utensils
      case 'exhibition':
        return Palette
      case 'promotion':
        return Gift
      case 'entertainment':
        return Music
      default:
        return Calendar
    }
  }

  const CategoryIcon = getCategoryIcon(event.category)

  return (
    <div ref={cardRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Card className="h-full flex flex-col group">
          {/* Image */}
          <div className="relative">
            <CardImage src={event.image} alt={event.title} aspectRatio="video" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <CardBadge variant={categoryBadgeVariant[event.category] || 'gold'}>
                <CategoryIcon className="w-3 h-3 mr-1" />
                {getCategoryName(event.category)}
              </CardBadge>
            </div>
          </div>

          {/* Content */}
          <CardContent className="flex-1 flex flex-col">
            {/* Title */}
            <h3 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors">
              {event.title}
            </h3>
            <p className="text-cream/40 text-xs tracking-wider mb-3">{event.titleEn}</p>

            {/* Description */}
            <p className="text-cream/60 text-sm leading-relaxed mb-6 line-clamp-3">
              {event.description}
            </p>

            {/* Info */}
            <div className="mt-auto space-y-3">
              <div className="flex items-center gap-2 text-cream/50 text-sm">
                <Calendar className="w-4 h-4 text-gold/70" />
                <span>{formatDateRange(event.startDate, event.endDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-cream/50 text-sm">
                <MapPin className="w-4 h-4 text-gold/70" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href={`/events/${event.slug}`}
                className="btn-luxe w-full text-center"
              >
                자세히 보기
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
