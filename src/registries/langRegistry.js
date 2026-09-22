import { createGettersRegistry } from './common/createGettersRegistry'

const LANG_REGISTRY = [
  //des ressources (items) 
  { key: 'frKey', label: 'FR', path: `${import.meta.env.BASE_URL}lang/fr`, codeHTML: 'fr' },
  { key: 'enKey', label: 'EN', path: `${import.meta.env.BASE_URL}lang/en`, codeHTML: 'en' },
]
//les getters des ressouces 
export const { getAllItems, getAllKeys, getItems, getItem } = createGettersRegistry(LANG_REGISTRY)
