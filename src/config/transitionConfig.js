import Transition from '../composants/transition/Transition'

const TRANSITION_TYPES = [
  { key: 'transitionKey', label: 'transition', component: Transition },
]

export function getAllTransitionTypes() {
  return TRANSITION_TYPES
}

export function getAllKeys() {
  return TRANSITION_TYPES.map((t) => t.key)
}

export function getList(keys) {
  return keys ? TRANSITION_TYPES.filter((t) => keys.includes(t.key)) : TRANSITION_TYPES
}

export function getTransitionType(key) {
  return TRANSITION_TYPES.find((t) => t.key === key)
}