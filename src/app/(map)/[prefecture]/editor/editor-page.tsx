'use client'

import ControllablePreviewImage from '@/components/ControllablePreviewImage'
import DropZoneForm from '@/components/DropZoneForm'
import PrefectureMap from '@/components/PrefectureMap'
import { usePrefectureContext } from '@/features/prefecture/contexts/PrefectureContext'
import { useState } from 'react'

export default function EditorPage({ params }: { params: { prefecture: string } }) {
  const { PrefectureState } = usePrefectureContext()

  return (
    <>
      <PrefectureMap prefecture={params.prefecture} imageUrl={PrefectureState.previewImageUrl} />
      <ControllablePreviewImage imageUrl={PrefectureState.previewImageUrl} />
    </>
  )
}
