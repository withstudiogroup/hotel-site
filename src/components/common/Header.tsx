'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe, User } from 'lucide-react'

const navigation = [
  { name: 'ROOMS', href: '/rooms' },
  { name: 'DINING', href: '/dining' },
  { name: 'FACILITIES', href: '/facilities' },
  { name: 'OFFERS', href: '/offers' },
  { name: 'EVENTS', href: '/events' },
]

const languages = [
  { code: 'KR', label: '한국어' },
  { code: 'EN', label: 'English' },
  { code: 'JP', label: '日本語' },
  { code: 'CN', label: '中文' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('KR')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
          isScrolled
            ? 'bg-luxe-black/95 backdrop-blur-lg border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar - Only visible when not scrolled */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="hidden lg:block border-b border-white/5"
            >
              <div className="container-luxe">
                <div className="flex items-center justify-end gap-8 py-2 text-xs tracking-wider text-cream/60">
                  <Link href="/membership" className="hover:text-gold transition-colors">
                    MEMBERSHIP
                  </Link>
                  <Link href="/mypage/reservations" className="hover:text-gold transition-colors">
                    예약 확인
                  </Link>
                  <Link href="/contact" className="hover:text-gold transition-colors">
                    고객지원
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Header */}
        <div className="container-luxe">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <div className="flex flex-col items-start">
                <span className="font-accent text-xl lg:text-2xl tracking-[0.3em] text-gold group-hover:text-gold-light transition-colors">
                  LUXE HAVEN
                </span>
                <span className="text-[10px] tracking-[0.5em] text-cream/40 mt-0.5">
                  HOTEL & RESORT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-5 py-2 text-sm tracking-[0.2em] text-cream/80 hover:text-gold transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="tracking-wider">{currentLang}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 py-2 bg-luxe-charcoal border border-gold/10 min-w-[120px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code)
                            setIsLangOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left text-sm tracking-wider transition-colors ${
                            currentLang === lang.code
                              ? 'text-gold bg-gold/5'
                              : 'text-cream/70 hover:text-gold hover:bg-gold/5'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <Link
                href="/auth/login"
                className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm text-cream/70 hover:text-gold transition-colors"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Reservation CTA */}
              <Link
                href="/reservation"
                className="hidden md:flex btn-luxe text-xs py-3 px-6"
              >
                예약하기
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-cream hover:text-gold transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Gold accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-luxe-black/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-luxe-charcoal/50 backdrop-blur-xl border-l border-gold/10"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-8">
                {/* Navigation Links */}
                <div className="flex-1 flex flex-col gap-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-4 text-2xl font-display text-cream hover:text-gold transition-colors border-b border-white/5"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="space-y-4 pt-8 border-t border-white/5">
                  {/* Language */}
                  <div className="flex items-center gap-4">
                    <Globe className="w-5 h-5 text-gold" />
                    <div className="flex gap-4">
                      {languages.slice(0, 2).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setCurrentLang(lang.code)}
                          className={`text-sm tracking-wider ${
                            currentLang === lang.code ? 'text-gold' : 'text-cream/50'
                          }`}
                        >
                          {lang.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/reservation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-luxe-filled w-full text-center"
                  >
                    예약하기
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
