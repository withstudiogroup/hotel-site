'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Calendar, Users, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '@/lib/data/offers'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // Booking state
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false)

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  // Set default dates
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0]
    }

    setCheckIn(formatDate(today))
    setCheckOut(formatDate(tomorrow))
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-luxe-black/60 via-transparent to-luxe-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        {/* Hero Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-12"
          >
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-px bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">LUXE HAVEN HOTEL</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-xl text-cream mb-6 text-shadow-luxe">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-xl md:text-2xl text-cream/70 font-light tracking-wide mb-10">
              {heroSlides[currentSlide].subtitle}
            </p>

            {heroSlides[currentSlide].cta && (
              <Link
                href={heroSlides[currentSlide].cta!.href}
                className="btn-luxe text-sm"
              >
                {heroSlides[currentSlide].cta!.text}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4"
        >
          <div className="backdrop-luxe border border-gold/20 p-6 md:p-8">
            {/* Desktop Booking Form */}
            <div className="hidden md:grid grid-cols-4 gap-4 items-end">
              {/* Check-in/Check-out */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.2em] text-gold mb-3">체크인</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] text-gold mb-3">체크아웃</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-xs tracking-[0.2em] text-gold mb-3">인원</label>
                <button
                  onClick={() => setIsGuestSelectorOpen(!isGuestSelectorOpen)}
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-cream flex items-center justify-between hover:border-gold/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cream/40" />
                    <span>성인 {adults}</span>
                    <span className="text-cream/40">|</span>
                    <span>어린이 {children}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-cream/40 transition-transform ${isGuestSelectorOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Guest Selector Dropdown */}
                <AnimatePresence>
                  {isGuestSelectorOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-luxe-charcoal border border-gold/20 p-6 z-50"
                    >
                      {/* Adults */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                        <div>
                          <p className="text-cream">성인</p>
                          <p className="text-xs text-cream/40">만 13세 이상</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream/60 hover:border-gold/50 hover:text-gold transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-cream">{adults}</span>
                          <button
                            onClick={() => setAdults(Math.min(6, adults + 1))}
                            className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream/60 hover:border-gold/50 hover:text-gold transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-cream">어린이</p>
                          <p className="text-xs text-cream/40">만 12세 이하</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream/60 hover:border-gold/50 hover:text-gold transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-cream">{children}</span>
                          <button
                            onClick={() => setChildren(Math.min(4, children + 1))}
                            className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream/60 hover:border-gold/50 hover:text-gold transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsGuestSelectorOpen(false)}
                        className="w-full mt-4 py-2 bg-gold/10 text-gold text-sm tracking-wider hover:bg-gold/20 transition-colors"
                      >
                        확인
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Button */}
              <Link
                href={`/reservation?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`}
                className="btn-luxe-filled py-3.5 text-center"
              >
                객실 검색
              </Link>
            </div>

            {/* Mobile Booking Button */}
            <div className="md:hidden">
              <Link
                href="/reservation"
                className="btn-luxe-filled w-full py-4 text-center"
              >
                객실 예약하기
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative overflow-hidden transition-all duration-500 ${
                currentSlide === index
                  ? 'w-12 h-1 bg-gold'
                  : 'w-4 h-1 bg-white/30 hover:bg-white/50'
              }`}
            >
              {currentSlide === index && (
                <motion.div
                  className="absolute inset-0 bg-gold-light"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Slide Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold/50 hover:text-gold transition-colors hidden lg:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold/50 hover:text-gold transition-colors hidden lg:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-cream/40"
        >
          <span className="text-xs tracking-[0.2em] rotate-90 origin-center translate-y-8">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent mt-8"
          />
        </motion.div>
      </div>

      {/* Side Decorative Elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <span className="text-xs tracking-[0.3em] text-gold/50 rotate-90 origin-center whitespace-nowrap">
          EST. 2020
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>
    </section>
  )
}
