'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/common/Button'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const allRequiredAgreed = formData.agreeTerms && formData.agreePrivacy

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
            <h1 className="font-display text-3xl lg:text-4xl text-cream mb-2">Join Us</h1>
            <p className="text-cream/60 text-sm">럭셔리한 멤버십의 특별한 혜택을 경험하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-luxe-black/50 border border-gold/20 text-cream pl-12 pr-4 py-4 text-sm
                    placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type="email"
                  name="email"
                  placeholder="이메일 주소"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-luxe-black/50 border border-gold/20 text-cream pl-12 pr-4 py-4 text-sm
                    placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="비밀번호 (8자 이상)"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
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

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-luxe-black/50 border border-gold/20 text-cream pl-12 pr-12 py-4 text-sm
                    placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="휴대폰 번호 (010-0000-0000)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-luxe-black/50 border border-gold/20 text-cream pl-12 pr-4 py-4 text-sm
                    placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="sr-only peer"
                    required
                  />
                  <div className="w-5 h-5 border border-gold/30 peer-checked:bg-gold peer-checked:border-gold
                    transition-colors flex items-center justify-center">
                    {formData.agreeTerms && <Check className="w-3.5 h-3.5 text-luxe-black" />}
                  </div>
                </div>
                <span className="text-sm text-cream/80 group-hover:text-cream transition-colors">
                  <span className="text-gold">[필수]</span> 이용약관에 동의합니다
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    className="sr-only peer"
                    required
                  />
                  <div className="w-5 h-5 border border-gold/30 peer-checked:bg-gold peer-checked:border-gold
                    transition-colors flex items-center justify-center">
                    {formData.agreePrivacy && <Check className="w-3.5 h-3.5 text-luxe-black" />}
                  </div>
                </div>
                <span className="text-sm text-cream/80 group-hover:text-cream transition-colors">
                  <span className="text-gold">[필수]</span> 개인정보 수집 및 이용에 동의합니다
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border border-gold/30 peer-checked:bg-gold peer-checked:border-gold
                    transition-colors flex items-center justify-center">
                    {formData.agreeMarketing && <Check className="w-3.5 h-3.5 text-luxe-black" />}
                  </div>
                </div>
                <span className="text-sm text-cream/80 group-hover:text-cream transition-colors">
                  <span className="text-cream/50">[선택]</span> 마케팅 정보 수신에 동의합니다
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isLoading}
              disabled={!allRequiredAgreed}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full mt-6"
            >
              회원가입
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-cream/60 text-sm">
              이미 회원이신가요?{' '}
              <Link href="/auth/login" className="text-gold hover:text-gold-light transition-colors">
                로그인
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
