import Loading from '../composants/loading/Loading'
import { createItemsConfig } from './common/createItemsConfig'

const LOADINGS = [
  { key: 'loadingKey', label: 'loading screen', component: Loading },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(LOADINGS)