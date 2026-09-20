import SphereView from '../composants/canvas/view/SphereView'
import CylinderView from '../composants/canvas/view/CylinderView'
import EllipseView from '../composants/canvas/view/EllipseView'
import ListView from '../composants/canvas/view/ListView'
import GridView from '../composants/canvas/view/GridView'
import { createItemsConfig } from './common/createItemsConfig'

const VIEWS = [
  { key: 'sphereKey', label: 'sphere', component: SphereView },
  { key: 'cylinderKey', label: 'cylinder', component: CylinderView },
  { key: 'ellipseKey', label: 'ellipse', component: EllipseView },
  { key: 'listKey', label: 'list', component: ListView },
  { key: 'gridKey', label: 'grid', component: GridView },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(VIEWS)
