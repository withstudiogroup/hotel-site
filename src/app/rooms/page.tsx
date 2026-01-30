'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2, Users, Bed } from 'lucide-react'
import { roomCategories } from '@/lib/data/rooms'

export default function RoomsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920"
          alt="Rooms"
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
              <span className="text-gold text-xs tracking-[0.4em] font-accent">ACCOMMODATION</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-6">
              객실
            </h1>

            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              호텔만의 예술적 품격을 갖춘 객실에서
              <br className="hidden md:block" />
              격이 다른 휴식과 여유를 경험해 보세요.
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

      {/* Room Categories */}
      {roomCategories.map((category, categoryIndex) => (
        <RoomCategorySection
          key={category.id}
          category={category}
          index={categoryIndex}
          isEven={categoryIndex % 2 === 0}
        />
      ))}

      {/* CTA Section */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-display-sm text-cream mb-6">
              특별한 순간을 위한 완벽한 선택
            </h2>
            <p className="text-cream/60 mb-8">
              최상의 객실과 서비스로 잊지 못할 경험을 선사합니다.
              지금 바로 예약하고 특별한 혜택을 받아보세요.
            </p>
            <Link href="/reservation" className="btn-luxe-filled">
              객실 예약하기
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function RoomCategorySection({
  category,
  index,
  isEven,
}: {
  category: typeof roomCategories[0]
  index: number
  isEven: boolean
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentRoom, setCurrentRoom] = useState(0)

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % category.rooms.length)
  }

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + category.rooms.length) % category.rooms.length)
  }

  const room = category.rooms[currentRoom]

  return (
    <section
      ref={sectionRef}
      className={`section-luxe ${isEven ? 'bg-luxe-black' : 'bg-luxe-charcoal'}`}
    >
      <div className="container-luxe">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gold text-4xl font-display">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xs tracking-[0.3em] font-accent">
              {category.nameEn.toUpperCase()}
            </span>
          </div>

          <h2 className="font-display text-display-sm text-cream mb-4">
            {category.name}
          </h2>

          <p className="text-cream/60 max-w-xl">
            {category.description}
          </p>
        </motion.div>

        {/* Room Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Image Slider */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={room.images[0]}
                alt={room.name}
                fill
                className="object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/60 via-transparent to-transparent" />

              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-luxe-black/80 backdrop-blur-sm px-4 py-2 border border-gold/20">
                <p className="text-gold text-xl font-display">
                  ₩{room.price.toLocaleString()}
                  <span className="text-cream/40 text-sm">~</span>
                </p>
              </div>
            </div>

            {/* Room Navigation */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {category.rooms.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentRoom(i)}
                    className={`w-8 h-1 transition-all ${
                      i === currentRoom ? 'bg-gold' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevRoom}
                  className="w-10 h-10 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream hover:border-gold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextRoom}
                  className="w-10 h-10 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream hover:border-gold transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Room Info */}
          <div className="lg:pl-8">
            <h3 className="font-display text-3xl text-cream mb-2">
              {room.name}
            </h3>
            <p className="text-gold text-sm tracking-wider mb-6">{room.nameEn}</p>

            <p className="text-cream/60 mb-6 leading-relaxed">
              {room.shortDescription}
            </p>

            {/* Room Specs */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-white/10">
              <div className="text-center">
                <Maximize2 className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-cream text-lg">{room.size}㎡</p>
                <p className="text-cream/40 text-xs">면적</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-cream text-lg">{room.maxGuests}인</p>
                <p className="text-cream/40 text-xs">최대 인원</p>
              </div>
              <div className="text-center">
                <Bed className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-cream text-lg">{room.bedType.join(' / ')}</p>
                <p className="text-cream/40 text-xs">베드 타입</p>
              </div>
            </div>

            {/* Amenities Preview */}
            <div className="mb-8">
              <p className="text-cream/40 text-xs tracking-wider mb-3">주요 어메니티</p>
              <div className="flex flex-wrap gap-2">
                {room.amenities.slice(0, 5).map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1 border border-white/10 text-cream/60 text-sm"
                  >
                    {amenity}
                  </span>
                ))}
                {room.amenities.length > 5 && (
                  <span className="px-3 py-1 text-cream/40 text-sm">
                    +{room.amenities.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link href={`/rooms/${room.slug}`} className="btn-luxe">
                상세 보기
              </Link>
              <Link
                href={`/reservation?room=${room.slug}`}
                className="btn-luxe-filled"
              >
                예약하기
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Room List */}
        {category.rooms.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {category.rooms.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setCurrentRoom(i)}
                className={`group text-left p-4 transition-all ${
                  i === currentRoom
                    ? 'bg-gold/10 border border-gold/30'
                    : 'border border-white/5 hover:border-gold/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`font-display text-lg ${
                      i === currentRoom ? 'text-gold' : 'text-cream group-hover:text-gold'
                    } transition-colors`}>
                      {r.name}
                    </h4>
                    <p className="text-cream/40 text-xs">{r.nameEn}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${
                    i === currentRoom ? 'text-gold' : 'text-cream/20 group-hover:text-gold'
                  } transition-colors`} />
                </div>
                <p className="text-cream/50 text-sm mt-2">
                  {r.size}㎡ · 최대 {r.maxGuests}인
                </p>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
