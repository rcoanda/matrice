import { getLocalData } from '../composants/data/local/LocalData'
import { getAllCompostelleImages } from '../composants/data/local/dataCompostelle'
import { getAllSantorinImages } from '../composants/data/local/dataSantorin'
import { getArtworks as getMetArtworks } from '../composants/data/api/MetropolitanData'
import { getArtworks as getCleArtworks } from '../composants/data/api/ClevelandData'

const LOCAL_SOURCES = [
  { key: 'compostelleKey', label: 'Compostelle', loader: () => getLocalData({ images: getAllCompostelleImages() }) },
  { key: 'santorinKey', label: 'Santorin', loader: () => getLocalData({ images: getAllSantorinImages() }) },
]

const DATA_SOURCES = [
  // ...LOCAL_SOURCES,
  { key: 'metropolitanKey', label: 'Metropolitan', loader: getMetArtworks },
  { key: 'clevelandKey', label: 'Cleveland', loader: getCleArtworks },
]

export function getAllDataSources() {
  return DATA_SOURCES
}

export function getDataSource(key) {
  return DATA_SOURCES.find((i) => i.key === key)
}
