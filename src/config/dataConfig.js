import { loadCloudData } from '../services/cloudDataLoader'
import { loadMetaData } from '../services/metaDataLoader'
import { getFileList, getVideoFileList, getGlbFileList } from '../services/fileListService'
import { imgSource, videoSource, glbSource } from '../utils/mediaPaths'
import { getAllInit } from './config'

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
        type: 'image',
        loader: () => loadCloudData(imgSource(file.file), 'image', file.label),
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
        type: 'video',
        loader: () => loadCloudData(videoSource(file.file), 'video', file.label),
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
        type: 'glb',
        loader: () => loadCloudData(glbSource(file.file), 'glb', file.label),
    }))
    glbSourcesReady = true
}

// Liste configurée pour dataConfig (ex: ['natureKey', 'karnakKey']) — limite les catégories de metaKey
function getConfiguredKeys() {
    const entry = getAllInit().find((i) => i.config === 'dataConfig')
    return entry ? (entry.list ?? null) : null
}

async function getAllDataSources() {
    await buildPhotoSources()
    await buildVideoSources()
    await buildGlbSources()
    const all = [...photoSources, ...videoSources, ...glbSources]
    // metaKey = catégories restreintes à la liste configurée (résultat de getList)
    const keys = getConfiguredKeys()
    const metaItems = keys ? all.filter((i) => keys.includes(i.key)) : all
    return [
        ...all,
        {
            key: 'metaKey',
            label: 'Categories',
            file: null,
            loader: () => loadMetaData(metaItems.map((source) => source.label)),
        },
    ]
}

export async function getAllKeys() {
    const all = await getAllDataSources()
    return all.map((i) => i.key)
}

export async function getList(keys) {
    //items
    const all = await getAllDataSources()
    return list = keys ? all.filter((i) => keys.includes(i.key)) : all

}

export async function getDataSource(key) {
    //item
    //{ key: 'peopleKey', label: 'People', file: 'people.json', loader: loadCloudData }, 
    const all = await getAllDataSources()
    return all.find((i) => i.key === key)
}
