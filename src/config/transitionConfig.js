import Transition from '../composants/transition/Transition'

const TRANSITIONS = [
  { key: 'transitionKey', label: 'transition', component: Transition },
]

export function getAllTransitions() {
  return TRANSITIONS
}

export function getAllKeys() {
  return TRANSITIONS.map((t) => t.key)
}

export function getList(keys) {
  return keys ? TRANSITIONS.filter((t) => keys.includes(t.key)) : TRANSITIONS
}

export function getTransition(key) {
  return TRANSITIONS.find((t) => t.key === key)
}