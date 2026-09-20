import Header from '../composants/layout/Header'
import { createItemsConfig } from './common/createItemsConfig'

const HEADERS = [
  { key: 'headerKey', label: 'header', component: Header },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(HEADERS)