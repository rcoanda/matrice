// Chemins centralisés des sources de données (json), servies depuis public/.

export const IMAGES_DIR = 'data/img'
export const VIDEOS_DIR = 'data/video'

export const IMG_MANIFEST_PATH = `${IMAGES_DIR}/manifest.json`
export const VIDEO_MANIFEST_PATH = `${VIDEOS_DIR}/manifest.json`

export function imgSource(file) {
  return `${IMAGES_DIR}/${file}`
}

export function videoSource(file) {
  return `${VIDEOS_DIR}/${file}`
}