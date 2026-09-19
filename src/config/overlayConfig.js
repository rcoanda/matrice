import Overlay from '../composants/overlay/Overlay'

const OVERLAYS = [
  { key: 'overlayKey', label: 'overlay', component: Overlay },
]

export function getAllItems() {
  return OVERLAYS
}

export function getAllKeys() {
  return OVERLAYS.map((o) => o.key)
}

export function getItems(keys) {
  return keys ? OVERLAYS.filter((o) => keys.includes(o.key)) : OVERLAYS
}

export function getItem(key) {
  return OVERLAYS.find((o) => o.key === key)
}