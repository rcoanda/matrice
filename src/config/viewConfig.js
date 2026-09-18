import SphereView from '../composants/canvas/view/SphereView'
import CylinderView from '../composants/canvas/view/CylinderView'
import EllipseView from '../composants/canvas/view/EllipseView'
import ListView from '../composants/canvas/view/ListView'
import GridView from '../composants/canvas/view/GridView'

const VIEW_MODES = [
  { key: 'sphereKey', label: 'sphere', component: SphereView },
  { key: 'cylinderKey', label: 'cylinder', component: CylinderView },
  { key: 'ellipseKey', label: 'ellipse', component: EllipseView },
  { key: 'listKey', label: 'list', component: ListView },
  { key: 'gridKey', label: 'grid', component: GridView },
]

export function getAllViews() {
  return VIEW_MODES
}

export function getAllKeys() {
  return VIEW_MODES.map((v) => v.key)
}

export function getList(keys) {
  return keys ? VIEW_MODES.filter((v) => keys.includes(v.key)) : VIEW_MODES
}

export function getView(key) {
  return VIEW_MODES.find((m) => m.key === key)
}
