

export async function loadMetaData(label) {

  return entries.map((label, i) => ({
    id: i + 1,
    collection: label,
    title: '',
    artist: '',
    date: '',
    place: '',
    image: null,
    video: null,
    glb: null,
  }))
}