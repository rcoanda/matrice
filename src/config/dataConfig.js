import { loadLocalPhotos } from '../composants/data/local/LocalData'
import { getArtworks as getMetArtworks } from '../composants/data/api/MetropolitanData'
import { getArtworks as getCleArtworks } from '../composants/data/api/ClevelandData'

const LOCAL_SOURCES = [
  { key: 'compostelleKey', label: 'Compostelle', loader: () => loadLocalPhotos('data/nature.json') },
  { key: 'santorinKey', label: 'Santorin', loader: () => loadLocalPhotos('data/mongolfiere.json') },
]

const DATA_SOURCES = [
  ...LOCAL_SOURCES,
  { key: 'metropolitanKey', label: 'Metropolitan', loader: getMetArtworks },
  { key: 'clevelandKey', label: 'Cleveland', loader: getCleArtworks },
]

export function getAllDataSources() {
  return DATA_SOURCES
}

export function getDataSource(key) {
  return DATA_SOURCES.find((i) => i.key === key)
}
