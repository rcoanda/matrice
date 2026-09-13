import { useEffect, useState } from 'react'
import { getDataSource } from '../config/dataConfig'

const PROGRESS_START = 10
const PROGRESS_READY = 100
const APPLY_DELAY = 300

export function useArtworkLoader(dataSource) {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [dataSourceItem, setDataSourceItem] = useState(null)

  useEffect(() => {
    getDataSource(dataSource).then(setDataSourceItem)
  }, [dataSource])

  useEffect(() => {
    if (!dataSourceItem) return
    setLoading(true)
    setProgress(PROGRESS_START)

    const load = async () => {
      const data = await dataSourceItem.loader()
      setProgress(PROGRESS_READY)
      setArtworks(data)
      setTimeout(() => setLoading(false), APPLY_DELAY)
    }
    load()
  }, [dataSourceItem])

  return { artworks, dataSourceItem, loading, progress }
}