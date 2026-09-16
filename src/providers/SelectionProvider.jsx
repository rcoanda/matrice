import { useState, useCallback, useEffect } from 'react'
import { getInit, getInitList } from '../config/config'
import { SelectionContext } from './SelectionContext'

//motionMode, viewMode, dataSources sont des Keys
export function SelectionProvider({ children }) {
  const [motionMode, setMotionMode] = useState(getInit('motionConfig'))
  const [viewMode, setViewMode] = useState(getInit('viewConfig'))
  const [dataSource, setDataSource] = useState(getInit('dataConfig'))
  const [motionOptions, setMotionOptions] = useState([])
  const [viewModeOptions, setViewModeOptions] = useState([])
  const [dataSourceOptions, setDataSourceOptions] = useState([])

  useEffect(() => {
    getInitList('motionConfig').then(setMotionOptions)
    getInitList('viewConfig').then(setViewModeOptions)
    getInitList('dataConfig').then(setDataSourceOptions)
  }, [])

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
    <SelectionContext.Provider value={{ motionMode, selectMotion, viewMode, selectView, dataSource, setDataSource, reset, motionOptions, viewModeOptions, dataSourceOptions }}>
      {children}
    </SelectionContext.Provider>
  )
}