'use client'

import Link from 'next/link'
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  hotel: [
    { name: '객실', href: '/rooms' },
    { name: '다이닝', href: '/dining' },
    { name: '부대시설', href: '/facilities' },
    { name: '멤버십', href: '/membership' },
  ],
  offers: [
    { name: '스페셜 오퍼', href: '/offers' },
    { name: '이벤트', href: '/events' },
    { name: '패키지', href: '/offers?type=package' },
  ],
  support: [
    { name: '오시는 길', href: '/contact' },
    { name: '자주 묻는 질문', href: '/faq' },
    { name: '채용 안내', href: '/careers' },
  ],
  legal: [
    { name: '개인정보 처리방침', href: '/privacy' },
    { name: '이용약관', href: '/terms' },
    { name: '사이트맵', href: '/sitemap' },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
]

export default function Footer() {
  return (
    <footer className="bg-luxe-black border-t border-gold/10">
      {/* Main Footer */}
      <div className="container-luxe py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-4 space-y-8">
            {/* Logo */}
            <Link href="/" className="inline-block group">
              <div className="flex flex-col items-start">
                <span className="font-accent text-2xl tracking-[0.3em] text-gold group-hover:text-gold-light transition-colors">
                  LUXE HAVEN
                </span>
                <span className="text-[10px] tracking-[0.5em] text-cream/40 mt-0.5">
                  HOTEL & RESORT
                </span>
              </div>
            </Link>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xs tracking-[0.3em] text-gold uppercase mb-4">
                Customer Center
              </h3>

              <div className="space-y-3 text-sm text-cream/60">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-gold/60" />
                  <div>
                    <p className="text-cream/40 text-xs mb-1">객실 예약</p>
                    <p className="text-cream text-lg font-display">010-4708-0150</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-gold/60" />
                  <div>
                    <p className="text-cream/40 text-xs mb-1">이메일</p>
                    <a href="mailto:withstudiogroup@gmail.com" className="hover:text-gold transition-colors">
                      withstudiogroup@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold/60" />
                  <div>
                    <p className="text-cream/40 text-xs mb-1">주소</p>
                    <p>전라남도 함평군 함장로 5730-37</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-gold/20 text-cream/60 hover:text-gold hover:border-gold/50 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Hotel */}
              <div>
                <h3 className="text-xs tracking-[0.3em] text-gold uppercase mb-6">
                  Hotel
                </h3>
                <ul className="space-y-3">
                  {footerLinks.hotel.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/60 hover:text-gold transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Offers */}
              <div>
                <h3 className="text-xs tracking-[0.3em] text-gold uppercase mb-6">
                  Offers
                </h3>
                <ul className="space-y-3">
                  {footerLinks.offers.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/60 hover:text-gold transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-xs tracking-[0.3em] text-gold uppercase mb-6">
                  Support
                </h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/60 hover:text-gold transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-xs tracking-[0.3em] text-gold uppercase mb-6">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/60 hover:text-gold transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="container-luxe py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span>WITH</span>
              <span className="hidden md:inline">|</span>
              <span>전라남도 함평군 함장로 5730-37</span>
              <span className="hidden md:inline">|</span>
              <span>Tel. 010-4708-0150</span>
            </div>
            <p>© {new Date().getFullYear()} Luxe Haven Hotel. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Decorative Gold Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </footer>
  )
}
