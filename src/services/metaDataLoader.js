export async function loadMetaData(labels = []) {
  return labels.map((label, i) => ({
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