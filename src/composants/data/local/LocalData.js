import { getPhotoUrls } from '../../../services/photoService'

export async function loadLocalPhotos(source) {
  const urls = await getPhotoUrls(source)
  return urls.map((url, i) => ({
    id: i + 1,
    title: '',
    artist: '',
    date: '',
    place: '',
    image: url,
  }))
}