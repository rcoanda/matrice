import matrice from '../design/matrice'
import julis from '../design/julis'
import { createItemsConfig } from './common/createItemsConfig'

const DESIGNS = [
  { key: 'matriceKey', label: 'Matrice', file: matrice },
  { key: 'julisKey', label: 'Julis', file: julis },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(DESIGNS, { fallback: true })