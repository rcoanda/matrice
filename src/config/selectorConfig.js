import BtnSelector from '../composants/selector/BtnSelector'
import ViewSelector from '../composants/selector/ViewSelector'

const SELECTORS = [
  { key: 'btnKey', label: 'btn', component: BtnSelector, viewKey: null, dataKey: null },
  { key: 'gridKey', label: 'grid', component: ViewSelector, viewKey: 'gridKey', dataKey: 'metaKey' },
  { key: 'ellipseKey', label: 'view', component: ViewSelector, viewKey: 'ellipseKey', dataKey: 'metaKey' },
  { key: 'cylinderKey', label: 'view', component: ViewSelector, viewKey: 'cylinderKey', dataKey: 'metaKey' },
  { key: 'sphereKey', label: 'view', component: ViewSelector, viewKey: 'sphereKey', dataKey: 'metaKey' },
]

export function getAllSelectors() {
  return SELECTORS
}

export function getAllKeys() {
  return SELECTORS.map((s) => s.key)
}

export function getList(keys) {
  return keys ? SELECTORS.filter((s) => keys.includes(s.key)) : SELECTORS
}

export function getSelector(key) {
  return SELECTORS.find((s) => s.key === key)
}
