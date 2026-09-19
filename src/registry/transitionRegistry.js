import Transition from '../composants/transition/Transition'
import { createItemsConfig } from './common/createItemsConfig'

const TRANSITIONS = [
  { key: 'transitionKey', label: 'transition', component: Transition },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(TRANSITIONS)