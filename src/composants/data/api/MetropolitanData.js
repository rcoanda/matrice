const COUNT = 10

const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1'

async function searchObjectIds() {
  const res = await fetch(
    `${MET_API_BASE}/search?q=paintings&hasImages=true&isPublicDomain=true`
  )
  const data = await res.json()
  return data.objectIDs || []
}

async function fetchObject(id) {
  const res = await fetch(`${MET_API_BASE}/objects/${id}`)
  return res.json()
}

export async function getArtworks() {
  const ids = await searchObjectIds()
  console.log(`Met: ${ids.length} IDs récupérés`)
  const selected = ids.slice(0, COUNT)
  console.log(`Met: ${selected.length} IDs sélectionnés`, selected)

  const results = await Promise.all(
    selected.map((id) => fetchObject(id))
  )
  console.log(`Met: ${results.length} objets fetchés`)

  const artworks = results.map((obj, i) => ({
    id: i + 1,
    title: obj.title || 'Untitled',
    artist: obj.artistDisplayName || '',
    date: obj.objectDate || '',
    image: obj.primaryImage ? obj.primaryImage.replace('https://images.metmuseum.org', '/met-image') : '',
  })).filter((art) => art.image)

  console.log(`Met: ${artworks.length} artworks avec image`)
  return artworks
}
