import CameraHero from '../composants/hero/CameraHero'
import AquaHero from '../composants/hero/AquaHero'
import SpaceHero from '../composants/hero/SpaceHero'
import MotionHero from '../composants/hero/MotionHero'
import ViewHero from '../composants/hero/ViewHero'


const HEROES = [
  { key: 'cameraKey', label: 'camera frustum', component: CameraHero },
  { key: 'aquaKey', label: 'aqua', component: AquaHero },
  { key: 'spaceKey', label: 'space', component: SpaceHero },
  { key: 'circlesKey', label: 'circles', component: MotionHero, motion: 'circlesKey' },
  { key: 'ellipseKey', label: 'ellipse', component: ViewHero, view: 'ellipseKey' },
]

export function getAllHeroes() {
  return HEROES
}

export function getAllKeys() {
  return HEROES.map((h) => h.key)
}

export function getList(keys) {
  return keys ? HEROES.filter((h) => keys.includes(h.key)) : HEROES
}

export function getHero(key) {
  return HEROES.find((h) => h.key === key)
}
