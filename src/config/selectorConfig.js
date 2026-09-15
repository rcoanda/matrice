import BtnSelector from '../composants/selector/BtnSelector'

const SELECTOR_TYPES = [
  { key: 'btnKey', label: 'btn', component: BtnSelector },
]

export function getAllSelectorTypes() {
  return SELECTOR_TYPES
}

export function getSelectorType(key) {
  return SELECTOR_TYPES.find((s) => s.key === key)
}
