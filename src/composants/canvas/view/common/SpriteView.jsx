import { useSpriteTexture } from '../../../../hooks/model/useSpriteTexture'

export default function SpriteView({ image, video, position, onClick }) {
  const url = video || image
  const type = video ? 'video' : 'image'
  const { texture, size } = useSpriteTexture(url, type)

  return (
    <sprite position={position} onClick={onClick}>
      {texture && <spriteMaterial map={texture} transparent size={size} />}
    </sprite>
  )
}