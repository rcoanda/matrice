import Transition from '../composants/transition/Transition'
import { createGettersRegistry } from './common/createGettersRegistry'

const TRANSITION_REGISTRY = [
  //des ressources (items) 
  { key: 'transitionKey', label: 'transition', component: Transition },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(TRANSITION_REGISTRY)