import Transition from '../composants/transition/Transition'

const TRANSITIONS = [
  { key: 'transitionKey', label: 'transition', component: Transition },
]

export function getAllItems() {
  return TRANSITIONS
}

export function getAllKeys() {
  return TRANSITIONS.map((t) => t.key)
}

export function getItems(keys) {
  return keys ? TRANSITIONS.filter((t) => keys.includes(t.key)) : TRANSITIONS
}

export function getItem(key) {
  return TRANSITIONS.find((t) => t.key === key)
}