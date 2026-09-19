import { useState, useCallback, useEffect } from 'react'
import { getKey, getItems } from '../registry/common/config'
import { SelectionContext } from './SelectionContext'

//motionKey, viewKey, dataKey sont des Keys
export function SelectionProvider({ children }) {
  const [motionKey, setMotionKey] = useState(getKey('motionRegistry'))
  const [viewKey, setViewKey] = useState(getKey('viewRegistry'))
  const [dataKey, setDataKey] = useState(getKey('dataRegistry'))
  const [motionItems, setMotionItems] = useState([])
  const [viewItems, setViewItems] = useState([])
  const [dataItems, setDataItems] = useState([])

  useEffect(() => {
    getItems('motionRegistry').then(setMotionItems)
    getItems('viewRegistry').then(setViewItems)
    getItems('dataRegistry').then(setDataItems)
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
    setMotionKey(getKey('motionRegistry'))
    setViewKey(getKey('viewRegistry'))
    setDataKey(getKey('dataRegistry'))
  }, [])

  return (
    <SelectionContext.Provider value={{ motionKey, selectMotionKey, viewKey, selectViewKey, dataKey, setDataKey, reset, motionItems, viewItems, dataItems }}>
      {children}
    </SelectionContext.Provider>
  )
}