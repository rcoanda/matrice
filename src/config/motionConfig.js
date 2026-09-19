import CirclesMotion from '../composants/canvas/motion/CirclesMotion'
import LemniscatesMotion from '../composants/canvas/motion/LemniscatesMotion'

const MOTIONS = [
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
  { key: 'lemniscatesKey', label: 'lemniscates', component: LemniscatesMotion },
]

export function getAllMotions() {
  return MOTIONS
}

export function getAllKeys() {
  return MOTIONS.map((m) => m.key)
}

export function getList(keys) {
  return keys ? MOTIONS.filter((m) => keys.includes(m.key)) : MOTIONS
}

export function getMotion(key) {
  return MOTIONS.find((m) => m.key === key)
}