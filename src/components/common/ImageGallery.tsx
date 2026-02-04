'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  width?: number
  height?: number
}

interface ImageGalleryProps {
  images: GalleryImage[]
  className?: string
  thumbnailsPerRow?: number
  showThumbnails?: boolean
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2'
}

export function ImageGallery({
  images,
  className = '',
  thumbnailsPerRow = 4,
  showThumbnails = true,
  aspectRatio = '16/9',
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const aspectRatioClass = {
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
  }

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index)
    setIsLightboxOpen(true)
    setIsZoomed(false)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
    setIsZoomed(false)
  }, [])

  const goToPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsZoomed(false)
  }, [images.length])

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }, [images.length])

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isLightboxOpen) return

      switch (event.key) {
        case 'ArrowLeft':
          goToPrev()
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'Escape':
          closeLightbox()
          break
      }
    },
    [isLightboxOpen, goToPrev, goToNext, closeLightbox]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLightboxOpen])

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = images[selectedIndex]

  return (
    <div className={`${className}`}>
      <motion.div
        className={`relative ${aspectRatioClass[aspectRatio]} overflow-hidden cursor-pointer group`}
        onClick={() => openLightbox(selectedIndex)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-luxe-black/60 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold">
            <ZoomIn className="w-6 h-6" />
          </div>
        </div>

        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-luxe-black/60 backdrop-blur-sm border border-gold/20 text-cream/80 text-sm tracking-wider">
          {selectedIndex + 1} / {images.length}
        </div>
      </motion.div>

      {showThumbnails && images.length > 1 && (
        <div
          className="grid gap-3 mt-4"
          style={{ gridTemplateColumns: `repeat(${thumbnailsPerRow}, 1fr)` }}
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                relative aspect-square overflow-hidden
                border-2 transition-all duration-300 ease-luxury
                focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-luxe-black
                ${
                  selectedIndex === index
                    ? 'border-gold shadow-gold'
                    : 'border-transparent hover:border-gold/30'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedIndex === index ? 'true' : 'false'}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`
                  object-cover transition-all duration-300
                  ${selectedIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'}
                `}
                sizes="(max-width: 768px) 25vw, 15vw"
              />

              {selectedIndex === index && (
                <motion.div
                  layoutId="thumbnail-indicator"
                  className="absolute inset-0 border-2 border-gold"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-luxe-black/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="
                absolute top-6 right-6 z-20
                w-12 h-12 flex items-center justify-center
                bg-luxe-charcoal/60 backdrop-blur-sm border border-gold/20
                text-cream/80 hover:text-gold hover:border-gold/50
                transition-all duration-300 ease-luxury
                focus:outline-none focus:ring-2 focus:ring-gold/50
              "
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
              className="
                absolute left-6 top-1/2 -translate-y-1/2 z-20
                w-14 h-14 flex items-center justify-center
                bg-luxe-charcoal/60 backdrop-blur-sm border border-gold/20
                text-cream/80 hover:text-gold hover:border-gold/50
                transition-all duration-300 ease-luxury
                focus:outline-none focus:ring-2 focus:ring-gold/50
              "
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="
                absolute right-6 top-1/2 -translate-y-1/2 z-20
                w-14 h-14 flex items-center justify-center
                bg-luxe-charcoal/60 backdrop-blur-sm border border-gold/20
                text-cream/80 hover:text-gold hover:border-gold/50
                transition-all duration-300 ease-luxury
                focus:outline-none focus:ring-2 focus:ring-gold/50
              "
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: isZoomed ? 1.5 : 1,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={`
                relative w-[90vw] h-[80vh] max-w-6xl
                ${isZoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in'}
              `}
              onClick={(e) => {
                e.stopPropagation()
                toggleZoom()
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex(index)
                    setIsZoomed(false)
                  }}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300 ease-luxury
                    focus:outline-none
                    ${
                      selectedIndex === index
                        ? 'w-8 bg-gold'
                        : 'bg-cream/30 hover:bg-cream/50'
                    }
                  `}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute bottom-6 right-6 px-4 py-2 bg-luxe-charcoal/60 backdrop-blur-sm border border-gold/20 text-cream/60 text-sm tracking-wider">
              <span className="text-gold">{selectedIndex + 1}</span> / {images.length}
            </div>

            <div className="absolute bottom-6 left-6 text-cream/40 text-xs tracking-wider">
              <span className="inline-flex items-center gap-2">
                <span className="px-2 py-0.5 border border-cream/20">ESC</span>
                닫기
              </span>
              <span className="inline-flex items-center gap-2 ml-4">
                <span className="px-2 py-0.5 border border-cream/20">←</span>
                <span className="px-2 py-0.5 border border-cream/20">→</span>
                이동
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageGallery
