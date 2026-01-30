import { rooms } from '@/lib/data/rooms'
import RoomDetailClient from './RoomDetailClient'

export function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params
  return <RoomDetailClient slug={slug} />
}
