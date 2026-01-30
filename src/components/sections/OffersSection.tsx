'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { getFeaturedOffers } from '@/lib/data/offers'

export default function OffersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const offers = getFeaturedOffers()

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section ref={sectionRef} className="section-luxe bg-luxe-black relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
      </div>

      <div className="container-luxe relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div>
            {/* Label */}
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">EXCLUSIVE</span>
            </div>

            <h2 className="font-display text-display-md text-cream mb-4">
              Special Offers
            </h2>

            <p className="text-cream/60 max-w-xl">
              특별한 순간을 위한 엄선된 패키지. 럭셔리한 객실부터 다이닝, 스파까지
              모든 것이 준비된 프리미엄 오퍼를 만나보세요.
            </p>
          </div>

          {/* Navigation & View All */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              href="/offers"
              className="hidden lg:flex items-center gap-2 text-gold text-sm tracking-wider hover:gap-4 transition-all"
            >
              <span>전체보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Offers Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="flex-shrink-0 w-[340px] lg:w-[380px]"
            >
              <Link href={`/offers/${offer.slug}`} className="group block">
                <div className="card-luxe">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-transparent to-transparent opacity-60" />

                    {/* Discount Badge */}
                    {offer.discount && (
                      <div className="absolute top-4 left-4 bg-gold px-3 py-1">
                        <span className="text-luxe-black text-xs font-medium tracking-wider">
                          {offer.discount}% OFF
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {offer.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-luxe-black/60 backdrop-blur-sm text-cream/80 text-xs tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="font-display text-xl text-cream mb-1 group-hover:text-gold transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-cream/50 text-sm">{offer.subtitle}</p>
                    </div>

                    {/* Includes */}
                    <ul className="space-y-1 mb-6">
                      {offer.includes.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-cream/60 text-sm flex items-start gap-2">
                          <span className="text-gold mt-1.5">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="flex items-end justify-between border-t border-white/5 pt-4">
                      <div>
                        {offer.originalPrice && (
                          <p className="text-cream/40 text-sm line-through">
                            ₩{offer.originalPrice.toLocaleString()}
                          </p>
                        )}
                        <p className="text-gold text-2xl font-display">
                          ₩{offer.price.toLocaleString()}
                          <span className="text-sm text-cream/40 ml-1">~</span>
                        </p>
                      </div>
                      <span className="text-gold/60 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        자세히 <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All */}
        <div className="lg:hidden text-center mt-8">
          <Link href="/offers" className="btn-luxe">
            전체 오퍼 보기
          </Link>
        </div>
      </div>
    </section>
  )
}
