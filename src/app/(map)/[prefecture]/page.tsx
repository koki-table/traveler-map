import PrefecturePage from './prefecturePage'

export default async function Page({ params }: { params: { prefecture: string } }) {
  return <PrefecturePage params={params} />
}
