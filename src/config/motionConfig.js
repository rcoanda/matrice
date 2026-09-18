import CirclesMotion from '../composants/canvas/motion/CirclesMotion'
import LemniscatesMotion from '../composants/canvas/motion/LemniscatesMotion'

const MOTION_ITEMS = [
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
  { key: 'lemniscatesKey', label: 'lemniscates', component: LemniscatesMotion },
]

export function getAllMotions() {
  return MOTION_ITEMS
}

export function getAllKeys() {
  return MOTION_ITEMS.map((m) => m.key)
}

export function getList(keys) {
  return keys ? MOTION_ITEMS.filter((m) => keys.includes(m.key)) : MOTION_ITEMS
}

export function getMotion(key) {
  return MOTION_ITEMS.find((m) => m.key === key)
}