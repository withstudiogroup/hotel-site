'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, Check, Tag, Clock, ChevronRight } from 'lucide-react'
import { offers } from '@/lib/data/offers'
import { Card, CardImage, CardContent, CardBadge } from '@/components/common/Card'

const allTags = Array.from(new Set(offers.flatMap((offer) => offer.tags)))

export default function OffersPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredOffers = selectedTag
    ? offers.filter((offer) => offer.tags.includes(selectedTag))
    : offers

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920"
          alt="Special Offers"
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
              <span className="text-gold text-xs tracking-[0.4em] font-accent">SPECIAL OFFERS</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-6">
              특별 오퍼
            </h1>

            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              럭셔리한 경험을 더욱 특별하게 만들어 줄
              <br className="hidden md:block" />
              다양한 프로모션과 패키지를 만나보세요.
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

      {/* Tag Filter */}
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
              onClick={() => setSelectedTag(null)}
              className={`flex items-center gap-2 px-6 py-3 text-sm tracking-wider transition-all ${
                selectedTag === null
                  ? 'bg-gold text-luxe-black'
                  : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
              }`}
            >
              <Tag className="w-4 h-4" />
              전체
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-3 text-sm tracking-wider transition-all ${
                  selectedTag === tag
                    ? 'bg-gold text-luxe-black'
                    : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920"
          alt="Special Package"
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
              EXCLUSIVE BENEFITS
            </span>
            <h2 className="font-display text-display-md text-cream mb-6">
              멤버십 특별 혜택
            </h2>
            <p className="text-cream/70 mb-8">
              럭스 헤이븐 호텔 멤버십에 가입하시면
              추가 할인과 특별한 혜택을 받으실 수 있습니다.
              지금 바로 가입하고 더 많은 혜택을 누려보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/membership" className="btn-luxe-filled">
                멤버십 가입하기
              </Link>
              <Link href="/contact" className="btn-luxe">
                문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function OfferCard({
  offer,
  index,
}: {
  offer: (typeof offers)[0]
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

  return (
    <div ref={cardRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Card className="h-full flex flex-col">
          {/* Image */}
          <div className="relative">
            <CardImage src={offer.image} alt={offer.title} aspectRatio="video" />

            {/* Discount Badge */}
            {offer.discount && (
              <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 text-sm font-bold">
                {offer.discount}% OFF
              </div>
            )}

            {/* Featured Badge */}
            {offer.featured && (
              <div className="absolute top-4 left-4">
                <CardBadge variant="gold">FEATURED</CardBadge>
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="flex-1 flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {offer.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-gold/80 text-[10px] tracking-wider uppercase"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="font-display text-xl text-cream mb-1">{offer.title}</h3>
            <p className="text-cream/50 text-sm mb-3">{offer.subtitle}</p>

            {/* Description */}
            <p className="text-cream/60 text-sm leading-relaxed mb-4 line-clamp-2">
              {offer.description}
            </p>

            {/* Includes */}
            <div className="mb-4">
              <p className="text-cream/40 text-xs tracking-wider mb-2">포함 사항</p>
              <ul className="space-y-1">
                {offer.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-cream/60 text-sm">
                    <Check className="w-3 h-3 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
                {offer.includes.length > 3 && (
                  <li className="text-cream/40 text-sm pl-5">
                    +{offer.includes.length - 3} 더보기
                  </li>
                )}
              </ul>
            </div>

            {/* Valid Period */}
            <div className="flex items-center gap-2 text-cream/50 text-xs mb-6">
              <Calendar className="w-3 h-3" />
              <span>
                {formatDate(offer.validFrom)} - {formatDate(offer.validTo)}
              </span>
            </div>

            {/* Price & CTA */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex items-end justify-between mb-4">
                <div>
                  {offer.originalPrice && (
                    <span className="text-cream/40 text-sm line-through">
                      ₩{offer.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-gold font-display text-2xl">
                      ₩{offer.price.toLocaleString()}
                    </span>
                    <span className="text-cream/40 text-xs">~</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/offers/${offer.slug}`}
                className="btn-luxe-filled w-full flex items-center justify-center gap-2"
              >
                예약하기
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
