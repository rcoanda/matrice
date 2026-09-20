import Overlay from '../composants/overlay/Overlay'
import { createItemsConfig } from './common/createItemsConfig'

const OVERLAYS = [
  { key: 'overlayKey', label: 'overlay', component: Overlay },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(OVERLAYS)