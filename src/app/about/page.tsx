'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Award,
  Users,
  Star,
  Clock,
  MapPin,
  Building2,
  Gem,
  Heart,
  Target,
  Sparkles,
} from 'lucide-react'

const stats = [
  { icon: Building2, value: '2020', label: '설립연도', suffix: '' },
  { icon: Users, value: '50,000', label: '연간 고객', suffix: '+' },
  { icon: Star, value: '4.9', label: '고객 평점', suffix: '/5' },
  { icon: Award, value: '15', label: '수상 경력', suffix: '+' },
]

const values = [
  {
    icon: Gem,
    title: '탁월함',
    titleEn: 'EXCELLENCE',
    description:
      '모든 서비스와 시설에서 최고의 품질을 추구합니다. 세부 사항 하나까지 완벽을 기하여 고객님께 최상의 경험을 선사합니다.',
  },
  {
    icon: Heart,
    title: '진정성',
    titleEn: 'AUTHENTICITY',
    description:
      '진심 어린 환대와 따뜻한 서비스로 고객님을 맞이합니다. 형식적이 아닌 진정한 배려로 잊지 못할 추억을 만들어 드립니다.',
  },
  {
    icon: Target,
    title: '혁신',
    titleEn: 'INNOVATION',
    description:
      '전통적인 환대 정신에 현대적 혁신을 더합니다. 끊임없는 발전과 변화를 통해 새로운 럭셔리의 기준을 제시합니다.',
  },
  {
    icon: Sparkles,
    title: '지속가능성',
    titleEn: 'SUSTAINABILITY',
    description:
      '환경과 지역사회를 생각하는 지속가능한 럭셔리를 실천합니다. 미래 세대를 위한 책임 있는 운영을 약속드립니다.',
  },
]

const timeline = [
  {
    year: '2020',
    title: '그랜드 오프닝',
    description: '전라남도 함평 프리미엄 부티크 호텔로 개관',
  },
  {
    year: '2021',
    title: '미쉐린 스타 획득',
    description: "L'Heritage 레스토랑, 미쉐린 2스타 획득",
  },
  {
    year: '2022',
    title: '포브스 트래블 가이드 선정',
    description: '포브스 트래블 가이드 5성 호텔 선정',
  },
  {
    year: '2023',
    title: '스파 & 웰니스 확장',
    description: '아시아 최대 규모 호텔 스파 시설 오픈',
  },
  {
    year: '2024',
    title: '콘데나스트 어워드',
    description: '아시아 베스트 뉴 호텔 수상',
  },
]

const awards = [
  { name: 'Forbes Travel Guide', award: '5-Star Hotel 2024' },
  { name: 'Michelin Guide', award: '2-Star Restaurant' },
  { name: 'Condé Nast Traveler', award: 'Best New Hotel Asia 2024' },
  { name: 'Travel + Leisure', award: "World's Best Awards 2023" },
  { name: 'World Luxury Hotel Awards', award: 'Best Luxury City Hotel' },
  { name: 'TripAdvisor', award: "Travelers' Choice 2024" },
]

const leadership = [
  {
    name: 'James Lee',
    nameEn: 'General Manager',
    title: '총지배인',
    titleEn: 'General Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    quote: '고객 한 분 한 분께 특별한 경험을 선사하는 것이 우리의 사명입니다.',
  },
  {
    name: 'Sarah Kim',
    nameEn: 'Director of Rooms',
    title: '객실부 총괄',
    titleEn: 'Director of Rooms',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    quote: '완벽한 휴식을 위한 세심한 배려가 럭셔리의 본질입니다.',
  },
  {
    name: 'Michael Park',
    nameEn: 'Executive Chef',
    title: '총주방장',
    titleEn: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
    quote: '최고의 식재료와 정성으로 잊지 못할 미식 경험을 선사합니다.',
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920"
            alt="About Luxe Haven"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/50 to-luxe-black/30" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-16 h-px bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">ABOUT US</span>
              <span className="w-16 h-px bg-gold/50" />
            </div>

            <h1 className="font-display text-display-xl text-cream mb-6">
              Where Every Moment
              <br />
              <span className="text-gold">Becomes a Memory</span>
            </h1>

            <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
              전라남도 함평에 위치한 Luxe Haven Hotel은
              현대적 럭셔리와 전통적 환대 정신이 조화를 이루는
              프리미엄 부티크 호텔입니다.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border border-gold/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-luxe-black border-b border-white/5">
        <div className="container-luxe">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <p className="font-display text-4xl md:text-5xl text-cream mb-2">
                  {stat.value}
                  <span className="text-gold">{stat.suffix}</span>
                </p>
                <p className="text-cream/50 text-sm tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-luxe bg-cream">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-gold/20" />
              <div className="absolute -top-8 -left-8 w-32 h-32 border-l-2 border-t-2 border-gold/30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold-dark text-xs tracking-[0.4em] font-accent">OUR STORY</span>
              </div>

              <h2 className="font-display text-display-sm text-luxe-black mb-6">
                럭셔리의 새로운 기준을
                <br />
                <span className="text-gold-dark">제시합니다</span>
              </h2>

              <div className="space-y-6 text-luxe-slate leading-relaxed">
                <p>
                  Luxe Haven Hotel은 단순한 숙박을 넘어 평생 기억에 남을 경험을
                  선사하겠다는 비전으로 탄생했습니다.
                </p>
                <p>
                  세계 최고 수준의 호텔리어들이 모여 만든 이곳에서,
                  고객님은 미쉐린 스타 레스토랑의 미식 여행,
                  월드클래스 스파의 힐링 경험, 그리고 세심하게 디자인된
                  객실에서의 완벽한 휴식을 경험하실 수 있습니다.
                </p>
                <p>
                  우리는 전통적인 한국의 환대 정신과 현대적 럭셔리를
                  완벽하게 조화시켜, 새로운 호스피탈리티의 기준을
                  제시하고 있습니다.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-luxe-black/10">
                <blockquote className="italic text-luxe-slate/70 mb-4">
                  "진정한 럭셔리는 고객님의 기대를 넘어서는 것에 있습니다."
                </blockquote>
                <p className="text-luxe-black font-display">James Lee</p>
                <p className="text-luxe-slate/60 text-sm">General Manager</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">OUR VALUES</span>
              <span className="w-8 h-px bg-gold" />
            </div>

            <h2 className="font-display text-display-md text-cream">
              핵심 가치
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-colors">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <p className="text-gold/50 text-xs tracking-[0.3em] mb-2">{value.titleEn}</p>
                <h3 className="font-display text-2xl text-cream mb-4">{value.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-luxe bg-luxe-charcoal">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">OUR JOURNEY</span>
              <span className="w-8 h-px bg-gold" />
            </div>

            <h2 className="font-display text-display-md text-cream">
              역사
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-luxe bg-luxe-black">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] font-accent">LEADERSHIP</span>
              <span className="w-8 h-px bg-gold" />
            </div>

            <h2 className="font-display text-display-md text-cream">
              리더십
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-transparent to-transparent" />

                  {/* Quote Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-cream/90 text-sm italic">"{person.quote}"</p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-display text-xl text-cream">{person.name}</h3>
                  <p className="text-cream/40 text-xs tracking-wider mb-2">{person.nameEn}</p>
                  <p className="text-gold text-sm">{person.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-luxe-charcoal">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-display-sm text-cream mb-4">
              수상 및 인증
            </h2>
            <p className="text-cream/60">
              Luxe Haven Hotel의 탁월한 서비스는 세계적으로 인정받고 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="text-center p-6 border border-white/5 hover:border-gold/20 transition-colors"
              >
                <Award className="w-8 h-8 text-gold mx-auto mb-4" />
                <p className="text-cream text-sm mb-1">{award.name}</p>
                <p className="text-cream/40 text-xs">{award.award}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32">
        <Image
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920"
          alt="Experience Luxe Haven"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-luxe-black/70" />

        <div className="relative z-10 container-luxe text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-display-md text-cream mb-6">
              특별한 경험을 시작하세요
            </h2>
            <p className="text-cream/70 mb-8">
              Luxe Haven Hotel에서 잊지 못할 순간을 만들어 드립니다.
              지금 바로 예약하고 럭셔리의 새로운 기준을 경험하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/reservation" className="btn-luxe-filled">
                지금 예약하기
              </Link>
              <Link href="/contact" className="btn-luxe">
                문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0]
  index: number
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative md:w-1/2 ${isEven ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
    >
      {/* Dot */}
      <div
        className={`absolute top-0 hidden md:block w-4 h-4 bg-gold rounded-full ${
          isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
        } -translate-y-1`}
      />

      <div className={`${isEven ? 'md:text-right' : ''}`}>
        <span className="text-gold font-display text-4xl">{item.year}</span>
        <h3 className="font-display text-xl text-cream mt-2 mb-2">{item.title}</h3>
        <p className="text-cream/60 text-sm">{item.description}</p>
      </div>
    </motion.div>
  )
}
