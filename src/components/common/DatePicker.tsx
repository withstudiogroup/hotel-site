'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface DateRange {
  checkIn: Date | null
  checkOut: Date | null
}

interface DatePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
  minDate?: Date
  className?: string
  placeholder?: {
    checkIn?: string
    checkOut?: string
  }
}

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
]

function DatePicker({
  value,
  onChange,
  minDate = new Date(),
  className = '',
  placeholder = { checkIn: '체크인', checkOut: '체크아웃' }
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectingCheckOut, setSelectingCheckOut] = useState(false)

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const normalizedMinDate = useMemo(() => {
    const d = new Date(minDate)
    d.setHours(0, 0, 0, 0)
    return d
  }, [minDate])

  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (Date | null)[] = []

    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [])

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth, getDaysInMonth])

  const nextMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const prevMonth = useCallback(() => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(newMonth)
    }
  }, [currentMonth, today])

  const isDateDisabled = useCallback((date: Date | null) => {
    if (!date) return true
    return date < normalizedMinDate
  }, [normalizedMinDate])

  const isDateInRange = useCallback((date: Date | null) => {
    if (!date || !value.checkIn || !value.checkOut) return false
    return date > value.checkIn && date < value.checkOut
  }, [value.checkIn, value.checkOut])

  const isCheckIn = useCallback((date: Date | null) => {
    if (!date || !value.checkIn) return false
    return date.toDateString() === value.checkIn.toDateString()
  }, [value.checkIn])

  const isCheckOut = useCallback((date: Date | null) => {
    if (!date || !value.checkOut) return false
    return date.toDateString() === value.checkOut.toDateString()
  }, [value.checkOut])

  const handleDateClick = useCallback((date: Date | null) => {
    if (!date || isDateDisabled(date)) return

    if (!selectingCheckOut || !value.checkIn || date < value.checkIn) {
      onChange({ checkIn: date, checkOut: null })
      setSelectingCheckOut(true)
    } else {
      onChange({ ...value, checkOut: date })
      setSelectingCheckOut(false)
      setIsOpen(false)
    }
  }, [selectingCheckOut, value, onChange, isDateDisabled])

  const formatDate = useCallback((date: Date | null) => {
    if (!date) return ''
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }, [])

  const canGoPrev = useMemo(() => {
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    return prevMonthDate >= new Date(today.getFullYear(), today.getMonth(), 1)
  }, [currentMonth, today])

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectingCheckOut(false)
            setIsOpen(true)
          }}
          className="group w-full bg-transparent border border-white/10 px-4 py-3 text-left hover:border-gold/50 transition-all duration-300 ease-luxury"
        >
          <span className="block text-xs tracking-[0.15em] text-gold mb-1">
            {placeholder.checkIn}
          </span>
          <span className="flex items-center gap-2 text-cream">
            <Calendar className="w-4 h-4 text-cream/40 group-hover:text-gold transition-colors" />
            <span className={value.checkIn ? 'text-cream' : 'text-cream/40'}>
              {value.checkIn ? formatDate(value.checkIn) : '날짜 선택'}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (value.checkIn) {
              setSelectingCheckOut(true)
              setIsOpen(true)
            }
          }}
          disabled={!value.checkIn}
          className="group w-full bg-transparent border border-white/10 px-4 py-3 text-left hover:border-gold/50 transition-all duration-300 ease-luxury disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="block text-xs tracking-[0.15em] text-gold mb-1">
            {placeholder.checkOut}
          </span>
          <span className="flex items-center gap-2 text-cream">
            <Calendar className="w-4 h-4 text-cream/40 group-hover:text-gold transition-colors" />
            <span className={value.checkOut ? 'text-cream' : 'text-cream/40'}>
              {value.checkOut ? formatDate(value.checkOut) : '날짜 선택'}
            </span>
          </span>
        </button>
      </div>

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
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={prevMonth}
                  disabled={!canGoPrev}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-cream/60 hover:border-gold/50 hover:text-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-cream font-display text-lg tracking-wide">
                  {currentMonth.getFullYear()}년 {MONTHS[currentMonth.getMonth()]}
                </span>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-cream/60 hover:border-gold/50 hover:text-gold transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs text-gold/70 py-2 tracking-wider"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  const disabled = isDateDisabled(date)
                  const inRange = isDateInRange(date)
                  const isStart = isCheckIn(date)
                  const isEnd = isCheckOut(date)
                  const isToday = date?.toDateString() === today.toDateString()

                  return (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleDateClick(date)}
                      disabled={disabled || !date}
                      whileHover={!disabled && date ? { scale: 1.1 } : {}}
                      whileTap={!disabled && date ? { scale: 0.95 } : {}}
                      className={`
                        relative aspect-square flex items-center justify-center text-sm
                        transition-all duration-200
                        ${!date ? 'invisible' : ''}
                        ${disabled ? 'text-cream/20 cursor-not-allowed' : 'text-cream hover:text-gold cursor-pointer'}
                        ${isStart || isEnd ? 'bg-gold text-luxe-black font-medium' : ''}
                        ${inRange ? 'bg-gold/20 text-gold' : ''}
                        ${isToday && !isStart && !isEnd ? 'border border-gold/50' : ''}
                      `}
                    >
                      {date?.getDate()}
                      {(isStart || isEnd) && (
                        <motion.div
                          layoutId="selected-date"
                          className="absolute inset-0 bg-gold -z-10"
                          initial={false}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-cream/50">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gold" />
                    선택됨
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gold/20" />
                    범위
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-gold tracking-wider hover:text-gold-light transition-colors"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export { DatePicker }
export type { DateRange, DatePickerProps }
