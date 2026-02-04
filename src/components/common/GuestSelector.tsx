'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Minus, Plus, ChevronDown } from 'lucide-react'

interface GuestCount {
  adults: number
  children: number
}

interface GuestSelectorProps {
  value: GuestCount
  onChange: (guests: GuestCount) => void
  maxAdults?: number
  maxChildren?: number
  minAdults?: number
  className?: string
  variant?: 'dropdown' | 'inline'
}

function GuestSelector({
  value,
  onChange,
  maxAdults = 6,
  maxChildren = 4,
  minAdults = 1,
  className = '',
  variant = 'dropdown'
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAdultsChange = useCallback((delta: number) => {
    const newValue = Math.max(minAdults, Math.min(maxAdults, value.adults + delta))
    onChange({ ...value, adults: newValue })
  }, [value, onChange, minAdults, maxAdults])

  const handleChildrenChange = useCallback((delta: number) => {
    const newValue = Math.max(0, Math.min(maxChildren, value.children + delta))
    onChange({ ...value, children: newValue })
  }, [value, onChange, maxChildren])

  const totalGuests = value.adults + value.children

  const CounterButton = ({
    onClick,
    disabled,
    children
  }: {
    onClick: () => void
    disabled: boolean
    children: React.ReactNode
  }) => (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      className={`
        w-9 h-9 border border-white/10 flex items-center justify-center
        transition-all duration-300 ease-luxury
        ${disabled
          ? 'text-cream/20 cursor-not-allowed'
          : 'text-cream/60 hover:border-gold/50 hover:text-gold hover:bg-gold/5'
        }
      `}
    >
      {children}
    </motion.button>
  )

  const GuestRow = ({
    label,
    description,
    count,
    onIncrease,
    onDecrease,
    canIncrease,
    canDecrease
  }: {
    label: string
    description: string
    count: number
    onIncrease: () => void
    onDecrease: () => void
    canIncrease: boolean
    canDecrease: boolean
  }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-cream font-body">{label}</p>
        <p className="text-xs text-cream/40">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <CounterButton onClick={onDecrease} disabled={!canDecrease}>
          <Minus className="w-4 h-4" />
        </CounterButton>
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-8 text-center text-cream font-display text-lg"
        >
          {count}
        </motion.span>
        <CounterButton onClick={onIncrease} disabled={!canIncrease}>
          <Plus className="w-4 h-4" />
        </CounterButton>
      </div>
    </div>
  )

  const guestContent = (
    <div className="space-y-4">
      <GuestRow
        label="성인"
        description="만 13세 이상"
        count={value.adults}
        onIncrease={() => handleAdultsChange(1)}
        onDecrease={() => handleAdultsChange(-1)}
        canIncrease={value.adults < maxAdults}
        canDecrease={value.adults > minAdults}
      />

      <div className="border-t border-white/5 pt-4">
        <GuestRow
          label="어린이"
          description="만 12세 이하"
          count={value.children}
          onIncrease={() => handleChildrenChange(1)}
          onDecrease={() => handleChildrenChange(-1)}
          canIncrease={value.children < maxChildren}
          canDecrease={value.children > 0}
        />
      </div>
    </div>
  )

  if (variant === 'inline') {
    return (
      <div className={`bg-luxe-charcoal/50 border border-gold/20 p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-gold" />
          <span className="text-xs tracking-[0.15em] text-gold">인원 선택</span>
        </div>
        {guestContent}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full bg-transparent border border-white/10 px-4 py-3 text-left hover:border-gold/50 transition-all duration-300 ease-luxury"
      >
        <span className="block text-xs tracking-[0.15em] text-gold mb-1">인원</span>
        <span className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-cream">
            <Users className="w-4 h-4 text-cream/40 group-hover:text-gold transition-colors" />
            <span>성인 {value.adults}</span>
            <span className="text-cream/40">|</span>
            <span>어린이 {value.children}</span>
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-cream/40" />
          </motion.div>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-full left-0 right-0 mt-2 bg-luxe-charcoal border border-gold/20 p-6 z-50 shadow-luxury"
            >
              {guestContent}

              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-3 bg-gold/10 border border-gold/30 text-gold text-sm tracking-wider hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
              >
                확인 (총 {totalGuests}명)
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export { GuestSelector }
export type { GuestCount, GuestSelectorProps }
