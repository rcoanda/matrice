import CirclesMotion from '../composants/canvas/motion/CirclesMotion'

const MOTION_MODES = [
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
]

export function getAllMotionModes() {
  return MOTION_MODES
}

export function getMotionMode(key) {
  return MOTION_MODES.find((m) => m.key === key)
}