import SpriteView from './SpriteView'
import GlbView from './GlbView'
import { useViewMotion } from '../../../hooks/useViewMotion'

export default function View({ cameraZ, artworks, positions, onSelect }) {
  const groupRef = useViewMotion(cameraZ)

  return (
    <group ref={groupRef}>
      {artworks.map((art, i) => (
        art.glb ? (
          <GlbView
            key={art.id}
            scene
            url={art.glb}
            position={positions[i] || [0, 0, 0]}
            onClick={() => onSelect?.(art)}
          />
        ) : (
          <SpriteView
            key={art.id}
            image={art.image}
            video={art.video}
            position={positions[i] || [0, 0, 0]}
            onClick={() => onSelect?.(art)}
          />
        )
      ))}
    </group>
  )
}