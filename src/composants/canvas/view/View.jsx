import { useSpriteTexture } from '../../../hooks/useSpriteTexture'
import { useViewMotion } from '../../../hooks/useViewMotion'

function ArtworkSprite({ url, type, position, onClick }) {
  const { texture, size } = useSpriteTexture(url, type)

  return (
    <sprite position={position} onClick={onClick}>
      <spriteMaterial map={texture} transparent size={size} />
    </sprite>
  )
}

export default function View({ cameraZ, artworks, positions, onSelect }) {
  const groupRef = useViewMotion(cameraZ)

  return (
    <group ref={groupRef}>
      {artworks.map((art, i) => (
        <ArtworkSprite
          key={art.id}
          url={art.video || art.image}
          type={art.video ? 'video' : 'image'}
          position={positions[i] || [0, 0, 0]}
          onClick={() => onSelect?.(art)}
        />
      ))}
    </group>
  )
}