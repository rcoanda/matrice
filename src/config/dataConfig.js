import { loadCloudData } from '../services/cloudDataLoader'
import { getFileList, getVideoFileList, getGlbFileList } from '../services/fileListService'
import { imgSource, videoSource, glbSource } from '../utils/mediaPaths'
import { getArtworks as getMetArtworks } from '../services/api/MetropolitanData'
import { getArtworks as getCleArtworks } from '../services/api/ClevelandData'

const API_SOURCES = [
    { key: 'metropolitanKey', label: 'Metropolitan', loader: getMetArtworks },
    //{ key: 'peopleKey', label: 'People', file: 'people.json', loader: loadCloudData }, 
]

let photoSources = []
let photoSourcesReady = false

let videoSources = []
let videoSourcesReady = false

let glbSources = []
let glbSourcesReady = false

async function buildPhotoSources() {
    if (photoSourcesReady) return
    const files = await getFileList()
    photoSources = files.map((file) => ({
        key: file.key,
        label: file.label,
        file: file.file,
        loader: () => loadCloudData(imgSource(file.file), 'image'),
    }))
    photoSourcesReady = true
}

async function buildVideoSources() {
    if (videoSourcesReady) return
    const files = await getVideoFileList()
    videoSources = files.map((file) => ({
        key: file.key,
        label: file.label,
        file: file.file,
        loader: () => loadCloudData(videoSource(file.file), 'video'),
    }))
    videoSourcesReady = true
}

async function buildGlbSources() {
    if (glbSourcesReady) return
    const files = await getGlbFileList()
    glbSources = files.map((file) => ({
        key: file.key,
        label: file.label,
        file: file.file,
        loader: () => loadCloudData(glbSource(file.file), 'glb'),
    }))
    glbSourcesReady = true
}

export async function getAllDataSources() {
    await buildPhotoSources()
    await buildVideoSources()
    await buildGlbSources()
    return [...API_SOURCES, ...photoSources, ...videoSources, ...glbSources]
}

export async function getDataSource(key) {
    //{ key: 'peopleKey', label: 'People', file: 'people.json', loader: loadCloudData }, 
    await buildPhotoSources()
    await buildVideoSources()
    await buildGlbSources()
    return [...API_SOURCES, ...photoSources, ...videoSources, ...glbSources].find((i) => i.key === key)
}
