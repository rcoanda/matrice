import matrice from '../designSystem/matrice'
import julis from '../designSystem/julis'

const DESIGN_SYSTEMS = [
  { key: 'matriceKey', label: 'Matrice', file: matrice },
  { key: 'julisKey', label: 'Julis', file: julis },
]

export function getAllDesignSystems() {
  return DESIGN_SYSTEMS
}

export function getAllKeys() {
  return DESIGN_SYSTEMS.map((d) => d.key)
}

export function getList(keys) {
  return keys ? DESIGN_SYSTEMS.filter((d) => keys.includes(d.key)) : DESIGN_SYSTEMS
}

export function getDesignSystem(key) {
  const found = DESIGN_SYSTEMS.find((d) => d.key === key)
  return found ? found.file : DESIGN_SYSTEMS[0].file
}