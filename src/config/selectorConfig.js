import BtnSelector from '../composants/selector/BtnSelector'
import ViewSelector from '../composants/selector/ViewSelector'

const SELECTOR_TYPES = [
  { key: 'btnKey', label: 'btn', component: BtnSelector, view: null, data: null },
  { key: 'gridKey', label: 'grid', component: ViewSelector, view: 'gridKey', data: 'metaKey' },
  { key: 'ellipseKey', label: 'view', component: ViewSelector, view: 'ellipseKey', data: 'metaKey' },
  { key: 'cylinderKey', label: 'view', component: ViewSelector, view: 'cylinderKey', data: 'metaKey' },
  { key: 'sphereKey', label: 'view', component: ViewSelector, view: 'sphereKey', data: 'metaKey' },
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
