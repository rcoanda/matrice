import { createContext, useState, useCallback } from 'react'
import { getInit } from '../config/config'

export const SelectionContext = createContext(null)

export function SelectionProvider({ children }) {
  const [motion, setMotion] = useState(getInit('motionConfig'))
  const [viewMode, setViewMode] = useState(getInit('viewConfig'))
  const [dataSource, setDataSource] = useState(getInit('dataConfig'))

  const reset = useCallback(() => {
    setMotion(getInit('motionConfig'))
    setViewMode(getInit('viewConfig'))
    setDataSource(getInit('dataConfig'))
  }, [])

  return (
    <SelectionContext.Provider value={{ motion, setMotion, viewMode, setViewMode, dataSource, setDataSource, reset }}>
      {children}
    </SelectionContext.Provider>
  )
}
