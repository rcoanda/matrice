import BtnSelector from '../composants/selector/BtnSelector'
import ViewSelector from '../composants/selector/ViewSelector'

const SELECTOR_TYPES = [
  { key: 'btnKey', label: 'btn', component: BtnSelector, viewMode: null, dataSource: null },
  { key: 'gridKey', label: 'grid', component: ViewSelector, viewMode: 'gridKey', dataSource: 'metaKey' },
  { key: 'ellipseKey', label: 'view', component: ViewSelector, viewMode: 'ellipseKey', dataSource: 'metaKey' },
  { key: 'cylinderKey', label: 'view', component: ViewSelector, viewMode: 'cylinderKey', dataSource: 'metaKey' },
  { key: 'sphereKey', label: 'view', component: ViewSelector, viewMode: 'sphereKey', dataSource: 'metaKey' },
]

export function getAllSelectorTypes() {
  return SELECTOR_TYPES
}

export function getAllKeys() {
  return SELECTOR_TYPES.map((s) => s.key)
}

export function getList(keys) {
  return keys ? SELECTOR_TYPES.filter((s) => keys.includes(s.key)) : SELECTOR_TYPES
}

export function getSelectorType(key) {
  return SELECTOR_TYPES.find((s) => s.key === key)
}
