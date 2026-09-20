import { useEffect, useState } from 'react'
import { getAllItems, getResources } from '../../registries/common/config'

export function useTenant() {
  const [tenant, setTenant] = useState({})

  useEffect(() => {
    let cancelled = false

    async function load() {
      const result = {}
      for (const { registry, keys, key } of getAllItems()) {
        const module = await getResources()[registry]?.()
        if (!module) continue
        const base = registry.replace('Registry', '')
        const name = `${base.charAt(0).toLowerCase()}${base.slice(1)}`
        result[`${name}Items`] = keys ? await module.getItems(keys) : await module.getAllItems()
        if (key) result[`${name}Item`] = await module.getItem(key)
      }
      if (!cancelled) setTenant(result)
    }

    load()
    return () => { cancelled = true }
  }, [])

  return tenant
}