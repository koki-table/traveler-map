import UploadPage from './upload-page'

export default async function Page({ params }: { params: { prefecture: string } }) {
  return <UploadPage params={params} />
}
