import matrice from '../designSystem/matrice'
import aqua from '../designSystem/aqua'
import neon from '../designSystem/neon'

const DESIGN_SYSTEMS = [
  { key: 'matriceKey', label: 'Matrice', file: matrice },
  { key: 'aquaKey', label: 'Aqua', file: aqua },
  { key: 'neonKey', label: 'Neon', file: neon },
]

export function getAllDesignSystems() {
  return DESIGN_SYSTEMS
}

export function getDesignSystem(key) {
  const found = DESIGN_SYSTEMS.find((d) => d.key === key)
  return found ? found.file : DESIGN_SYSTEMS[0].file
}