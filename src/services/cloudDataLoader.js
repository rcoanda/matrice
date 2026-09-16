import { getPhotoUrls } from './photoUrlsService'
import { getVideoUrls } from './videoUrlsService'
import { getGlbUrls } from './glbUrlsService'

export async function loadCloudData(source, type, label) {
  const entries = type === 'video'
    ? await getVideoUrls(source)
    : type === 'glb'
      ? await getGlbUrls(source)
      : await getPhotoUrls(source)
  return entries.map(({ url, title, artist, date, place }, i) => ({
    id: i + 1,
    collection: label || null,
    title: title || '',
    artist: artist || '',
    date: date || '',
    place: place || '',
    image: type === 'image' ? url : null,
    video: type === 'video' ? url : null,
    glb: type === 'glb' ? url : null,
  }))
}