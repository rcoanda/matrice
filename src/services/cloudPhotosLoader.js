import { getPhotoUrls } from './photoUrlsService'

export async function loadCloudPhotos(source) {
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