import Overlay from '../composants/overlay/Overlay'

const OVERLAYS = [
  { key: 'overlayKey', label: 'overlay', component: Overlay },
]

export function getAllOverlays() {
  return OVERLAYS
}

export function getAllKeys() {
  return OVERLAYS.map((o) => o.key)
}

export function getList(keys) {
  return keys ? OVERLAYS.filter((o) => keys.includes(o.key)) : OVERLAYS
}

export function getOverlay(key) {
  return OVERLAYS.find((o) => o.key === key)
}