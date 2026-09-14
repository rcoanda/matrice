import { useSpriteTexture } from '../../../hooks/useSpriteTexture'

export default function SpriteView({ image, video, position, onClick }) {
  const url = video || image
  const type = video ? 'video' : 'image'
  const { texture, size } = useSpriteTexture(url, type)

  return (
    <sprite position={position} onClick={onClick}>
      <spriteMaterial map={texture} transparent size={size} />
    </sprite>
  )
}