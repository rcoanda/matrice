import { createContext, useState, useCallback } from 'react'
import { getInit } from '../config/config'

export const SelectionContext = createContext(null)
//motionMode, viewMode, dataSources sont des Key
export function SelectionProvider({ children }) {
  const [motionMode, setMotionMode] = useState(getInit('motionConfig'))
  const [viewMode, setViewMode] = useState(getInit('viewConfig'))
  const [dataSource, setDataSource] = useState(getInit('dataConfig'))

  const selectMotion = useCallback((key) => {
    setMotionMode(key)
    setViewMode(null)
  }, [])

  const selectView = useCallback((key) => {
    setViewMode(key)
    setMotionMode(null)
  }, [])

  const reset = useCallback(() => {
    setMotionMode(getInit('motionConfig'))
    setViewMode(getInit('viewConfig'))
    setDataSource(getInit('dataConfig'))
  }, [])

  return (
    <SelectionContext.Provider value={{ motionMode, viewMode, dataSource, setDataSource, selectMotion, selectView, reset }}>
      {children}
    </SelectionContext.Provider>
  )
}
