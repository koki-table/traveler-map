'use client'

import ControllablePreviewImage from '@/components/ControllablePreviewImage'
import PrefectureMapBackground from '@/components/PrefectureMapBackground'
import { usePrefectureContext } from '@/features/prefecture/contexts/PrefectureContext'

export default function EditorPage({ params }: { params: { prefecture: string } }) {
  const { PrefectureState } = usePrefectureContext()

  return (
    <>
      <div className='relative'>
        <ControllablePreviewImage
          imageUrl={PrefectureState.previewImageUrl}
          prefecture={params.prefecture}
        />
      </div>
      <div className='absolute inset-0 mx-auto my-auto pointer-events-none'>
        <PrefectureMapBackground
          prefecture={params.prefecture}
          imageUrl={PrefectureState.previewImageUrl}
        />
      </div>
    </>
  )
}
