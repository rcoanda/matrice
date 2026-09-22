import Overlay from '../composants/overlay/Overlay'
import { createGettersRegistry } from './common/createGettersRegistry'

const OVERLAY_REGISTRY = [
  //des ressources (items) 
  { key: 'overlayKey', label: 'overlay', component: Overlay },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(OVERLAY_REGISTRY)