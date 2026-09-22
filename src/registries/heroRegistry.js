import MotionHero from '../composants/hero/MotionHero'
import ViewHero from '../composants/hero/ViewHero'
import { createGettersRegistry } from './common/createGettersRegistry'


const HERO_REGISTRY = [
  //des ressources (items) 
  { key: 'circlesKey', label: 'circles', component: MotionHero, motionKey: 'circlesKey' },
  { key: 'ellipseKey', label: 'ellipse', component: ViewHero, viewKey: 'ellipseKey' },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(HERO_REGISTRY)
