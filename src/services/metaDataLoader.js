

export async function loadMetaData(label) {

  return entries.map((_, i) => ({
    id: i + 1,
    card: label,
    title: '',
    artist: '',
    date: '',
    place: '',
    image: null,
    video: null,
    glb: null,
  }))
}