import MotionHero from '../composants/hero/MotionHero'
import ViewHero from '../composants/hero/ViewHero'


const HEROES = [
  { key: 'circlesKey', label: 'circles', component: MotionHero, motionKey: 'circlesKey' },
  { key: 'ellipseKey', label: 'ellipse', component: ViewHero, viewKey: 'ellipseKey' },
]

export function getAllItems() {
  return HEROES
}

export function getAllKeys() {
  return HEROES.map((h) => h.key)
}

export function getItems(keys) {
  return keys ? HEROES.filter((h) => keys.includes(h.key)) : HEROES
}

export function getItem(key) {
  return HEROES.find((h) => h.key === key)
}
