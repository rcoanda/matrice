import Header from '../composants/layout/Header'
import { createGettersRegistry } from './common/createGettersRegistry'

const HEADER_REGISTRY = [
  //des ressources (items) 
  { key: 'headerKey', label: 'header', component: Header },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(HEADER_REGISTRY)