import SphereView from '../composants/view/SphereView'
import CylinderView from '../composants/view/CylinderView'
import EllipseView from '../composants/view/EllipseView'

const VIEW_MODES = [
  { key: 'sphereKey', label: 'sphere', component: SphereView },
  { key: 'cylinderKey', label: 'cylinder', component: CylinderView },
  { key: 'ellipseKey', label: 'ellipse', component: EllipseView },
]

export function getAllViewModes() {
  return VIEW_MODES
}

export function getViewMode(key) {
  return VIEW_MODES.find((m) => m.key === key)
}
