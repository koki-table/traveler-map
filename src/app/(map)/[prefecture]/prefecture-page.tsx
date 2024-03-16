'use client'

import ControllablePreviewImage from '@/components/ControllablePreviewImage'
import DropZoneForm from '@/components/DropZoneForm'
import PrefectureMap from '@/components/PrefectureMap'
import { useState } from 'react'

export default function PrefecturePage({ params }: { params: { prefecture: string } }) {
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null)

  const onSubmit = (e: string | ArrayBuffer | null) => {
    setImageUrl(e)
  }

  return (
    <>
      <PrefectureMap prefecture={params.prefecture} imageUrl={imageUrl} />
      <ControllablePreviewImage imageUrl={imageUrl} />
      <DropZoneForm onSubmit={onSubmit} />
    </>
  )
}
