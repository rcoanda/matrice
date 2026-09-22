import matrice from '../design/matrice'
import julis from '../design/julis'
import { createGettersRegistry } from './common/createGettersRegistry'

const DESIGN_REGISTRY = [
  //des ressources (items) de type design
  { key: 'matriceKey', label: 'Matrice', file: matrice },
  { key: 'julisKey', label: 'Julis', file: julis },
]
//les getters des ressouces de type design
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(DESIGN_REGISTRY, { fallback: true })