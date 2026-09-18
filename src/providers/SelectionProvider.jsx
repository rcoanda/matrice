import { useState, useCallback, useEffect } from 'react'
import { getInit, getInitList } from '../config/config'
import { SelectionContext } from './SelectionContext'

//motionKey, viewKey, dataKey sont des Keys
export function SelectionProvider({ children }) {
  const [motionKey, setMotionKey] = useState(getInit('motionConfig'))
  const [viewKey, setViewKey] = useState(getInit('viewConfig'))
  const [dataKey, setDataKey] = useState(getInit('dataConfig'))
  const [motionItems, setMotionItems] = useState([])
  const [viewItems, setViewItems] = useState([])
  const [dataItems, setDataItems] = useState([])

  useEffect(() => {
    getInitList('motionConfig').then(setMotionItems)
    getInitList('viewConfig').then(setViewItems)
    getInitList('dataConfig').then(setDataItems)
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
    setMotionKey(getInit('motionConfig'))
    setViewKey(getInit('viewConfig'))
    setDataKey(getInit('dataConfig'))
  }, [])

  return (
    <SelectionContext.Provider value={{ motionKey, selectMotionKey, viewKey, selectViewKey, dataKey, setDataKey, reset, motionItems, viewItems, dataItems }}>
      {children}
    </SelectionContext.Provider>
  )
}