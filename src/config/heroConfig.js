import MotionHero from '../composants/hero/MotionHero'
import ViewHero from '../composants/hero/ViewHero'
import { createItemsConfig } from './common/createItemsConfig'


const HEROES = [
  { key: 'circlesKey', label: 'circles', component: MotionHero, motionKey: 'circlesKey' },
  { key: 'ellipseKey', label: 'ellipse', component: ViewHero, viewKey: 'ellipseKey' },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(HEROES)
