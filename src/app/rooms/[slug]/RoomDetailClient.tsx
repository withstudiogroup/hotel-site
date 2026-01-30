'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Users,
  Bed,
  Eye,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Wind,
  X,
} from 'lucide-react'
import { getRoomBySlug, rooms } from '@/lib/data/rooms'

const amenityIcons: Record<string, typeof Wifi> = {
  '무료 Wi-Fi': Wifi,
  '프리미엄 Wi-Fi': Wifi,
  커피머신: Coffee,
  '네스프레소 머신': Coffee,
  '에스프레소 머신': Coffee,
  '55인치 TV': Tv,
  '65인치 TV': Tv,
  '75인치 TV': Tv,
  '85인치 TV': Tv,
  욕조: Bath,
  '대형 욕조': Bath,
  에어컨: Wind,
  '개별 에어컨': Wind,
}

interface RoomDetailClientProps {
  slug: string
}

export default function RoomDetailClient({ slug }: RoomDetailClientProps) {
  const room = getRoomBySlug(slug)

  const [currentImage, setCurrentImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' })

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxe-black">
        <div className="text-center">
          <h1 className="font-display text-4xl text-cream mb-4">객실을 찾을 수 없습니다</h1>
          <Link href="/rooms" className="btn-luxe">
            객실 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % room.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  // Get related rooms
  const relatedRooms = rooms
    .filter((r) => r.category === room.category && r.id !== room.id)
    .slice(0, 2)

  return (
    <>
      {/* Hero / Gallery */}
      <section className="relative h-[70vh] min-h-[600px]">
        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={room.images[currentImage]}
              alt={room.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-transparent to-luxe-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Back Button */}
        <Link
          href="/rooms"
          className="absolute top-24 left-4 lg:left-8 z-10 flex items-center gap-2 text-cream/70 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wider">객실 목록</span>
        </Link>

        {/* Room Title */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container-luxe pb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold text-xs tracking-[0.3em] font-accent mb-2 block">
                {room.category.toUpperCase()}
              </span>
              <h1 className="font-display text-display-md text-cream mb-2">
                {room.name}
              </h1>
              <p className="text-cream/50 text-lg">{room.nameEn}</p>
            </motion.div>
          </div>
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-8 right-4 lg:right-8 z-10 flex items-center gap-4">
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 text-cream hover:border-gold transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">갤러리</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={prevImage}
              className="w-10 h-10 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream hover:border-gold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-cream/60 text-sm w-16 text-center">
              {currentImage + 1} / {room.images.length}
            </span>
            <button
              onClick={nextImage}
              className="w-10 h-10 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream hover:border-gold transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 hidden lg:flex gap-2 pb-8">
          {room.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`relative w-20 h-14 overflow-hidden border-2 transition-all ${
                i === currentImage ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              {/* Description */}
              <div className="mb-12">
                <h2 className="font-display text-2xl text-cream mb-4 gold-line">개요</h2>
                <p className="text-cream/70 leading-relaxed mt-8">{room.description}</p>
              </div>

              {/* Room Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 py-8 border-y border-white/10">
                <div className="text-center">
                  <Maximize2 className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-cream text-2xl font-display">{room.size}㎡</p>
                  <p className="text-cream/40 text-sm mt-1">면적</p>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-cream text-2xl font-display">{room.maxGuests}인</p>
                  <p className="text-cream/40 text-sm mt-1">최대 인원</p>
                </div>
                <div className="text-center">
                  <Bed className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-cream text-2xl font-display">{room.bedType[0]}</p>
                  <p className="text-cream/40 text-sm mt-1">베드 타입</p>
                </div>
                <div className="text-center">
                  <Eye className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-cream text-2xl font-display">{room.viewType[0]}</p>
                  <p className="text-cream/40 text-sm mt-1">전망</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <h2 className="font-display text-2xl text-cream mb-4 gold-line">어메니티</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Wifi
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-4 border border-white/5 hover:border-gold/20 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-gold shrink-0" />
                        <span className="text-cream/70 text-sm">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Services */}
              <div className="mb-12">
                <h2 className="font-display text-2xl text-cream mb-4 gold-line">서비스</h2>
                <ul className="space-y-3 mt-8">
                  {room.services.map((service) => (
                    <li key={service} className="flex items-start gap-3 text-cream/70">
                      <span className="text-gold mt-1">·</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-display text-2xl text-cream mb-4 gold-line">특징</h2>
                <ul className="space-y-3 mt-8">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-cream/70">
                      <span className="text-gold mt-1">·</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Sidebar - Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="sticky top-28 bg-luxe-charcoal border border-gold/10 p-6">
                <div className="mb-6">
                  <p className="text-cream/40 text-sm mb-2">1박 기준</p>
                  <p className="font-display text-4xl text-gold">
                    ₩{room.price.toLocaleString()}
                    <span className="text-cream/40 text-lg ml-1">~</span>
                  </p>
                </div>

                <div className="divider-gold mb-6" />

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/50">객실 타입</span>
                    <span className="text-cream">{room.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/50">면적</span>
                    <span className="text-cream">{room.size}㎡</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/50">최대 인원</span>
                    <span className="text-cream">{room.maxGuests}명</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/50">베드 타입</span>
                    <span className="text-cream">{room.bedType.join(', ')}</span>
                  </div>
                </div>

                <Link
                  href={`/reservation?room=${room.slug}`}
                  className="btn-luxe-filled w-full text-center mb-4"
                >
                  예약하기
                </Link>

                <p className="text-cream/40 text-xs text-center">
                  * 요금은 시즌에 따라 변동될 수 있습니다
                </p>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-cream/50 text-xs mb-3">문의</p>
                  <p className="text-cream">010-4708-0150</p>
                  <p className="text-cream/50 text-sm">09:00 - 21:00</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      {relatedRooms.length > 0 && (
        <section className="section-luxe bg-luxe-charcoal">
          <div className="container-luxe">
            <h2 className="font-display text-display-sm text-cream text-center mb-12">
              다른 객실 둘러보기
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedRooms.map((r) => (
                <Link key={r.id} href={`/rooms/${r.slug}`} className="group">
                  <div className="card-luxe">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={r.images[0]}
                        alt={r.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/80 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4">
                        <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
                          {r.name}
                        </h3>
                        <p className="text-cream/50 text-sm">{r.nameEn}</p>
                      </div>

                      <div className="absolute bottom-4 right-4 text-right">
                        <p className="text-gold font-display text-xl">
                          ₩{r.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-cream/50 text-sm">
                        <span>{r.size}㎡</span>
                        <span>최대 {r.maxGuests}인</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-luxe-black/95 flex items-center justify-center"
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-cream hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 flex items-center justify-center text-cream hover:border-gold transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-5xl aspect-[16/10] mx-4">
              <Image
                src={room.images[currentImage]}
                alt={room.name}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 flex items-center justify-center text-cream hover:border-gold transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {room.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-12 h-1 transition-all ${
                    i === currentImage ? 'bg-gold' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
