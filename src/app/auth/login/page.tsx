'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-luxe-black via-luxe-charcoal to-luxe-black" />
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-luxe-charcoal/50 backdrop-blur-xl border border-gold/10 p-8 lg:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="font-accent text-2xl text-gold tracking-[0.3em]">LUXE HAVEN</span>
            </Link>
            <h1 className="font-display text-3xl lg:text-4xl text-cream mb-2">Welcome Back</h1>
            <p className="text-cream/60 text-sm">럭셔리한 경험을 위해 로그인하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-luxe-black/50 border border-gold/20 text-cream pl-12 pr-4 py-4 text-sm
                    placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-luxe-black/50 border border-gold/20 text-cream pl-12 pr-12 py-4 text-sm
                    placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-cream/60 hover:text-gold transition-colors"
              >
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              로그인
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-luxe-charcoal/50 px-4 text-sm text-cream/40">또는</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 bg-white text-luxe-black py-3.5 px-4
              text-sm font-medium hover:bg-cream transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 로그인
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-[#FEE500] text-[#191919] py-3.5 px-4
              text-sm font-medium hover:bg-[#FDD835] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.89 5.29 4.71 6.71L5.29 21.3c-.18.47.33.87.77.62l4.17-2.29c.58.08 1.17.12 1.77.12 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
              </svg>
              카카오로 로그인
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-[#03C75A] text-white py-3.5 px-4
              text-sm font-medium hover:bg-[#02B150] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
              </svg>
              네이버로 로그인
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-cream/60 text-sm">
              아직 회원이 아니신가요?{' '}
              <Link href="/auth/register" className="text-gold hover:text-gold-light transition-colors">
                회원가입
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-cream/40 hover:text-cream transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
