'use client'

import { ReactNode, HTMLAttributes } from 'react'
import Image from 'next/image'
import { motion, HTMLMotionProps } from 'framer-motion'

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  hover?: boolean
}

function Card({ children, hover = true, className = '', ...props }: CardProps) {
  return (
    <motion.div
      className={`
        bg-luxe-charcoal/50 backdrop-blur-sm
        border border-gold/10 overflow-hidden
        transition-all duration-500 ease-luxury
        ${hover ? 'hover:border-gold/30 hover:shadow-gold' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface CardImageProps {
  src: string
  alt: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait'
  overlay?: boolean
  priority?: boolean
}

function CardImage({
  src,
  alt,
  aspectRatio = 'video',
  overlay = true,
  priority = false,
}: CardImageProps) {
  const aspectRatioStyles = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
  }

  return (
    <div className={`relative ${aspectRatioStyles[aspectRatio]} overflow-hidden group`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        priority={priority}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black/60 via-transparent to-transparent" />
      )}
    </div>
  )
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
}

function CardContent({ children, padding = 'md', className = '', ...props }: CardContentProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={`${paddingStyles[padding]} ${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  as?: 'h2' | 'h3' | 'h4'
}

function CardTitle({ children, as: Component = 'h3', className = '', ...props }: CardTitleProps) {
  return (
    <Component
      className={`font-display text-xl lg:text-2xl text-cream tracking-wide ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
  lines?: number
}

function CardDescription({ children, lines, className = '', ...props }: CardDescriptionProps) {
  const lineClampStyle = lines ? `line-clamp-${lines}` : ''

  return (
    <p
      className={`text-cream/60 text-sm leading-relaxed mt-2 ${lineClampStyle} ${className}`}
      {...props}
    >
      {children}
    </p>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function CardFooter({ children, className = '', ...props }: CardFooterProps) {
  return (
    <div
      className={`flex items-center justify-between pt-4 mt-4 border-t border-gold/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardPriceProps {
  price: number
  originalPrice?: number
  currency?: string
  period?: string
}

function CardPrice({ price, originalPrice, currency = 'KRW', period }: CardPriceProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value)
  }

  return (
    <div className="flex flex-col">
      {originalPrice && (
        <span className="text-cream/40 text-xs line-through">
          {currency === 'KRW' ? '₩' : '$'}{formatPrice(originalPrice)}
        </span>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-gold font-display text-xl lg:text-2xl">
          {currency === 'KRW' ? '₩' : '$'}{formatPrice(price)}
        </span>
        {period && (
          <span className="text-cream/40 text-xs">/ {period}</span>
        )}
      </div>
    </div>
  )
}

interface CardBadgeProps {
  children: ReactNode
  variant?: 'gold' | 'new' | 'sale' | 'limited'
}

function CardBadge({ children, variant = 'gold' }: CardBadgeProps) {
  const variantStyles = {
    gold: 'bg-gold/20 text-gold border-gold/30',
    new: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    sale: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    limited: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  }

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1
        text-[10px] uppercase tracking-[0.2em]
        border ${variantStyles[variant]}
      `}
    >
      {children}
    </span>
  )
}

export {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardPrice,
  CardBadge,
}
