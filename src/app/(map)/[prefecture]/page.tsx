import PrefecturePage from './prefecture-page'

export default async function Page({ params }: { params: { prefecture: string } }) {
  return <PrefecturePage params={params} />
}
