'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
  slidesPerView?: {
    default: number
    md?: number
    lg?: number
  }
  gap?: number
  className?: string
}

export function Carousel({
  children,
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
  slidesPerView = { default: 1, md: 2, lg: 3 },
  gap = 24,
  className = '',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(slidesPerView.default)
  const [isDragging, setIsDragging] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalSlides = children.length
  const maxIndex = Math.max(0, totalSlides - currentSlidesPerView)

  const updateSlidesPerView = useCallback(() => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    if (width >= 1024 && slidesPerView.lg) {
      setCurrentSlidesPerView(slidesPerView.lg)
    } else if (width >= 768 && slidesPerView.md) {
      setCurrentSlidesPerView(slidesPerView.md)
    } else {
      setCurrentSlidesPerView(slidesPerView.default)
    }
  }, [slidesPerView])

  useEffect(() => {
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [updateSlidesPerView])

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [currentIndex, maxIndex])

  const startAutoPlay = useCallback(() => {
    if (!autoPlay) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, interval)
  }, [autoPlay, interval, maxIndex])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])

  const goToSlide = useCallback((index: number) => {
    stopAutoPlay()
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
    startAutoPlay()
  }, [maxIndex, startAutoPlay, stopAutoPlay])

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1)
  }, [currentIndex, goToSlide, maxIndex])

  const goToNext = useCallback(() => {
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1)
  }, [currentIndex, goToSlide, maxIndex])

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false)
      const swipeThreshold = 50

      if (info.offset.x > swipeThreshold) {
        goToPrev()
      } else if (info.offset.x < -swipeThreshold) {
        goToNext()
      }
    },
    [goToPrev, goToNext]
  )

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    stopAutoPlay()
  }, [stopAutoPlay])

  const slideWidth = `calc((100% - ${gap * (currentSlidesPerView - 1)}px) / ${currentSlidesPerView})`

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{
            x: `calc(-${currentIndex} * (${slideWidth} + ${gap}px))`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{ width: slideWidth }}
              whileHover={{ scale: isDragging ? 1 : 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {showArrows && totalSlides > currentSlidesPerView && (
        <>
          <button
            onClick={goToPrev}
            className="
              absolute left-4 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 flex items-center justify-center
              bg-luxe-black/60 backdrop-blur-sm border border-gold/20
              text-cream/80 hover:text-gold hover:border-gold/50
              transition-all duration-300 ease-luxury
              opacity-0 group-hover:opacity-100
              focus:outline-none focus:ring-2 focus:ring-gold/50
            "
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="
              absolute right-4 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 flex items-center justify-center
              bg-luxe-black/60 backdrop-blur-sm border border-gold/20
              text-cream/80 hover:text-gold hover:border-gold/50
              transition-all duration-300 ease-luxury
              opacity-0 group-hover:opacity-100
              focus:outline-none focus:ring-2 focus:ring-gold/50
            "
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {showDots && totalSlides > currentSlidesPerView && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300 ease-luxury
                focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-luxe-black
                ${
                  currentIndex === index
                    ? 'w-8 bg-gold'
                    : 'bg-gold/30 hover:bg-gold/50'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CarouselItemProps {
  children: React.ReactNode
  className?: string
}

export function CarouselItem({ children, className = '' }: CarouselItemProps) {
  return (
    <div className={`h-full ${className}`}>
      {children}
    </div>
  )
}

export default Carousel
