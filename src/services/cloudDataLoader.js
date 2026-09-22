import { getPhotoUrls } from './photoUrlsService'
import { getVideoUrls } from './videoUrlsService'
import { getGlbUrls } from './glbUrlsService'
import { createArtWorkItem } from './createArtWorkItem'

export async function loadCloudData(source, type, label) {
  const entries = type === 'video'
    ? await getVideoUrls(source)
    : type === 'glb'
      ? await getGlbUrls(source)
      : await getPhotoUrls(source)
  return entries.map(({ url, title, artist, date, place }, i) =>
    createArtWorkItem({ id: i + 1, collection: label, title, artist, date, place, url, type })
  )
}