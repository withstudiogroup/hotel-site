'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Users,
  Clock,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

interface CartItem {
  id: string
  type: 'room' | 'dining' | 'spa'
  name: string
  nameEn: string
  image: string
  date: string
  guests?: number
  nights?: number
  time?: string
  packageName?: string
  packageDescription?: string
  price: number
  quantity: number
}

interface CartSummaryProps {
  items: CartItem[]
  checkIn?: string
  checkOut?: string
  adults?: number
  children?: number
  onRemoveItem?: (id: string) => void
  onUpdateQuantity?: (id: string, quantity: number) => void
  onCheckout?: () => void
  className?: string
}

export default function CartSummary({
  items,
  checkIn,
  checkOut,
  adults = 2,
  children = 0,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  className = '',
}: CartSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  const nights = (() => {
    if (!checkIn || !checkOut) return 1
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  })()

  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.type === 'room' ? item.price * nights : item.price * item.quantity
    return sum + itemTotal
  }, 0)

  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  const isEmpty = items.length === 0

  return (
    <div className={`bg-luxe-charcoal border border-white/5 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-gold" />
          <h2 className="font-display text-xl text-cream">예약 정보</h2>
          {!isEmpty && (
            <span className="bg-gold text-luxe-black text-xs font-medium px-2 py-0.5">
              {items.length}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-cream/40" />
        ) : (
          <ChevronDown className="w-5 h-5 text-cream/40" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {isEmpty ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border border-white/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-cream/30" />
                  </div>
                  <p className="text-cream/60 mb-2">아직 선택된 항목이 없습니다</p>
                  <p className="text-cream/40 text-sm">
                    원하시는 객실이나 서비스를 선택해주세요
                  </p>
                </div>
              ) : (
                <>
                  {(checkIn || checkOut) && (
                    <div className="pb-4 border-b border-white/5 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {checkIn && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            <div>
                              <p className="text-cream/40 text-xs">체크인</p>
                              <p className="text-cream">{checkIn}</p>
                            </div>
                          </div>
                        )}
                        {checkOut && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            <div>
                              <p className="text-cream/40 text-xs">체크아웃</p>
                              <p className="text-cream">{checkOut}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gold" />
                          <div>
                            <p className="text-cream/40 text-xs">숙박</p>
                            <p className="text-cream">{nights}박</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gold" />
                          <div>
                            <p className="text-cream/40 text-xs">인원</p>
                            <p className="text-cream">
                              성인 {adults}명{children > 0 && `, 아동 ${children}명`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pb-4 border-b border-white/5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-luxe-black/50 border border-white/5"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-cream text-sm font-medium truncate">
                                {item.name}
                              </p>
                              <p className="text-cream/40 text-xs">{item.nameEn}</p>
                            </div>
                            {onRemoveItem && (
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-1 text-cream/40 hover:text-red-400 transition-colors flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {item.packageName && (
                            <div className="flex items-center gap-1 mt-1">
                              <Sparkles className="w-3 h-3 text-gold" />
                              <span className="text-gold text-xs">{item.packageName}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-cream/50 text-xs">
                              {item.type === 'room'
                                ? `${nights}박`
                                : item.time || `x${item.quantity}`}
                            </span>
                            <span className="text-gold text-sm">
                              ₩
                              {(item.type === 'room'
                                ? item.price * nights
                                : item.price * item.quantity
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 space-y-2">
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-2 text-cream/60 text-sm hover:text-cream transition-colors"
                    >
                      <span>상세 내역</span>
                      {showDetails ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 py-2">
                            {items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-cream/60 truncate max-w-[60%]">
                                  {item.name}
                                </span>
                                <span className="text-cream">
                                  ₩
                                  {(item.type === 'room'
                                    ? item.price * nights
                                    : item.price * item.quantity
                                  ).toLocaleString()}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                              <span className="text-cream/60">소계</span>
                              <span className="text-cream">₩{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-cream/60">세금 및 수수료 (10%)</span>
                              <span className="text-cream">₩{tax.toLocaleString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between items-end pt-4 border-t border-white/5">
                      <span className="text-cream">총 결제 금액</span>
                      <div className="text-right">
                        <p className="text-gold font-display text-2xl">
                          ₩{total.toLocaleString()}
                        </p>
                        <p className="text-cream/40 text-xs">세금 포함</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onCheckout}
                    className="w-full mt-6 btn-luxe-filled py-4"
                  >
                    예약하기
                  </button>

                  <p className="text-cream/40 text-xs text-center mt-4">
                    예약 확정 전까지 요금이 청구되지 않습니다
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
