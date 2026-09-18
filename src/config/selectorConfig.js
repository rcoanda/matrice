import BtnSelector from '../composants/selector/BtnSelector'
import ViewSelector from '../composants/selector/ViewSelector'

const SELECTORS = [
  { key: 'btnKey', label: 'btn', component: BtnSelector, view: null, data: null },
  { key: 'gridKey', label: 'grid', component: ViewSelector, view: 'gridKey', data: 'metaKey' },
  { key: 'ellipseKey', label: 'view', component: ViewSelector, view: 'ellipseKey', data: 'metaKey' },
  { key: 'cylinderKey', label: 'view', component: ViewSelector, view: 'cylinderKey', data: 'metaKey' },
  { key: 'sphereKey', label: 'view', component: ViewSelector, view: 'sphereKey', data: 'metaKey' },
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
