import { createArtWorkItem } from './createArtWorkItem'

export async function loadMetaData(items = []) {
  return items.map(({ key, label }, i) => createArtWorkItem({ dataKey: key ?? null, id: i + 1, collection: label }))
}