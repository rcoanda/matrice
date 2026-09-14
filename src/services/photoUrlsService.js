// Service qui récupère les noms de fichiers depuis un fichier json (source)
// et fournit les URLs Cloudinary correspondantes, avec mise en cache.
const cache = {}

function buildEntry(entry) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    return {
        url: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,w_512,c_scale/${entry.file}`,
        title: entry.title || '',
        artist: entry.artist || '',
        date: entry.date || '',
        place: entry.place || '',
    }
}

function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = url
    })
}

async function fetchUrls(source) {
    const res = await fetch(`${import.meta.env.BASE_URL}${source}`)
    const data = await res.json()
    const entries = data.files.map(buildEntry)
    const exists = await Promise.all(entries.map((e) => imageExists(e.url)))
    return entries.filter((_, i) => exists[i])
}

export function getPhotoUrls(source) {
    if (!cache[source]) cache[source] = fetchUrls(source)
    return cache[source]
}