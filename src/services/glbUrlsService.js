// Service qui récupère les entrées d'un fichier json de modèles glb (source)
// et fournit les URLs Cloudinary correspondantes, avec mise en cache.
const cache = {}

function buildEntry(entry) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  return {
    url: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_glb/${entry.file}`,
    title: entry.title || '',
    artist: entry.artist || '',
    date: entry.date || '',
    place: entry.place || '',
  }
}

function glbExists(url) {
  return fetch(url, { method: 'HEAD' })
    .then((res) => res.ok)
    .catch(() => false)
}

async function fetchEntries(source) {
  const res = await fetch(`${import.meta.env.BASE_URL}${source}`)
  if (!res.ok) return []
  const data = await res.json()
  const entries = (data.files || []).map(buildEntry)
  const exists = await Promise.all(entries.map((e) => glbExists(e.url)))
  return entries.filter((_, i) => exists[i])
}

export function getGlbUrls(source) {
  if (!cache[source]) cache[source] = fetchEntries(source)
  return cache[source]
}