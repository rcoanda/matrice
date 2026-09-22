import ControlPanelSelector from '../composants/selector/ControlPanelSelector'
import ViewSelector from '../composants/selector/ViewSelector'
import { createGettersRegistry } from './common/createGettersRegistry'

const SELECTOR_REGISTRY = [
  //des ressources (items) 
  { key: 'btnKey', label: 'btn', component: ControlPanelSelector, viewKey: null, dataKey: null },
  { key: 'gridKey', label: 'grid', component: ViewSelector, viewKey: 'gridKey', dataKey: 'metaKey' },
  { key: 'ellipseKey', label: 'view', component: ViewSelector, viewKey: 'ellipseKey', dataKey: 'metaKey' },
  { key: 'cylinderKey', label: 'view', component: ViewSelector, viewKey: 'cylinderKey', dataKey: 'metaKey' },
  { key: 'sphereKey', label: 'view', component: ViewSelector, viewKey: 'sphereKey', dataKey: 'metaKey' },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(SELECTOR_REGISTRY)
