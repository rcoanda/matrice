import { createItemsConfig } from './common/createItemsConfig'

const LANGUES = [
  { key: 'frKey', label: 'FR', path: `${import.meta.env.BASE_URL}lang/fr`, codeHTML: 'fr' },
  { key: 'enKey', label: 'EN', path: `${import.meta.env.BASE_URL}lang/en`, codeHTML: 'en' },
]

export const { getAllItems, getAllKeys, getItems, getItem } = createItemsConfig(LANGUES)
