'use client'

import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  className?: string
}

function Breadcrumb({ items, showHome = true, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      {showHome && (
        <>
          <Link
            href="/"
            className="flex items-center text-cream/60 hover:text-gold transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-cream/30" />
        </>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-cream/60 hover:text-gold transition-colors tracking-wider"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`tracking-wider ${
                  isLast ? 'text-gold font-medium' : 'text-cream/60'
                }`}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight className="w-4 h-4 text-cream/30" />
            )}
          </div>
        )
      })}
    </nav>
  )
}

export { Breadcrumb }
export type { BreadcrumbItem, BreadcrumbProps }
