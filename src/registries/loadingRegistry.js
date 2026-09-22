import Loading from '../composants/loading/Loading'
import { createGettersRegistry } from './common/createGettersRegistry'

const LOADING_REGISTRY = [
  //des ressources (items) 
  { key: 'loadingKey', label: 'loading screen', component: Loading },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(LOADING_REGISTRY)