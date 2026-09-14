// Service qui récupère les noms de fichiers depuis les manifests (images, vidéos et glbs)
import { IMG_MANIFEST_PATH, VIDEO_MANIFEST_PATH, GLB_MANIFEST_PATH } from '../utils/mediaPaths'

const cache = {}

async function fetchFileList(path) {
    const res = await fetch(`${import.meta.env.BASE_URL}${path}`)
    if (!res.ok) return []
    const data = await res.json()
    return data.files || []
}

export function getFileList() {
    if (!cache.img) cache.img = fetchFileList(IMG_MANIFEST_PATH)
    return cache.img
}

export function getVideoFileList() {
    if (!cache.video) cache.video = fetchFileList(VIDEO_MANIFEST_PATH)
    return cache.video
}

export function getGlbFileList() {
    if (!cache.glb) cache.glb = fetchFileList(GLB_MANIFEST_PATH)
    return cache.glb
}