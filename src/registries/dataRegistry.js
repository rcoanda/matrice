import { loadCloudData } from '../services/cloudDataLoader'
import { loadMetaData } from '../services/metaDataLoader'
import { getFileList, getVideoFileList, getGlbFileList } from '../services/fileListService'
import { imgSource, videoSource, glbSource } from '../utils/mediaPaths'
import { getItem as getTenantItem } from './common/tenantRegistry'

const registry = import.meta.url.split('/').pop().replace(/\.js$/, '')

const META_KEYS = ['metaKey']

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

function buildMetaSource(all) {
    // metaKey = catégories restreintes à la liste configurée (résultat de getItems)
    const keys = getTenantItem(registry)?.keys
    const metaItems = keys ? all.filter((i) => keys.includes(i.key)) : all
    return {
        key: META_KEYS[0],
        label: 'Categories',
        file: null,
        loader: () => loadMetaData(metaItems.map((source) => source.label)),
    }
}

//les getters des ressouces 

export async function getAllItems() {
    await buildPhotoSources()
    await buildVideoSources()
    await buildGlbSources()
    const all = [...photoSources, ...videoSources, ...glbSources]
    return [...all, buildMetaSource(all)]
}

export async function getAllKeys() {
    const all = await getAllItems()
    return all.map((i) => i.key)
}

export async function getItems(keys) {
    //items
    const all = await getAllItems()
    return keys ? all.filter((i) => keys.includes(i.key)) : all
}

export async function getItem(key) {
    //item
    //{ key: 'peopleKey', label: 'People', file: 'people.json', loader: loadCloudData }, 
    const all = await getAllItems()
    if (META_KEYS.includes(key)) return all.find((i) => META_KEYS.includes(i.key))
    // respecte la liste configurée (résultat de getItems)
    const keys = getTenantItem(registry)?.keys
    const scoped = keys ? all.filter((i) => keys.includes(i.key)) : all
    return scoped.find((i) => i.key === key) ?? null
}
//les ressources (items) 
/* 
 items: [
    { key: 'natureKey',  label: 'Nature',  loader: () => loadCloudData(...) },   // clés fichier du tenant
    { key: 'karnakKey',  label: 'Karnak',  loader: () => loadCloudData(...) },
    { key: 'metaKey',    label: 'Categories', loader: () => loadMetaData(...) }, 
     */