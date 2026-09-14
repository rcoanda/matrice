import { usePhotoSpiriteTexture } from '../../../hooks/usePhotoSpiriteTexture'
import { useViewMotion } from '../../../hooks/useViewMotion'

function ArtworkImage({ url, position, onClick }) {
  const { texture, size } = usePhotoSpiriteTexture(url)

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
        <ArtworkImage
          key={art.id}
          url={art.image}
          position={positions[i] || [0, 0, 0]}
          onClick={() => onSelect?.(art)}
        />
      ))}
    </group>
  )
}