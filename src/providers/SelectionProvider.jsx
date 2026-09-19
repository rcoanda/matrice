import { useState, useCallback, useEffect } from 'react'
import { getKey, getItems } from '../config/common/config'
import { SelectionContext } from './SelectionContext'

//motionKey, viewKey, dataKey sont des Keys
export function SelectionProvider({ children }) {
  const [motionKey, setMotionKey] = useState(getKey('motionConfig'))
  const [viewKey, setViewKey] = useState(getKey('viewConfig'))
  const [dataKey, setDataKey] = useState(getKey('dataConfig'))
  const [motionItems, setMotionItems] = useState([])
  const [viewItems, setViewItems] = useState([])
  const [dataItems, setDataItems] = useState([])

  useEffect(() => {
    getItems('motionConfig').then(setMotionItems)
    getItems('viewConfig').then(setViewItems)
    getItems('dataConfig').then(setDataItems)
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
    setMotionKey(getKey('motionConfig'))
    setViewKey(getKey('viewConfig'))
    setDataKey(getKey('dataConfig'))
  }, [])

  return (
    <SelectionContext.Provider value={{ motionKey, selectMotionKey, viewKey, selectViewKey, dataKey, setDataKey, reset, motionItems, viewItems, dataItems }}>
      {children}
    </SelectionContext.Provider>
  )
}