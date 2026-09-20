import { useState, useCallback, useEffect } from 'react'
import { getKey, getItems, MOTION, VIEW, DATA } from '../registries/common/config'
import { SelectionContext } from './SelectionContext'

//motionKey, viewKey, dataKey sont des Keys
export function SelectionProvider({ children }) {
  const [motionKey, setMotionKey] = useState(getKey(MOTION))
  const [viewKey, setViewKey] = useState(getKey(VIEW))
  const [dataKey, setDataKey] = useState(getKey(DATA))
  const [motionItems, setMotionItems] = useState([])
  const [viewItems, setViewItems] = useState([])
  const [dataItems, setDataItems] = useState([])

  useEffect(() => {
    getItems(MOTION).then(setMotionItems)
    getItems(VIEW).then(setViewItems)
    getItems(DATA).then(setDataItems)
  }, [])

  const selectMotionKey = useCallback((key) => {
    setMotionKey(key)
    setViewKey(null)
  }, [])

  const selectViewKey = useCallback((key) => {
    setViewKey(key)
    setMotionKey(null)
  }, [])

  const reset = useCallback(() => {
    setMotionKey(getKey(MOTION))
    setViewKey(getKey(VIEW))
    setDataKey(getKey(DATA))
  }, [])

  return (
    <SelectionContext.Provider value={{ motionKey, selectMotionKey, viewKey, selectViewKey, dataKey, setDataKey, reset, motionItems, viewItems, dataItems }}>
      {children}
    </SelectionContext.Provider>
  )
}