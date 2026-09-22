import { useEffect, useState } from 'react'
import { getAllItems, getAllRegistries } from '../../registries/common/tenantRegistry'

export function useTenant() {
  const [tenant, setTenant] = useState({})

  useEffect(() => {
    let cancelled = false

    async function load() {
      const result = {}
      for (const { registry, keys, hiddenKeys, key } of getAllItems()) {
        const resourceRegistry = await getAllRegistries()[registry]?.()
        if (!resourceRegistry) continue
        const base = registry.replace('Registry', '')
        const name = `${base.charAt(0).toLowerCase()}${base.slice(1)}`
        result[`${name}Items`] = keys ? await resourceRegistry.getItems(keys) : await resourceRegistry.getAllItems()
        if (registry === 'motionRegistry' || registry === 'viewRegistry') {
          result[`${name}HiddenItems`] = hiddenKeys ? await resourceRegistry.getItems(hiddenKeys) : []
        }
        if (key) result[`${name}Item`] = await resourceRegistry.getItem(key)
      }
      if (!cancelled) setTenant(result)
    }

    load()
    return () => { cancelled = true }
  }, [])

  return tenant
}