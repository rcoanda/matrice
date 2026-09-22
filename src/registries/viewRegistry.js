import SphereView from '../composants/canvas/view/SphereView'
import CylinderView from '../composants/canvas/view/CylinderView'
import EllipseView from '../composants/canvas/view/EllipseView'
import ListView from '../composants/canvas/view/ListView'
import GridView from '../composants/canvas/view/GridView'
import { createGettersRegistry } from './common/createGettersRegistry'

const VIEW_REGISTRY = [
  //des ressources (items) de type view
  { key: 'sphereKey', label: 'sphere', component: SphereView },
  { key: 'cylinderKey', label: 'cylinder', component: CylinderView },
  { key: 'ellipseKey', label: 'ellipse', component: EllipseView },
  { key: 'listKey', label: 'list', component: ListView },
  { key: 'gridKey', label: 'grid', component: GridView },
]
//les getters des ressouces de type view
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(VIEW_REGISTRY)
