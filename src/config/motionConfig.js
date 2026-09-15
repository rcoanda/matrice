import CirclesMotion from '../composants/canvas/motion/CirclesMotion'

const MOTION_MODES = [
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
]

export function getAllMotionModes() {
  return MOTION_MODES
}

export function getAllKeys() {
  return MOTION_MODES.map((m) => m.key)
}

export function getList(keys) {
  return keys ? MOTION_MODES.filter((m) => keys.includes(m.key)) : MOTION_MODES
}

export function getMotionMode(key) {
  return MOTION_MODES.find((m) => m.key === key)
}