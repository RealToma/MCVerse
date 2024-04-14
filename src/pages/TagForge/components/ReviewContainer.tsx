import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

const ReviewContainer = () => {
  const imgBlob = useGetLicensePlateReducerValues('imgBlob')

  if (!imgBlob) return null

  const blobUrl = URL.createObjectURL(imgBlob)

  return <>{blobUrl ? <img src={blobUrl} /> : <span>{'Nothing to show the image yet'}</span>}</>
}

export default ReviewContainer
