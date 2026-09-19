import matrice from '../design/matrice'
import julis from '../design/julis'

const DESIGNS = [
  { key: 'matriceKey', label: 'Matrice', file: matrice },
  { key: 'julisKey', label: 'Julis', file: julis },
]

export function getAllItems() {
  return DESIGNS
}

export function getAllKeys() {
  return DESIGNS.map((d) => d.key)
}

export function getItems(keys) {
  return keys ? DESIGNS.filter((d) => keys.includes(d.key)) : DESIGNS
}

export function getItem(key) {
  const found = DESIGNS.find((d) => d.key === key)
  return found ? found : DESIGNS[0]
}