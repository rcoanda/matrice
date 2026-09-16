import BtnSelector from '../composants/selector/BtnSelector'
import ViewSelector from '../composants/selector/ViewSelector'

const SELECTOR_TYPES = [
  { key: 'btnKey', label: 'btn', component: BtnSelector, viewMode: null },
  { key: 'viewKey', label: 'view', component: ViewSelector, viewMode: 'ellipseKey' },
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
