import { INIT } from '../../tenants/index.js'

export const IS_LOCAL = import.meta.env.DEV

const configModules = import.meta.glob('../*Registry.js')
const configKeys = Object.keys(configModules)

let CONFIG_MODULES = null
function getConfigModules() {
  if (!CONFIG_MODULES) {
    CONFIG_MODULES = {}
    for (const key of configKeys) {
      const name = key.replace('../', '').replace('.js', '')
      CONFIG_MODULES[name] = configModules[key]
    }
  }
  return CONFIG_MODULES
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
  const mod = await getConfigModules()[config]?.()
  if (!mod) return []
  const keys = item?.keys ?? await mod.getAllKeys()
  return mod.getItems(keys)
}