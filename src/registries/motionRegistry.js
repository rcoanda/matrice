import CirclesMotion from '../composants/canvas/motion/CirclesMotion'
import LemniscatesMotion from '../composants/canvas/motion/LemniscatesMotion'
import { createItemsConfig } from './common/createItemsConfig'

const MOTIONS = [
  { key: 'circlesKey', label: 'circles', component: CirclesMotion },
  { key: 'lemniscatesKey', label: 'lemniscates', component: LemniscatesMotion },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(MOTIONS)