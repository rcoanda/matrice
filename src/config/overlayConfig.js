import Overlay from '../composants/overlay/Overlay'

const OVERLAY_TYPES = [
  { key: 'overlayKey', label: 'overlay', component: Overlay },
]

export function getAllOverlayTypes() {
  return OVERLAY_TYPES
}

export function getAllKeys() {
  return OVERLAY_TYPES.map((o) => o.key)
}

export function getList(keys) {
  return keys ? OVERLAY_TYPES.filter((o) => keys.includes(o.key)) : OVERLAY_TYPES
}

export function getOverlayType(key) {
  return OVERLAY_TYPES.find((o) => o.key === key)
}