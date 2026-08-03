const COUNT = 10

function preloadImages(artworks) {
  return Promise.all(
    artworks.map((art) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = art.image
      })
    })
  )
}

export async function getLocalData({ images }) {
  const artworks = images.slice(0, COUNT).map((image, i) => ({
    id: i + 1,
    title: (typeof image === 'string' ? image : image.file).replace(/\.(JPG|jpg)$/, '').replace(/_HDR$/, '').replace(/ \(\d+\)$/, ''),
    artist: typeof image === 'string' ? '' : image.artist,
    date: typeof image === 'string' ? '' : image.date,
    place: typeof image === 'string' ? '' : image.place,
    folder: image.folder,
    image: `/data/${image.folder}/${image.file}`,
  }))
  await preloadImages(artworks)
  return artworks
}
