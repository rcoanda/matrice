import BtnSelector from '../composants/selector/BtnSelector'
import ViewSelector from '../composants/selector/ViewSelector'
import { createItemsConfig } from './common/createItemsConfig'

const SELECTORS = [
  { key: 'btnKey', label: 'btn', component: BtnSelector, viewKey: null, dataKey: null },
  { key: 'gridKey', label: 'grid', component: ViewSelector, viewKey: 'gridKey', dataKey: 'metaKey' },
  { key: 'ellipseKey', label: 'view', component: ViewSelector, viewKey: 'ellipseKey', dataKey: 'metaKey' },
  { key: 'cylinderKey', label: 'view', component: ViewSelector, viewKey: 'cylinderKey', dataKey: 'metaKey' },
  { key: 'sphereKey', label: 'view', component: ViewSelector, viewKey: 'sphereKey', dataKey: 'metaKey' },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(SELECTORS)
