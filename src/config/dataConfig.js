import { loadLocalPhotos } from '../composants/data/local/LocalData'
import { getFileList } from '../services/fileService'
import { getArtworks as getMetArtworks } from '../composants/data/api/MetropolitanData'
import { getArtworks as getCleArtworks } from '../composants/data/api/ClevelandData'

const API_SOURCES = [
    { key: 'metropolitanKey', label: 'Metropolitan', loader: getMetArtworks },
    //{ key: 'clevelandKey', label: 'Cleveland', loader: getCleArtworks }, //ça ne marche pas l'api
]

let localSources = []
let localSourcesReady = false

async function buildLocalSources() {
    if (localSourcesReady) return
    const files = await getFileList()
    localSources = files.map((file) => ({
        key: file.key,
        label: file.label,
        loader: () => loadLocalPhotos(`data/${file.file}`),
    }))
    localSourcesReady = true
}

export async function getAllDataSources() {
    await buildLocalSources()
    return [...API_SOURCES, ...localSources]
}

export async function getDataSource(key) {
    await buildLocalSources()
    return [...API_SOURCES, ...localSources].find((i) => i.key === key)
}
