import { useSpriteTexture } from '../../../../hooks/texture/useSpriteTexture'

export default function SpriteView({ artWork, position, onClick }) {
  const { texture, size } = useSpriteTexture(artWork)

  return (
    <sprite position={position} onClick={onClick}>
      {texture && <spriteMaterial map={texture} transparent size={size} />}
    </sprite>
  )
}