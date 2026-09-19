import CirclesMotion from '../composants/canvas/motion/CirclesMotion'
import LemniscatesMotion from '../composants/canvas/motion/LemniscatesMotion'

const MOTIONS = [
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
  { key: 'lemniscatesKey', label: 'lemniscates', component: LemniscatesMotion },
]

export function getAllItems() {
  return MOTIONS
}

export function getAllKeys() {
  return MOTIONS.map((m) => m.key)
}

export function getItems(keys) {
  return keys ? MOTIONS.filter((m) => keys.includes(m.key)) : MOTIONS
}

export function getItem(key) {
  return MOTIONS.find((m) => m.key === key)
}