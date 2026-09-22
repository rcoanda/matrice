import { createArtWorkItem } from './createArtWorkItem'

export async function loadMetaData(labels = []) {
  return labels.map((label, i) => createArtWorkItem({ id: i + 1, collection: label }))
}