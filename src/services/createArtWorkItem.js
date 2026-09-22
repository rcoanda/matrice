export function createArtWorkItem({ id, collection = null, title = '', artist = '', date = '', place = '', url = null, type = null }) {
  return {
    id,
    collection: collection || null,
    title: title || '',
    artist: artist || '',
    date: date || '',
    place: place || '',
    image: type === 'image' ? url : null,
    video: type === 'video' ? url : null,
    glb: type === 'glb' ? url : null,
    transformations: null,
  }
}