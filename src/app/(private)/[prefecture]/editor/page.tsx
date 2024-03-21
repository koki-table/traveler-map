import EditorPage from './editor-page'

export default async function Page({ params }: { params: { prefecture: string } }) {
  return <EditorPage params={params} />
}
