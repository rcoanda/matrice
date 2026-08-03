import BtnSelector from '../composants/selector/BtnSelector'
import RosetteSelector from '../composants/selector/RosetteSelector'
import CarouselSelector from '../composants/selector/CarouselSelector'

const SELECTOR_TYPES = [
  { key: 'btnKey', label: 'btn', component: BtnSelector },
  { key: 'rosetteKey', label: 'rosette', component: RosetteSelector },
  { key: 'carouselKey', label: 'carousel', component: CarouselSelector },
]

export function getAllSelectorTypes() {
  return SELECTOR_TYPES
}

export function getSelectorType(key) {
  return SELECTOR_TYPES.find((s) => s.key === key)
}
