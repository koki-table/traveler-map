'use client'

import DropZoneForm from '@/components/DropZoneForm'
import { usePrefectureContext } from '@/features/prefecture/contexts/PrefectureContext'

export default function UploadPage({ params }: { params: { prefecture: string } }) {
  const { PrefectureAction } = usePrefectureContext()

  return <DropZoneForm onSubmit={PrefectureAction.onPreviewSubmit} currentPrefecture={params.prefecture} />
}
