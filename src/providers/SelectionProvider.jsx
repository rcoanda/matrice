import { useState, useCallback, useEffect } from 'react'
import { useTenant } from '../hooks/tenant/useTenant'
import { SelectionContext } from './SelectionContext'

//motionKey, viewKey, dataKey sont des Keys
export function SelectionProvider({ children }) {
  const { motionItem, viewItem, dataItem } = useTenant()
  const [motionKey, setMotionKey] = useState(null)
  const [viewKey, setViewKey] = useState(null)
  const [dataKey, setDataKey] = useState(null)

  useEffect(() => {
    if (motionItem) setMotionKey((k) => k ?? motionItem.key)
    if (viewItem) setViewKey((k) => k ?? viewItem.key)
    if (dataItem) setDataKey((k) => k ?? dataItem.key)
  }, [motionItem, viewItem, dataItem])

  const selectMotionKey = useCallback((key) => {
    setMotionKey(key)
    setViewKey(null)
  }, [])

  const selectViewKey = useCallback((key) => {
    setViewKey(key)
    setMotionKey(null)
  }, [])

  const reset = useCallback(() => {
    setMotionKey(motionItem?.key ?? null)
    setViewKey(viewItem?.key ?? null)
    setDataKey(dataItem?.key ?? null)
  }, [motionItem, viewItem, dataItem])

  return (
    <SelectionContext.Provider value={{ motionKey, selectMotionKey, viewKey, selectViewKey, dataKey, setDataKey, reset }}>
      {children}
    </SelectionContext.Provider>
  )
}