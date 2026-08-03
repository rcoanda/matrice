const COUNT = 10

const CLE_API_BASE = 'https://openaccess-api.clevelandart.org/api'

export async function getArtworks() {
  const url = `${CLE_API_BASE}/artworks?limit=${COUNT}&has_image=1&q=paintings`
  const res = await fetch(url)
  const json = await res.json()
  const items = json.data || []

  const artworks = items.map((item, i) => ({
    id: i + 1,
    title: item.title || 'Untitled',
    artist: item.creators?.[0]?.description || '',
    date: item.creation_date || '',
    image: item.images?.web?.url
      ? item.images.web.url.replace('https://openaccess-cdn.clevelandart.org', '/cleveland-image')
      : '',
  })).filter((art) => art.image)

  console.log(`Cleveland: ${artworks.length} artworks`)
  return artworks
}
