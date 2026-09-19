import { useEffect, useState } from 'react'
import { getItem } from '../../config/dataConfig'

const PROGRESS_START = 10
const PROGRESS_READY = 100
const APPLY_DELAY = 300
//dataKey = datafileKey, exp. : peopleKey / people.json, astroKey / astro.json, karnakKey.karnak.json
//dataItem à partir d'un Key = un elem dans dataconfig (key, label, filename, loader)
//artwork suite dataItem.loader = une structure avec les infos de l'elem (url, date, lieu, artist)
export function useArtworkLoader(dataKey) {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [dataItem, setDataItem] = useState(null)

  useEffect(() => {
    getItem(dataKey).then(setDataItem)
  }, [dataKey])

  useEffect(() => {
    if (!dataItem) return
    setLoading(true)
    setProgress(PROGRESS_START)

    const load = async () => {
      const dataItems = await dataItem.loader()
      setProgress(PROGRESS_READY)
      setArtworks(dataItems)
      setTimeout(() => setLoading(false), APPLY_DELAY)
    }
    load()
  }, [dataItem])

  return { artworks, dataItem, loading, progress }
}