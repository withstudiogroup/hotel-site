import type { Metadata } from 'next'
import { Cormorant_Garamond, Italiana, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const italiana = Italiana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italiana',
  display: 'swap',
})

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-pretendard',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Luxe Haven Hotel | Experience Luxury Beyond Imagination',
    template: '%s | Luxe Haven Hotel',
  },
  description: '전라남도 함평의 프리미엄 럭셔리 호텔. 최상의 객실, 미쉐린 스타 다이닝, 월드클래스 스파로 잊지 못할 경험을 선사합니다.',
  keywords: ['럭셔리 호텔', '함평 호텔', '프리미엄 호텔', '5성급 호텔', 'luxury hotel', 'hampyeong hotel'],
  authors: [{ name: 'Luxe Haven Hotel' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://luxehaven.com',
    siteName: 'Luxe Haven Hotel',
    title: 'Luxe Haven Hotel | Experience Luxury Beyond Imagination',
    description: '전라남도 함평의 프리미엄 럭셔리 호텔. 최상의 객실, 미쉐린 스타 다이닝, 월드클래스 스파.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Haven Hotel',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${italiana.variable} ${notoSansKr.variable}`}>
      <body className="bg-luxe-black text-cream antialiased">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
