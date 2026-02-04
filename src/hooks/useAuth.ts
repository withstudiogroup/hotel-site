import { useCallback, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore, User } from '@/stores/authStore'

const PROTECTED_ROUTES = [
  '/my-account',
  '/reservations',
  '/booking/confirm',
  '/profile',
]

const MEMBERSHIP_BENEFITS: Record<User['membershipLevel'], string[]> = {
  classic: ['기본 적립 5%', '생일 특별 혜택'],
  gold: ['기본 적립 7%', '생일 특별 혜택', '객실 업그레이드 (가용시)', '레이트 체크아웃'],
  platinum: [
    '기본 적립 10%',
    '생일 특별 혜택',
    '객실 업그레이드 우선',
    '레이트 체크아웃',
    '조식 무료',
    '라운지 이용',
  ],
  diamond: [
    '기본 적립 15%',
    '생일 특별 혜택',
    '객실 업그레이드 최우선',
    '레이트 체크아웃',
    '조식 무료',
    '라운지 이용',
    '스파 할인 20%',
    '전용 컨시어지',
  ],
}

const POINTS_TO_NEXT_LEVEL: Record<User['membershipLevel'], number> = {
  classic: 20000,
  gold: 50000,
  platinum: 100000,
  diamond: Infinity,
}

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  const isProtectedRoute = useCallback((path: string): boolean => {
    return PROTECTED_ROUTES.some((route) => path.startsWith(route))
  }, [])

  const requireAuth = useCallback(
    (redirectTo?: string) => {
      if (!store.isAuthenticated) {
        const returnUrl = redirectTo || pathname
        router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`)
        return false
      }
      return true
    },
    [store.isAuthenticated, router, pathname]
  )

  const getMembershipBenefits = useCallback((): string[] => {
    if (!store.user) return []
    return MEMBERSHIP_BENEFITS[store.user.membershipLevel]
  }, [store.user])

  const getPointsToNextLevel = useCallback((): number => {
    if (!store.user) return 0
    const threshold = POINTS_TO_NEXT_LEVEL[store.user.membershipLevel]
    if (threshold === Infinity) return 0
    return Math.max(0, threshold - store.user.points)
  }, [store.user])

  const getNextMembershipLevel = useCallback((): User['membershipLevel'] | null => {
    if (!store.user) return null
    const levels: User['membershipLevel'][] = ['classic', 'gold', 'platinum', 'diamond']
    const currentIndex = levels.indexOf(store.user.membershipLevel)
    if (currentIndex === levels.length - 1) return null
    return levels[currentIndex + 1]
  }, [store.user])

  const formatPoints = useCallback((points: number): string => {
    return new Intl.NumberFormat('ko-KR').format(points)
  }, [])

  const addPoints = useCallback(
    (points: number) => {
      if (store.user) {
        const newPoints = store.user.points + points
        store.updateUser({ points: newPoints })

        const levels: User['membershipLevel'][] = ['classic', 'gold', 'platinum', 'diamond']
        const currentIndex = levels.indexOf(store.user.membershipLevel)

        for (let i = currentIndex + 1; i < levels.length; i++) {
          const threshold = POINTS_TO_NEXT_LEVEL[levels[i - 1]]
          if (newPoints >= threshold) {
            store.updateUser({ membershipLevel: levels[i] })
          }
        }
      }
    },
    [store]
  )

  useEffect(() => {
    if (isProtectedRoute(pathname) && !store.isAuthenticated && !store.isLoading) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`)
    }
  }, [pathname, store.isAuthenticated, store.isLoading, isProtectedRoute, router])

  return {
    ...store,
    isProtectedRoute,
    requireAuth,
    getMembershipBenefits,
    getPointsToNextLevel,
    getNextMembershipLevel,
    formatPoints,
    addPoints,
  }
}
