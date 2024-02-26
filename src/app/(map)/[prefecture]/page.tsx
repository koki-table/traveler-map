import PrefectureMap from '@/components/PrefectureMap'

export default async function Page({ params }: { params: { prefecture: string } }) {
  return <PrefectureMap prefecture={params.prefecture} />
}
