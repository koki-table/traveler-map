'use client'

import PrefectureMap from '@/components/PrefectureMap'
import { usePrefectureContext } from '@/features/prefecture/contexts/PrefectureContext'
import { useRouter } from 'next/navigation'

export default function PrefecturePage({ params }: { params: { prefecture: string } }) {
  const router = useRouter()

  // context
  const { PrefectureState } = usePrefectureContext()

  return (
    <>
      {PrefectureState.definitionImageUrl && (
        <PrefectureMap
          prefecture={params.prefecture}
          imageUrl={PrefectureState.definitionImageUrl}
        />
      )}
    </>
  )
}
