'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { events } from '@/lib/data/offers'

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <section ref={sectionRef} className="section-luxe bg-luxe-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a96e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">EXPERIENCE</span>
            </div>

            <h2 className="font-display text-display-md text-cream mb-4">
              Events & Exhibitions
            </h2>

            <p className="text-cream/60 max-w-xl">
              특별한 이벤트와 전시를 통해 럭셔리한 문화 경험을 제공합니다.
            </p>
          </div>

          <Link
            href="/events"
            className="btn-luxe"
          >
            전체 이벤트
          </Link>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link href={`/events/${event.slug}`} className="group block">
                <div className="card-luxe h-full">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-transparent to-transparent opacity-60" />

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-luxe-black/80 backdrop-blur-sm px-4 py-2 border border-gold/20">
                      <div className="flex items-center gap-2 text-gold text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.startDate)}</span>
                        {event.startDate !== event.endDate && (
                          <>
                            <span className="text-cream/40">~</span>
                            <span>{formatDate(event.endDate)}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-gold text-luxe-black text-xs tracking-wider uppercase">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-cream/50 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="text-cream/40 text-xs">
                        {event.location}
                      </span>
                      <span className="text-gold/60 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        자세히 <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Event */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          {events[3] && (
            <Link href={`/events/${events[3].slug}`} className="group block">
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src={events[3].image}
                  alt={events[3].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-luxe-black via-luxe-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container-luxe">
                    <div className="max-w-xl">
                      <span className="text-gold text-xs tracking-[0.3em] font-accent mb-4 block">
                        FEATURED EVENT
                      </span>
                      <h3 className="font-display text-3xl lg:text-4xl text-cream mb-4 group-hover:text-gold transition-colors">
                        {events[3].title}
                      </h3>
                      <p className="text-cream/60 mb-6 hidden md:block">
                        {events[3].description}
                      </p>
                      <span className="btn-luxe">
                        자세히 보기
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}
