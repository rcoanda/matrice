// Service qui récupère les noms de fichiers vidéo depuis un fichier json (source)
// et fournit les URLs Cloudinary correspondantes, avec mise en cache.
const cache = {}

function buildVideoUrl(fileName) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    return `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_mp4/${fileName}`
}

function videoExists(url) {
    return new Promise((resolve) => {
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.onloadeddata = () => resolve(true)
        video.onerror = () => resolve(false)
        video.src = url
    })
}

async function fetchUrls(source) {
    const res = await fetch(`${import.meta.env.BASE_URL}${source}`)
    if (!res.ok) return []
    const data = await res.json()
    const urls = data.files.map(buildVideoUrl)
    const exists = await Promise.all(urls.map(videoExists))
    return urls.filter((_, i) => exists[i])
}

export function getVideoUrls(source) {
    if (!cache[source]) cache[source] = fetchUrls(source)
    return cache[source]
}