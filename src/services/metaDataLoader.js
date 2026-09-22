import { createMetaArtWorkItem } from './createMetaArtWorkItem'

export async function loadMetaData(items = [], viewKey = null, motionKey = null) {
  return items.map(({ key, label }, i) => createMetaArtWorkItem({ dataKey: key ?? null, id: i + 1, collection: label, text: label, viewKey, motionKey }))
}