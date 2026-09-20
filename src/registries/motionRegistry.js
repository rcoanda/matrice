import CirclesMotion from '../composants/canvas/motion/CirclesMotion'
import HelicesMotion from '../composants/canvas/motion/HelicesMotion'
import LemniscatesMotion from '../composants/canvas/motion/LemniscatesMotion'
import { createItemsConfig } from './common/createItemsConfig'

const MOTIONS = [
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
  { key: 'lemniscatesKey', label: 'lemniscates', component: LemniscatesMotion },
  { key: 'helicesKey', label: 'helices', component: HelicesMotion },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(MOTIONS)