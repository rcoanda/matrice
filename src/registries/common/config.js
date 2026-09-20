import { RESOURCES } from '../../tenants/index.js'

export const IS_LOCAL = import.meta.env.DEV

const filenamesRegistries = import.meta.glob('../*Registry.js')
const keys = Object.keys(filenamesRegistries)

let REGISTRIES = null
function getResources() {
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