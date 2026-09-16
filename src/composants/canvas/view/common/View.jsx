import SpriteView from './SpriteView'
import GlbView from './GlbView'
import CardView from './CardView'
import { useViewMotion } from '../../../../hooks/motion/useViewMotion'

export default function View({ cameraZ, artworks, positions, onSelect }) {
  const groupRef = useViewMotion(cameraZ)

  return (
    <group ref={groupRef}>
      {artworks.map((art, i) => (
        art.image || art.video ? (
          <SpriteView
            key={art.id}
            image={art.image}
            video={art.video}
            position={positions[i] || [0, 0, 0]}
            onClick={() => onSelect?.(art)}
          />
        ) : art.glb ? (
          <GlbView
            key={art.id}
            scene
            url={art.glb}
            position={positions[i] || [0, 0, 0]}
            onClick={() => onSelect?.(art)}
          />
        ) : (
          <CardView
            key={art.id}
            collection={art.collection}
            position={positions[i] || [0, 0, 0]}
            onClick={() => onSelect?.(art)}
          />
        )
      ))}
    </group>
  )
}