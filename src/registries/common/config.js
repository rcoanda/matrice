import { RESOURCES } from '../../tenants/index.js'

export const IS_LOCAL = import.meta.env.DEV

// Un const par fichier *Registry.js
export const LANG = 'langRegistry'
export const MOTION = 'motionRegistry'
export const VIEW = 'viewRegistry'
export const DATA = 'dataRegistry'
export const SELECTOR = 'selectorRegistry'
export const OVERLAY = 'overlayRegistry'
export const TRANSITION = 'transitionRegistry'
export const LOADING = 'loadingRegistry'
export const HERO = 'heroRegistry'
export const DESIGN = 'designRegistry'



const filenamesRegistries = import.meta.glob('../*Registry.js')
const keys = Object.keys(filenamesRegistries)

let REGISTRIES = null
export function getResources() {
  if (!REGISTRIES) {
    REGISTRIES = {}
    for (const key of keys) {
      const name = key.replace('../', '').replace('.js', '')
      REGISTRIES[name] = filenamesRegistries[key]
    }
  }
  return REGISTRIES
}

export function getAllItems() {
  return RESOURCES
}

export function getKey(registry) {
  const item = RESOURCES.find((i) => i.registry === registry)
  return item ? item.key : undefined
}

export async function getItems(registry) {
  const item = RESOURCES.find((i) => i.registry === registry)
  const resource = await getResources()[registry]?.()
  if (!resource) return []
  const keys = item?.keys ?? await resource.getAllKeys()
  return resource.getItems(keys)
}