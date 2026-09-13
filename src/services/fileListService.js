// Service qui récupère les noms de fichiers depuis un fichier data/manifest.json

const cache = {}

async function fetchFileList() {
    const res = await fetch(`${import.meta.env.BASE_URL}data/manifest.json`)
    if (!res.ok) return []
    const data = await res.json()
    return data.files || []
}

export function getFileList() {
    if (!cache.manifest) cache.manifest = fetchFileList()
    return cache.manifest
}