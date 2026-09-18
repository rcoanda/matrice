import { useState, useCallback, useEffect } from 'react'
import { getInit, getInitList } from '../config/config'
import { SelectionContext } from './SelectionContext'

//motion, view, data sont des Keys
export function SelectionProvider({ children }) {
  const [motion, setMotion] = useState(getInit('motionConfig'))
  const [view, setView] = useState(getInit('viewConfig'))
  const [data, setData] = useState(getInit('dataConfig'))
  const [motionOptions, setMotionOptions] = useState([])
  const [viewOptions, setViewOptions] = useState([])
  const [dataOptions, setDataOptions] = useState([])

  useEffect(() => {
    getInitList('motionConfig').then(setMotionOptions)
    getInitList('viewConfig').then(setViewOptions)
    getInitList('dataConfig').then(setDataOptions)
  }, [])

  const selectMotion = useCallback((key) => {
    setMotion(key)
    setView(null)
  }, [])

  const selectView = useCallback((key) => {
    setView(key)
    setMotion(null)
  }, [])

  const reset = useCallback(() => {
    setMotion(getInit('motionConfig'))
    setView(getInit('viewConfig'))
    setData(getInit('dataConfig'))
  }, [])

  return (
    <SelectionContext.Provider value={{ motion, selectMotion, view, selectView, data, setData, reset, motionOptions, viewOptions, dataOptions }}>
      {children}
    </SelectionContext.Provider>
  )
}