import { loadCloudData } from '../services/cloudDataLoader'
import { getFileList, getVideoFileList, getGlbFileList } from '../services/fileListService'
import { imgSource, videoSource, glbSource } from '../utils/mediaPaths'

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
    return [...photoSources, ...videoSources, ...glbSources]
}

export async function getAllKeys() {
    await buildPhotoSources()
    await buildVideoSources()
    await buildGlbSources()
    return [...photoSources, ...videoSources, ...glbSources].map((i) => i.key)
}

export async function getList(keys) {
    const all = await getAllDataSources()
    return keys ? all.filter((i) => keys.includes(i.key)) : all
}

export async function getDataSource(key) {
    //{ key: 'peopleKey', label: 'People', file: 'people.json', loader: loadCloudData }, 
    await buildPhotoSources()
    await buildVideoSources()
    await buildGlbSources()
    return [...photoSources, ...videoSources, ...glbSources].find((i) => i.key === key)
}
