import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

const DEFAULT_HEIGHT = 1.6
const MAX_ASPECT = 1.8

export function usePhotoTexture(url) {
  const texture = useLoader(TextureLoader, url)
  const aspect = texture.image ? texture.image.width / texture.image.height : 1
  const h = DEFAULT_HEIGHT
  const w = h * Math.min(aspect, MAX_ASPECT)

  return { texture, size: [w, h] }
}