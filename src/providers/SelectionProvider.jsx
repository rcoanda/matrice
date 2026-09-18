import { useState, useCallback, useEffect } from 'react'
import { getInit, getInitList } from '../config/config'
import { SelectionContext } from './SelectionContext'

//motion, viewKey, data sont des Keys
export function SelectionProvider({ children }) {
  const [motion, setMotion] = useState(getInit('motionConfig'))
  const [viewKey, setViewKey] = useState(getInit('viewConfig'))
  const [data, setData] = useState(getInit('dataConfig'))
  const [motionOptions, setMotionOptions] = useState([])
  const [viewItems, setViewItems] = useState([])
  const [dataOptions, setDataOptions] = useState([])

  useEffect(() => {
    getInitList('motionConfig').then(setMotionOptions)
    getInitList('viewConfig').then(setViewItems)
    getInitList('dataConfig').then(setDataOptions)
  }, [])

  const selectMotion = useCallback((key) => {
    setMotion(key)
    setViewKey(null)
  }, [])

  const selectViewKey = useCallback((key) => {
    setViewKey(key)
    setMotion(null)
  }, [])

  const reset = useCallback(() => {
    setMotion(getInit('motionConfig'))
    setViewKey(getInit('viewConfig'))
    setData(getInit('dataConfig'))
  }, [])

  return (
    <SelectionContext.Provider value={{ motion, selectMotion, viewKey, selectViewKey, data, setData, reset, motionOptions, viewItems, dataOptions }}>
      {children}
    </SelectionContext.Provider>
  )
}