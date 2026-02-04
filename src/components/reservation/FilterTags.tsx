'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Coffee,
  Sparkles,
  Wifi,
  Car,
  UtensilsCrossed,
  Bath,
  Mountain,
  Waves,
  Baby,
  Accessibility,
  PawPrint,
  Dumbbell,
  Wine,
  Plane,
  Clock,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react'

interface FilterTag {
  id: string
  label: string
  labelEn?: string
  icon: LucideIcon
  category?: string
}

interface FilterTagsProps {
  tags: FilterTag[]
  activeFilters: string[]
  onFilterChange: (filters: string[]) => void
  multiSelect?: boolean
  showCategories?: boolean
  showClearAll?: boolean
  compact?: boolean
  className?: string
}

const defaultTags: FilterTag[] = [
  { id: 'breakfast', label: '조식 포함', labelEn: 'Breakfast', icon: Coffee, category: 'meal' },
  { id: 'dinner', label: '석식 포함', labelEn: 'Dinner', icon: UtensilsCrossed, category: 'meal' },
  { id: 'resort-money', label: '리조트 머니', labelEn: 'Resort Credit', icon: Sparkles, category: 'benefit' },
  { id: 'wifi', label: '무료 WiFi', labelEn: 'Free WiFi', icon: Wifi, category: 'amenity' },
  { id: 'parking', label: '주차 포함', labelEn: 'Parking', icon: Car, category: 'amenity' },
  { id: 'spa', label: '스파 이용', labelEn: 'Spa Access', icon: Bath, category: 'benefit' },
  { id: 'ocean-view', label: '오션뷰', labelEn: 'Ocean View', icon: Waves, category: 'view' },
  { id: 'mountain-view', label: '마운틴뷰', labelEn: 'Mountain View', icon: Mountain, category: 'view' },
  { id: 'family', label: '패밀리', labelEn: 'Family Friendly', icon: Baby, category: 'feature' },
  { id: 'accessible', label: '배리어프리', labelEn: 'Accessible', icon: Accessibility, category: 'feature' },
  { id: 'pet-friendly', label: '반려동물', labelEn: 'Pet Friendly', icon: PawPrint, category: 'feature' },
  { id: 'fitness', label: '피트니스', labelEn: 'Fitness', icon: Dumbbell, category: 'amenity' },
  { id: 'minibar', label: '미니바', labelEn: 'Minibar', icon: Wine, category: 'amenity' },
  { id: 'airport', label: '공항 픽업', labelEn: 'Airport Transfer', icon: Plane, category: 'service' },
  { id: 'late-checkout', label: '레이트 체크아웃', labelEn: 'Late Checkout', icon: Clock, category: 'service' },
]

const categoryLabels: Record<string, string> = {
  meal: '식사',
  benefit: '혜택',
  amenity: '편의시설',
  view: '전망',
  feature: '특징',
  service: '서비스',
}

export default function FilterTags({
  tags = defaultTags,
  activeFilters,
  onFilterChange,
  multiSelect = true,
  showCategories = false,
  showClearAll = true,
  compact = false,
  className = '',
}: FilterTagsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleFilter = (filterId: string) => {
    if (multiSelect) {
      const newFilters = activeFilters.includes(filterId)
        ? activeFilters.filter((f) => f !== filterId)
        : [...activeFilters, filterId]
      onFilterChange(newFilters)
    } else {
      onFilterChange(activeFilters.includes(filterId) ? [] : [filterId])
    }
  }

  const clearAll = () => {
    onFilterChange([])
  }

  const groupedTags = showCategories
    ? tags.reduce(
        (acc, tag) => {
          const category = tag.category || 'other'
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push(tag)
          return acc
        },
        {} as Record<string, FilterTag[]>
      )
    : { all: tags }

  if (compact) {
    return (
      <div className={className}>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 5).map((tag) => (
            <button
              key={tag.id}
              onClick={() => toggleFilter(tag.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs transition-all ${
                activeFilters.includes(tag.id)
                  ? 'bg-gold/20 border border-gold text-gold'
                  : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
              }`}
            >
              <tag.icon className="w-3 h-3" />
              {tag.label}
            </button>
          ))}
          {tags.length > 5 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream transition-all"
            >
              {isExpanded ? '접기' : `+${tags.length - 5}개 더보기`}
              {isExpanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && tags.length > 5 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.slice(5).map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleFilter(tag.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs transition-all ${
                      activeFilters.includes(tag.id)
                        ? 'bg-gold/20 border border-gold text-gold'
                        : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
                    }`}
                  >
                    <tag.icon className="w-3 h-3" />
                    {tag.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold" />
          <span className="text-cream/40 text-xs tracking-wider">필터</span>
        </div>

        {showClearAll && activeFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-cream/60 text-xs hover:text-gold transition-colors"
          >
            <X className="w-3 h-3" />
            전체 해제
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 pb-4 border-b border-white/5"
        >
          <p className="text-cream/40 text-xs mb-2">
            선택된 필터 ({activeFilters.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filterId) => {
              const tag = tags.find((t) => t.id === filterId)
              if (!tag) return null
              return (
                <motion.button
                  key={filterId}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => toggleFilter(filterId)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gold text-luxe-black text-xs font-medium"
                >
                  <tag.icon className="w-3 h-3" />
                  {tag.label}
                  <X className="w-3 h-3" />
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}

      {showCategories ? (
        <div className="space-y-6">
          {Object.entries(groupedTags).map(([category, categoryTags]) => (
            <div key={category}>
              <p className="text-gold text-xs tracking-wider mb-3">
                {categoryLabels[category] || category.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {categoryTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleFilter(tag.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                      activeFilters.includes(tag.id)
                        ? 'bg-gold/20 border border-gold text-gold'
                        : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
                    }`}
                  >
                    <tag.icon className="w-4 h-4" />
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => toggleFilter(tag.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                activeFilters.includes(tag.id)
                  ? 'bg-gold/20 border border-gold text-gold'
                  : 'border border-white/10 text-cream/60 hover:border-gold/30 hover:text-cream'
              }`}
            >
              <tag.icon className="w-4 h-4" />
              {tag.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
