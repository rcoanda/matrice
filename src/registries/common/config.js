import { INIT } from '../../tenants/index.js'

export const IS_LOCAL = import.meta.env.DEV

const configRegistries = import.meta.glob('../*Registry.js')
const configKeys = Object.keys(configRegistries)

let CONFIG_REGISTRIES = null
function getConfigRegistries() {
  if (!CONFIG_REGISTRIES) {
    CONFIG_REGISTRIES = {}
    for (const key of configKeys) {
      const name = key.replace('../', '').replace('.js', '')
      CONFIG_REGISTRIES[name] = configRegistries[key]
    }
  }
  return CONFIG_REGISTRIES
}

export function getAllItems() {
  return INIT
}

export function getKey(config) {
  const item = INIT.find((i) => i.config === config)
  return item ? item.key : undefined
}

export async function getItems(config) {
  const item = INIT.find((i) => i.config === config)
  const registry = await getConfigRegistries()[config]?.()
  if (!registry) return []
  const keys = item?.keys ?? await registry.getAllKeys()
  return registry.getItems(keys)
}