import CameraHero from '../composants/hero/CameraHero'
import AquaHero from '../composants/hero/AquaHero'
import SpaceHero from '../composants/hero/SpaceHero'
import CirclesNatureHero from '../composants/hero/CirclesNatureHero'

const HERO_TYPES = [
  { key: 'cameraKey', label: 'camera frustum', component: CameraHero },
  { key: 'aquaKey', label: 'aqua', component: AquaHero },
  { key: 'spaceKey', label: 'space', component: SpaceHero },
  { key: 'circlesnatureKey', label: 'circlesnature', component: CirclesNatureHero },
]

export function getAllHeroTypes() {
  return HERO_TYPES
}

export function getAllKeys() {
  return HERO_TYPES.map((h) => h.key)
}

export function getList(keys) {
  return keys ? HERO_TYPES.filter((h) => keys.includes(h.key)) : HERO_TYPES
}

export function getHeroType(key) {
  return HERO_TYPES.find((h) => h.key === key)
}
