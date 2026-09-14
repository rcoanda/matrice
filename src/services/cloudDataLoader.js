import { getPhotoUrls } from './photoUrlsService'
import { getVideoUrls } from './videoUrlsService'

export async function loadCloudData(source, type) {
  const urls = type === 'video'
    ? await getVideoUrls(source)
    : await getPhotoUrls(source)
  return urls.map((url, i) => ({
    id: i + 1,
    title: '',
    artist: '',
    date: '',
    place: '',
    image: type === 'image' ? url : null,
    video: type === 'video' ? url : null,
  }))
}