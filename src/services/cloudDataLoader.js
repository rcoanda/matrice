import { getPhotoUrls } from './photoUrlsService'
import { getVideoUrls } from './videoUrlsService'

export async function loadCloudData(source, type) {
  const entries = type === 'video'
    ? await getVideoUrls(source)
    : await getPhotoUrls(source)
  return entries.map(({ url, title, artist, date, place }, i) => ({
    id: i + 1,
    title: title || '',
    artist: artist || '',
    date: date || '',
    place: place || '',
    image: type === 'image' ? url : null,
    video: type === 'video' ? url : null,
  }))
}