import { createMetaArtWorkItem } from './createMetaArtWorkItem'

export async function loadMetaData(items = []) {
  return items.map(({ key, label }, i) => createMetaArtWorkItem({ dataKey: key ?? null, id: i + 1, collection: label }))
}