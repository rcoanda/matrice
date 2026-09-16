import matrice from '../designSystem/matrice'
import aqua from '../designSystem/aqua'
import neon from '../designSystem/neon'
import julis from '../designSystem/julis'
import { getInit } from './config'

const DESIGN_SYSTEMS = [
  { key: 'matriceKey', label: 'Matrice', file: matrice },
  { key: 'aquaKey', label: 'Aqua', file: aqua },
  { key: 'neonKey', label: 'Neon', file: neon },
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

export function getActiveDesignSystem() {
  return getDesignSystem(getInit('designSystemConfig'))
}

// Vrai uniquement si le design system configuré définit le groupe de tokens donné
// (ex: seul julis définit « grid » et « list »).
export function designSystemHasGroup(group) {
  const ds = getActiveDesignSystem()
  return Boolean(ds && ds[group])
}