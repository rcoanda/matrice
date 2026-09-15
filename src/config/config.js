export const IS_LOCAL = import.meta.env.DEV

const CLIENT = import.meta.env.VITE_CLIENT || 'demo'
const clientModules = import.meta.glob('./clients/*.js', { eager: true })
const clientPath = `./clients/${CLIENT}.js`
const INIT = clientModules[clientPath]?.default || []

const configModules = import.meta.glob('./*Config.js')
const configKeys = Object.keys(configModules)

let CONFIG_MODULES = null
function getConfigModules() {
  if (!CONFIG_MODULES) {
    CONFIG_MODULES = {}
    for (const key of configKeys) {
      const name = key.replace('./', '').replace('.js', '')
      CONFIG_MODULES[name] = configModules[key]
    }
  }
  return CONFIG_MODULES
}

export function getAllInit() {
  return INIT
}

export function getInit(config) {
  const item = INIT.find((i) => i.config === config)
  return item ? item.init ?? item.default : undefined
}

export async function getInitList(config) {
  const item = INIT.find((i) => i.config === config)
  const mod = await getConfigModules()[config]?.()
  if (!mod) return []
  const keys = item?.list ?? await mod.getAllKeys()
  return mod.getList(keys)
}