import { TENANT_REGISTRY } from '../../tenants/tenant.js'

export const IS_LOCAL = import.meta.env.DEV

//registry = un fichier resourceRegistry.js , 
// conenant un registre (array) RESOURCEREGISTRY de ressources (items) de même type et des getters
//les types de ressources : view, motion, data

//les ressources : des views, des motions, des datas(datasets)

//REGISTRIES = tous les registres definis dans le projet, proposants des ressources
// REGISTRIES['viewRegistry'] = filenamesRegistries['viewRegistry.js']
//'registry' = un champs du TENANT_REGISTRY, contenant des valeurs 'viewRegistry', etc.

//tenantRegistry.js = registre qui contient TENANT_REGISTRY,
// qui regroupe des ressources de types differentes, les ressources actives

const filenamesRegistries = import.meta.glob('../*Registry.js')
const keys = Object.keys(filenamesRegistries)

let REGISTRIES = null
export function getAllRegistries() {
  if (!REGISTRIES) {
    REGISTRIES = {}
    for (const key of keys) {
      const name = key.replace('../', '').replace('.js', '')
      REGISTRIES[name] = filenamesRegistries[key]
    }
  }
  return REGISTRIES
}
//les ressources du tenant
export function getAllItems() {
  return TENANT_REGISTRY
}
export function getKey(registry) {
  const item = TENANT_REGISTRY.find((i) => i.registry === registry)
  return item ? item.key : undefined
}

export async function getKeys(registry) {
  const item = TENANT_REGISTRY.find((i) => i.registry === registry)

  const resourceRegistry = await getAllRegistries()[registry]?.()
  if (!resourceRegistry) return []
  const keys = item?.keys ?? await resourceRegistry.getAllKeys()
  return keys
}

export function getItem(registry) {
  const item = TENANT_REGISTRY.find((i) => i.registry === registry)
  return item
}

export async function getItems(registry) {
  const item = TENANT_REGISTRY.find((i) => i.registry === registry)
  const resourceRegistry = await getAllRegistries()[registry]?.()
  if (!resourceRegistry) return []
  const keys = item?.keys ?? await resourceRegistry.getAllKeys()
  return resourceRegistry.getItems(keys)
}