import CirclesMotion from '../composants/canvas/motion/CirclesMotion'
import HelicesMotion from '../composants/canvas/motion/HelicesMotion'
import LemniscatesMotion from '../composants/canvas/motion/LemniscatesMotion'
import { createGettersRegistry } from './common/createGettersRegistry'

const MOTION_REGISTRY = [
  //des ressources (items) 
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
  { key: 'lemniscatesKey', label: 'lemniscates', component: LemniscatesMotion },
  { key: 'helicesKey', label: 'helices', component: HelicesMotion },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(MOTION_REGISTRY)