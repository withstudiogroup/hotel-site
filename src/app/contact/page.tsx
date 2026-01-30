'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Train,
  Plane,
  Send,
  Check,
  MessageSquare,
  Building2,
  Users,
  Utensils,
  Sparkles,
} from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: '전화',
    primary: '010-4708-0150',
    secondary: '24시간 운영',
    action: 'tel:010-4708-0150',
  },
  {
    icon: Mail,
    title: '이메일',
    primary: 'withstudiogroup@gmail.com',
    secondary: '24시간 내 답변',
    action: 'mailto:withstudiogroup@gmail.com',
  },
  {
    icon: MapPin,
    title: '주소',
    primary: '전라남도 함평군 함장로 5730-37',
    secondary: 'WITH',
    action: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: '프런트 데스크',
    primary: '24시간 운영',
    secondary: '체크인 15:00 / 체크아웃 11:00',
    action: null,
  },
]

const departments = [
  {
    icon: Building2,
    name: '객실 예약',
    phone: '010-4708-0150',
    email: 'withstudiogroup@gmail.com',
    hours: '09:00 - 21:00',
  },
  {
    icon: Utensils,
    name: '다이닝 예약',
    phone: '010-4708-0150',
    email: 'withstudiogroup@gmail.com',
    hours: '10:00 - 22:00',
  },
  {
    icon: Sparkles,
    name: '스파 예약',
    phone: '010-4708-0150',
    email: 'withstudiogroup@gmail.com',
    hours: '09:00 - 21:00',
  },
  {
    icon: Users,
    name: '연회/행사',
    phone: '010-4708-0150',
    email: 'withstudiogroup@gmail.com',
    hours: '09:00 - 18:00',
  },
]

const directions = [
  {
    icon: Car,
    title: '자가용',
    description: '함평IC에서 함평읍 방면으로 10분 거리. 무료 주차 가능.',
  },
  {
    icon: Train,
    title: '기차/버스',
    description: '함평역 또는 함평버스터미널에서 택시로 약 10분 거리.',
  },
  {
    icon: Plane,
    title: '공항',
    description: '광주공항에서 약 40분 소요. 무안공항에서 약 30분 소요.',
  },
]

const inquiryTypes = [
  { value: 'reservation', label: '객실 예약' },
  { value: 'dining', label: '다이닝 예약' },
  { value: 'spa', label: '스파 예약' },
  { value: 'event', label: '연회/행사' },
  { value: 'membership', label: '멤버십' },
  { value: 'feedback', label: '고객 의견' },
  { value: 'other', label: '기타 문의' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920"
          alt="Contact"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/50 to-luxe-black/30" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-px bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">CONTACT</span>
              <span className="w-12 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-lg text-cream mb-4">
              문의하기
            </h1>

            <p className="text-cream/70 text-lg">
              언제든 연락 주시면 성심껏 도와드리겠습니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-luxe-black">
        <div className="container-luxe">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.action || undefined}
                target={info.action?.startsWith('http') ? '_blank' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-luxe-charcoal p-6 border border-white/5 text-center group ${
                  info.action ? 'hover:border-gold/30 cursor-pointer' : ''
                } transition-colors`}
              >
                <div className="w-14 h-14 mx-auto mb-4 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-colors">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <p className="text-cream/40 text-xs tracking-wider mb-2">{info.title}</p>
                <p className="text-cream font-display text-lg mb-1">{info.primary}</p>
                <p className="text-cream/50 text-sm">{info.secondary}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-luxe bg-luxe-charcoal">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <MessageSquare className="w-5 h-5 text-gold" />
                <span className="text-gold text-xs tracking-[0.4em] font-accent">INQUIRY</span>
              </div>

              <h2 className="font-display text-display-sm text-cream mb-6">
                문의 남기기
              </h2>

              <p className="text-cream/60 mb-8">
                문의 사항을 남겨주시면 담당자가 확인 후 빠르게 연락드리겠습니다.
                24시간 이내 답변을 드립니다.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-luxe-black p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gold/20 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-xl text-cream mb-2">
                    문의가 접수되었습니다
                  </h3>
                  <p className="text-cream/60 mb-6">
                    빠른 시일 내에 답변 드리겠습니다.
                    <br />
                    감사합니다.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        type: '',
                        message: '',
                      })
                    }}
                    className="btn-luxe"
                  >
                    새 문의 작성
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-cream/40 text-xs tracking-wider mb-2">
                        이름 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream focus:border-gold outline-none transition-colors"
                        placeholder="이름"
                      />
                    </div>
                    <div>
                      <label className="block text-cream/40 text-xs tracking-wider mb-2">
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream focus:border-gold outline-none transition-colors"
                        placeholder="010-1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream focus:border-gold outline-none transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      문의 유형 *
                    </label>
                    <select
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream focus:border-gold outline-none transition-colors"
                    >
                      <option value="">선택해주세요</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-cream/40 text-xs tracking-wider mb-2">
                      문의 내용 *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-luxe-black border border-white/10 px-4 py-3 text-cream focus:border-gold outline-none transition-colors resize-none"
                      placeholder="문의 내용을 자세히 작성해주세요."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxe-filled w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-luxe-black/30 border-t-luxe-black rounded-full animate-spin" />
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        문의 보내기
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Departments */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-gold text-xs tracking-[0.4em] font-accent">DIRECT LINE</span>
              </div>

              <h2 className="font-display text-display-sm text-cream mb-6">
                부서별 연락처
              </h2>

              <p className="text-cream/60 mb-8">
                직접 전화 또는 이메일로 문의하시면 더욱 빠른 답변을 받으실 수 있습니다.
              </p>

              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-luxe-black p-6 border border-white/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                        <dept.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg text-cream mb-3">{dept.name}</h3>
                        <div className="space-y-2 text-sm">
                          <a
                            href={`tel:${dept.phone}`}
                            className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {dept.phone}
                          </a>
                          <a
                            href={`mailto:${dept.email}`}
                            className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {dept.email}
                          </a>
                          <div className="flex items-center gap-2 text-cream/50">
                            <Clock className="w-4 h-4" />
                            {dept.hours}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map & Directions */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">LOCATION</span>
              <span className="w-8 h-px bg-gold" />
            </div>

            <h2 className="font-display text-display-md text-cream mb-4">
              오시는 길
            </h2>

            <p className="text-cream/60">
              전라남도 함평군 함장로 5730-37, WITH
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative aspect-[16/9] bg-luxe-charcoal overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200"
                alt="Map"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxe-filled"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Google Maps에서 보기
                </a>
              </div>
            </motion.div>

            {/* Directions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {directions.map((direction, index) => (
                <div
                  key={direction.title}
                  className="bg-luxe-charcoal p-6 border border-white/5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <direction.icon className="w-5 h-5 text-gold" />
                    <h3 className="font-display text-lg text-cream">{direction.title}</h3>
                  </div>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {direction.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-luxe-charcoal border-t border-white/5">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-display-sm text-cream mb-6">
              지금 바로 경험하세요
            </h2>
            <p className="text-cream/60 mb-8">
              Luxe Haven Hotel에서 특별한 순간을 만들어 드립니다.
              문의사항이 있으시면 언제든지 연락 주세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:010-4708-0150" className="btn-luxe-filled flex items-center gap-2">
                <Phone className="w-4 h-4" />
                010-4708-0150
              </a>
              <a href="mailto:withstudiogroup@gmail.com" className="btn-luxe flex items-center gap-2">
                <Mail className="w-4 h-4" />
                이메일 보내기
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
